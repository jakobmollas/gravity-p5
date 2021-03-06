'use strict'

class Settings {
  constructor() {
    // General
    this.animate = true;
    this.showDiagnostics = false;
    this.showAttractors = false;

    this.particleCount = 4000;
    this.attractorCount = 4;
    this.pointSize = 1.0;
    this.minGravity = 1000;
    this.maxGravity = 50000;
    this.alpha = 8;
  }

  randomize() {
    this.attractorCount = floor(random(3, 8));
  }
}

let gui = null;
let settings = new Settings();
let universe;

function setup() {
  textFont('monospace');
  setShakeThreshold(75);

  createGuiControls();
  initCanvas();
  createNewRandomWorld();
}

function windowResized() {
  initCanvas();
  restart();
}

function createGuiControls() {
  gui = new dat.GUI();

  gui.add(settings, 'animate');
  gui.add(settings, 'showDiagnostics');
  gui.add(settings, 'showAttractors');

  let f1 = gui.addFolder('Particles');
  f1.add(settings, 'attractorCount', 1, 10).step(1).listen().onFinishChange(n => restart());
  f1.add(settings, 'particleCount', 1, 5000).step(1).listen().onFinishChange(n => restart());
  f1.add(settings, 'pointSize', 1, 10).step(1).listen();
  f1.add(settings, 'minGravity', 0, 100000).listen();
  f1.add(settings, 'maxGravity', 0, 300000).listen();
  f1.add(settings, 'alpha', 1, 255).listen();
  f1.open();

  gui.close();
}

function initCanvas() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
}

function createNewRandomWorld() {
  settings.randomize();
  restart();
}

function restart() {
  universe = new Universe();
  background(15, 10, 10);
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
  if (settings.showDiagnostics) {
    drawDiagnostics();
  }

  universe.update();
  universe.draw();
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
  text("Count: " + settings.particleCount.toFixed(), 10, 40);

  pop();
}