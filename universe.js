'use strict'

class Universe {
    constructor(count) {
        this.blackholes = [];
        this.particles = [];
        
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
        let nextPosition = createVector(particle.position.x, particle.position.y);

        for (let hole of this.blackholes) {
            let pull = p5.Vector.sub(hole.position, particle.position);
            let squareDistance = pull.magSq(pull);
            let holeInfluence = pull.mult(hole.force).div(squareDistance);
            nextPosition.add(holeInfluence);
        }
        
        particle.position = nextPosition;
    }
}