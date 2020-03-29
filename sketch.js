'use strict'

class Settings {
  constructor() {
    // General
    this.animate = true;
    this.showDiagnostics = false;
    
    this.count = 3000;
    this.pointSize = 1.0;
    this.minGravity = 10000;
    this.maxGravity = 100000;
    this.iterations = 20;
    this.alpha = 3.0;
    this.staticColor = 0;
  }

  randomize() {
    this.pointSize = 1;
    this.minGravity = random(5000, 15000);
    this.maxGravity = settings.minGravity + random(50000, 150000);
    this.iterations = random(5, 30);
    this.alpha = random(3, 8);
    this.staticColor = random(0, 255);
  }
}

let gui = null;
let settings = new Settings();
let particles = [];
let universe;

function setup() {
  textFont('monospace');
  setShakeThreshold(75);

  createGuiControls();
  initCanvas();
  createNewRandomWorld();
}

function initCanvas() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
}

function createGuiControls() {
  gui = new dat.GUI();
  
  gui.add(settings, 'animate');
  gui.add(settings, 'showDiagnostics');
  
  let f1 = gui.addFolder('Particles');
  f1.add(settings, 'count', 1, 5000).step(1).onFinishChange(n => init());
  f1.add(settings, 'pointSize', 1, 10).step(1).listen();
  f1.add(settings, 'minGravity', 0, 20000).listen();
  f1.add(settings, 'maxGravity', 0, 300000).listen();
  f1.add(settings, 'iterations', 0, 50).listen();
  f1.add(settings, 'alpha', 1, 255).listen();
  f1.add(settings, 'staticColor', 0, 255).listen();
  f1.open();
  
  gui.close();
}

function windowResized() {
  initCanvas();
  restart();
}

function createNewRandomWorld() {
  settings.randomize();
  universe = new Universe(4);
  restart();
}

function restart() {
  initializeParticles();
  background(15, 10, 10);
}

function initializeParticles() {
  particles = [];

  for (var i = 0; i < settings.count; i++)
    particles[i] = new Particle();
}

function keyTyped() {
  switch (key) {
    case "a":
      settings.animate = !settings.animate;
      break;

    case "d":
      settings.showDiagnostics = !settings.showDiagnostics;
      break;

      case " ":
        createNewRandomWorld();
        break;

    default:
      // Prevent default behavior
      return false;
  }
}

function deviceShaken() {
  createNewRandomWorld();
}

// Main update loop
function draw() {
  if (settings.showDiagnostics)
    drawDiagnostics();

  if (settings.animate) {
    updateParticles();
  }
}

function updateParticles() {
  for (let particle of particles) {
    particle.draw();
    universe.apply(particle);
    particle.update();
  }
}

function drawDiagnostics() {
  push();

  fill(0);
  stroke(0);
  rectMode(CORNER)
  rect(5, 5, 80, 40);

  textSize(12);
  fill(255);
  stroke(0);

  let fps = frameRate();
  text("FPS:   " + fps.toFixed(), 10, 20);
  text("Count: " + particles.length.toFixed(), 10, 40);

  pop();
}