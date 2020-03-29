'use strict'

class Universe {
    constructor() {
        this.blackholes = [];
        this.particles = [];

        for (var i = 0; i < settings.blackHoleCount; i++)
            this.blackholes[i] = new BlackHole();

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

        if (settings.showBlackHoles) {
            for (let hole of this.blackholes) {
                hole.draw();
            }
        }
    }

    updateParticles() {
        for (let particle of this.particles) {
            universe.affect(particle);
        }
    }

    drawParticles() {
        strokeWeight(settings.pointSize);
        stroke(255, settings.alpha);

        for (let particle of this.particles)
            point(particle.x, particle.y);
    }

    affect(particle) {
        let nextPosition = particle.copy();

        for (let hole of this.blackholes) {
            let pull = p5.Vector.sub(hole.position, particle);
            let squareDistance = pull.magSq(pull);
            let holeInfluence = pull.mult(hole.force).div(squareDistance);
            nextPosition.add(holeInfluence);
        }

        particle.set(nextPosition);
    }
}