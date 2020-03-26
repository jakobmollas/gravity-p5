'use strict'

class Particle {
    constructor() {
        this.initialize();
    }

    initialize() {
        this.position = createVector(random(windowWidth), random(windowHeight));
        this.maxLife = settings.minLifeInSeconds; // random(settings.minLifeInSeconds, settings.maxLifeInSeconds) * 1000;  // ms
        this.life = 25;
    }

    draw() {
        strokeWeight(settings.pointSize);
        colorMode(RGB, 100);

        // if (settings.fancyColors) {
        //     let normalizedHeading = this.velocity.heading() / PI;
        //     stroke(map(normalizedHeading, -1, 1, 0, 100), 80, 100, settings.alpha);
        // } else {
        //     stroke(settings.staticColor, 80, 100, settings.alpha);
        // }
        //stroke(settings.staticColor, 80, 100, settings.alpha);
        stroke(255, 255, 255, settings.alpha);
        
        //point(map(this.position.x, -1, 1, 0, windowWidth), map(this.position.y, -1, 1, 0, windowHeight));
        point(this.position.x, this.position.y);
    }

    update() {
        this.life--;
        if (this.life < 0)
            this.initialize();
    }
}