'use strict'

class BlackHole {
    constructor() {
        this.force = random(10000, 100000);
        this.position = createVector(random(windowWidth), random(windowHeight));
    }
}