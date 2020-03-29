'use strict'

class Particle {
    constructor() {
        this.initialize();
    }

    initialize() {
        this.position = createVector(random(windowWidth), random(windowHeight));
        this.maxLife = settings.iterations;
        this.life = 25;
    }

    draw() {
        strokeWeight(settings.pointSize);
        colorMode(RGB);
        stroke(255, 255, 255, settings.alpha);
        point(this.position.x, this.position.y);
    }

    update() {
        this.life--;
        if (this.life < 0)
            this.initialize();
    }
}