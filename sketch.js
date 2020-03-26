'use strict'

class Settings {
  constructor() {
    // General
    this.animate = true;
    this.showDiagnostics = true;
    this.drawFlowfield = false;
    
    // Flowfield
    this.wraparound = true;
    this.cells = 100.0;
    this.octaves = 4;
    this.falloff = 0.65;
    this.xy_increment = 0.05;
    this.z_increment = 0.000;
    
    // Particle stuff
    this.count = 3000;
    this.pointSize = 1.0;
    this.minSpeed = 2.0;
    this.maxSpeed = 10.0;
    this.minLifeInSeconds = 1.0;
    this.maxLifeInSeconds = 5.0;
    this.alpha = 7.0;
    this.fancyColors = false;
    this.fancyColorRange = 100;
    this.staticColor = 0;
  }

  randomize() {
    // Flowfield
    this.wraparound = floor(random(0, 2)) ? false : true;
    this.cells = floor(random(3, 100.0));
    this.octaves = floor(random(2, 8));
    this.falloff = random(0.1, 0.75);
    this.xy_increment = random(0.01, 0.2);
    this.z_increment = floor(random(4)) == 1 ? random(0.0001, 0.001) : 0;
    
    // Particle stuff
    //this.pointSize = floor(random(1, 4));
    this.minSpeed = random(0, 3);
    this.maxSpeed = settings.minSpeed + random(0, 10);
    this.minLifeInSeconds = random(3, 7);
    this.maxLifeInSeconds = settings.minLifeInSeconds + random(0, 20);
    this.alpha = random(2, 5);
    this.fancyColors = floor(random(0, 2)) ? false : true;
    this.fancyColorRange = random(20, 100);
    this.staticColor = random(0, 100);
  }
}

let gui = null;
let settings = new Settings();

let sclx, scly;
let zoff = 0;
let particles = [];
let flowfield;
let universe;

function setup() {
  textFont('monospace');
  setShakeThreshold(100);

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
  gui.add(settings, 'drawFlowfield');

  let f1 = gui.addFolder('Flow Field');
  f1.add(settings, 'wraparound').onFinishChange(n => init()).listen();
  f1.add(settings, 'cells', 1, 200).step(1).onFinishChange(n => init()).listen();
  f1.add(settings, 'octaves', 1, 10).step(1).onFinishChange(n => init()).listen();
  f1.add(settings, 'falloff', 0, 1).onFinishChange(n => init()).listen();
  f1.add(settings, 'xy_increment', 0, 0.2).listen();
  f1.add(settings, 'z_increment', 0, 0.05).listen();
  
  let f2 = gui.addFolder('Particles');
  f2.add(settings, 'count', 1, 5000).step(1).onFinishChange(n => init());
  f2.add(settings, 'pointSize', 1, 10).step(1).listen();
  f2.add(settings, 'minSpeed', 0, 5).listen();
  f2.add(settings, 'maxSpeed', 0, 25).listen();
  f2.add(settings, 'minLifeInSeconds', 0, 5).listen();
  f2.add(settings, 'maxLifeInSeconds', 0, 30).listen();
  f2.add(settings, 'alpha', 1, 100).listen();
  f2.add(settings, 'fancyColors').onFinishChange(n => init()).listen();
  f2.add(settings, 'fancyColorRange', 0, 100).step(1).listen();
  f2.add(settings, 'staticColor', 0, 100).listen();
  
  f1.open();
  f2.open();
  
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
  background(0);
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
    //updateFlowfield();
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
  // Clear background
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