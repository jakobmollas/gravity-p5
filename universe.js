'use strict'

class Universe {
    constructor(count) {
        this.blackholes = [];
        
        for (var i = 0; i < count; i++)
            this.blackholes[i] = new BlackHole();
    }

    apply(particle) {
        let mx = particle.position.x;
        let my = particle.position.y;

        for (let hole of this.blackholes) {
        }
        
        for (let i = 0; i < this.blackholes.length; i++) {
            let dx = this.blackholes[i].position.x - particle.position.x;
            let dy = this.blackholes[i].position.y - particle.position.y;
            //let pull = p5.Vector.sub(this.blackholes[i].position, particle.position);
            let distance = dx*dx + dy *dy;

            mx += dx*this.blackholes[i].force/distance;
            my += dy*this.blackholes[i].force/distance;
            // if (distance != 0.0)

            // pull.div(distance);
            
            // steering.add(pull.mult(this.blackholes[i].force));
        }

        particle.position.x = mx;
        particle.position.y = my;
    }

    draw() {
        for (let hole of this.blackholes) {
            hole.draw();
        }
    }
}

class BlackHole {
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