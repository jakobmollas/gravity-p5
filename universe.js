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
}

class BlackHole {
    constructor() {
        this.force = random(10000, 100000);
        this.position = createVector(random(windowWidth), random(windowHeight));
    }
}