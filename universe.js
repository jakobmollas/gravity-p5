'use strict'

class Universe {
    constructor() {
        this.attractors = [];
        this.particles = [];

        for (var i = 0; i < settings.attractorCount; i++)
            this.attractors[i] = new Attractor();

        for (var i = 0; i < settings.particleCount; i++)
            this.particles[i] = createVector(random(windowWidth), random(windowHeight));
    }

    update() {
        if (settings.animate)
            this.updateParticles();
    }

    draw() {
        if (settings.animate)
            this.drawParticles();

        if (settings.showAttractors) {
            for (let attractor of this.attractors)
                attractor.draw();
        }
    }

    updateParticles() {
        for (let particle of this.particles)
            universe.affect(particle);
    }

    drawParticles() {
        strokeWeight(settings.pointSize);
        stroke(255, settings.alpha);

        for (let particle of this.particles)
            point(particle.x, particle.y);
    }

    affect(particle) {
        let nextPosition = particle.copy();

        for (let attractor of this.attractors) {
            let pull = p5.Vector.sub(attractor.position, particle);
            let squareDistance = pull.magSq(pull);
            let influence = pull.mult(attractor.force).div(squareDistance);
            nextPosition.add(influence);
        }

        particle.set(nextPosition);
    }
}