'use strict'

class Universe {
    constructor(count) {
        this.blackholes = [];
        let particles = [];
        
        for (var i = 0; i < count; i++)
            this.blackholes[i] = new BlackHole();

        this.initializeParticles();
    }

    initializeParticles() {
        this.particles = [];
      
        for (var i = 0; i < settings.particleCount; i++)
          this.particles[i] = new Particle();
      }

    update() {
        if (settings.animate) {
            this.updateParticles();
          }
    }

    draw() {
        if (settings.animate) {
            this.drawParticles();
          }
        
          if (settings.showBlackHoles) {
            for (let hole of this.blackholes) {
                hole.draw();
            }
          }
    }

    updateParticles() {
        for (let particle of this.particles) {
          universe.affect(particle);
          particle.update();
        }
      }

      drawParticles() {
        for (let particle of this.particles) {
          particle.draw();
        }
      }

      affect(particle) {
        let mx = particle.position.x;
        let my = particle.position.y;

        for (let hole of this.blackholes) {
            let dx = hole.position.x - particle.position.x;
            let dy = hole.position.y - particle.position.y;
            //let pull = p5.Vector.sub(hole.position, particle.position);
            let distance = dx*dx + dy *dy;

            mx += dx*hole.force/distance;
            my += dy*hole.force/distance;
            // if (distance != 0.0)

            // pull.div(distance);
            
            // steering.add(pull.mult(hole.force));
        }

        particle.position.x = mx;
        particle.position.y = my;
    }
}