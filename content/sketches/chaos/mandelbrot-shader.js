let instance = new p5(p => {
  const SCREEN_W = 800;
  const SCREEN_H = 600;

  const X_MIN = -2.0;
  const X_MAX = 0.75;
  const X_LEN = X_MAX - X_MIN;

  const Y_MIN = -1.2;
  const Y_MAX = 1.2;
  const Y_LEN = Y_MAX - Y_MIN;

  const MAX_ITERATIONS = 16;

  let mandelbrotShader;
  let halfWidth, halfHeight;
  let maxIter = 1;

  /* =============================
   * P5.js callbacks
   * ============================= */

  p.preload = () => {
    mandelbrotShader = p.loadShader('/lib/shaders/default.vert', 'mandelbrot-shader.frag');
  }

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H, p.WEBGL);
    p.noStroke();

    halfWidth = p.width / 2;
    halfHeight = p.height / 2;
  }

  p.draw = () => {
    maxIter = p.map(p.mouseX, 0, p.width, 1, MAX_ITERATIONS);
    _drawMandelbrot();
  }

  /* =============================
   * Helper functions
   * ============================= */

  function toGLScreenX(x) {
    return p.map(x, X_MIN, X_MAX, -halfWidth, halfWidth);
  }

  function toGLScreenY(y) {
    return p.map(y, Y_MIN, Y_MAX, -halfHeight, halfHeight);
  }

  function _drawMandelbrot() {
    p.shader(mandelbrotShader);
    mandelbrotShader.setUniform("u_resolution", [p.width, p.height]);
    mandelbrotShader.setUniform("u_min", [X_MIN, Y_MIN]);
    mandelbrotShader.setUniform("u_max", [X_MAX, Y_MAX]);
    mandelbrotShader.setUniform("u_max_iterations", maxIter);
    p.rect(toGLScreenX(X_MIN), toGLScreenY(Y_MIN), toGLScreenX(X_LEN), toGLScreenY(Y_LEN));
  }

});
