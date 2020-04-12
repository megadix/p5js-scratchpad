const X_MIN = -2.0;
const X_MAX = -0.5;
const X_LEN = X_MAX - X_MIN;

const Y_MIN = -1.2;
const Y_MAX = 0.0;
const Y_LEN = Y_MAX - Y_MIN;

const MAX_ITERATIONS = 16;

let mandelbrotShader;
let halfWidth, halfHeight;
let maxIter = 1;

/* =============================
 * P5.js callbacks
 * ============================= */

function preload() {
  mandelbrotShader = loadShader('mandelbrot-shader.vert', 'mandelbrot-shader.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  halfWidth = width / 2;
  halfHeight = height / 2;
}

function draw() {
  maxIter = map(mouseX, 0, width, 1, MAX_ITERATIONS);
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
    shader(mandelbrotShader);
    mandelbrotShader.setUniform("u_resolution", [width, height]);
    mandelbrotShader.setUniform("u_min", [X_MIN, Y_MIN]);
    mandelbrotShader.setUniform("u_max", [X_MAX, Y_MAX]);
    mandelbrotShader.setUniform("u_point", [fromScreenX(), fromScreenY()]);
    mandelbrotShader.setUniform("u_max_iterations", maxIter);
  rect(toGLScreenX(X_MIN), toGLScreenY(Y_MIN), toGLScreenX(X_LEN), toGLScreenY(Y_LEN));
}
