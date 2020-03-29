'use strict'

class Attractor {
    constructor() {
        this.force = random(settings.minGravity, settings.maxGravity);
        this.position = createVector(random(windowWidth), random(windowHeight));
    }

    draw() {
        push();
        strokeWeight(1);
        colorMode(RGB);
        noFill();
        stroke(255, 50, 50, 255);
        ellipse(this.position.x, this.position.y, map(this.force, settings.minGravity, settings.maxGravity, 0, 50));
        pop();
    }
}
