'use strict'

class Particle {
    constructor() {
        this.initialize();
    }

    initialize() {
        this.position = createVector(random(windowWidth), random(windowHeight));
        this.life = settings.iterations;
    }

    draw() {
        strokeWeight(settings.pointSize);
        colorMode(RGB);
        stroke(settings.staticColor, settings.alpha);
        point(this.position.x, this.position.y);
    }

    update() {
        this.life--;
        if (this.life < 0)
            this.initialize();
    }
}