const X_MIN = -2.0;
const X_MAX = 1.0;
const X_LEN = X_MAX - X_MIN;

const Y_MIN = -2.0;
const Y_MAX = 2.0;
const Y_LEN = Y_MAX - Y_MIN;

let SPREAD = 12;

let mandelbrotShader;
let halfWidth, halfHeight;
let shading = true;

/* =============================
 * P5.js callbacks
 * ============================= */

function preload() {
  mandelbrotShader = loadShader('mandelbrot-shader.vert', 'mandelbrot-shader.frag');
}

function setup() {
  createCanvas(windowWidth * 0.8, windowHeight * 0.8, WEBGL);
  noStroke();

  halfWidth = width / 2;
  halfHeight = height / 2;
}

function draw() {
  orbitControl();
  background(0);
  _drawMandelbrot();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  halfWidth = width / 2;
  halfHeight = height / 2;
}

/* =============================
 * Helper functions
 * ============================= */

function toGLScreenX(x) {
  return map(x, X_MIN, X_MAX, -halfWidth, halfWidth);
}

function fromScreenX(x) {
  return map(x, 0, width, X_MIN, X_MAX);
}

function toGLScreenY(y) {
  return map(y, Y_MIN, Y_MAX, -halfHeight, halfHeight);
}

function fromScreenY(y) {
  return map(y, 0, height, Y_MIN, Y_MAX);
}

function _drawMandelbrot() {
  if (shading) {
    shader(mandelbrotShader);
    mandelbrotShader.setUniform("u_resolution", [width, height]);
    mandelbrotShader.setUniform("u_min", [X_MIN, Y_MIN]);
    mandelbrotShader.setUniform("u_max", [X_MAX, Y_MAX]);
    mandelbrotShader.setUniform("u_point", [fromScreenX(), fromScreenY()]);
  } else {
    fill(100);
  }
  rect(toGLScreenX(X_MIN), toGLScreenY(Y_MIN), toGLScreenX(X_LEN), toGLScreenY(Y_LEN));

  if (shading) {
    resetShader();
  }
}
