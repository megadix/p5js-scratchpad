// See:
// https://en.wikipedia.org/wiki/Mandelbrot_set#Computer_drawings

let instance = new p5(p => {
  const SCREEN_W = 800;
  const SCREEN_H = 600;

  const X_MIN = -2.0;
  const X_MAX = 1.0;

  const Y_MIN = -2.0;
  const Y_MAX = 2.0;

  const MAX_ITER = 16;

  let SPREAD = 12;
  let started = false;

  const palette = [];
  let buffer;

  function toScreenX(x) {
    return p.map(x, X_MIN, X_MAX, 0, p.width);
  }

  function toScreenY(y) {
    return p.map(y, Y_MIN, Y_MAX, 0, p.height);
  }

  function _buildPalette() {
    p.colorMode(p.HSB, MAX_ITER + 1, 100, 100);
    buffer.colorMode(p.HSB, MAX_ITER + 1, 100, 100);
    const color_scale = MAX_ITER / Math.log(MAX_ITER);
    for (let i = 0; i < MAX_ITER + 1; i++) {
      palette.push(Math.trunc(Math.log(i + 1) * color_scale));
    }
  }

  function _drawAxes() {
    p.stroke(100);

    const scr_x0 = toScreenX(0);
    const scr_y0 = toScreenY(0);

    p.line(0, scr_y0, p.width, scr_y0);
    p.line(scr_x0, 0, scr_x0, p.height);
  }

  function _drawOrbit(startX, startY, drawPath) {
    let x0 = p.map(startX, 0, p.width, X_MIN, X_MAX);
    let y0 = p.map(startY, 0, p.height, Y_MIN, Y_MAX);

    let re = 0.0;
    let im = 0.0;
    let re_square = 0.0;
    let im_square = 0.0;

    let i = 0;

    let scrx0 = toScreenX(re);
    let scry0 = toScreenY(im);
    let scrx = scrx0;
    let scry = scry0;

    while (i < MAX_ITER && re_square + im_square < 4) {
      const re1 = re_square - im_square + x0;
      const im1 = 2 * re * im + y0;
      re = re1;
      im = im1;
      re_square = re * re;
      im_square = im * im;

      i++;

      const scrx1 = toScreenX(re);
      const scry1 = toScreenY(im);

      if (drawPath) {
        p.stroke(palette[i], 100, 100);
        p.line(scrx, scry, scrx1, scry1);
        p.rect(scrx1 - 2, scry1 - 2, 4, 4);
      }

      scrx = scrx1;
      scry = scry1;
    }

    buffer.stroke(palette[i], 100, 100);
    buffer.point(startX, startY);
  }

  function _drawMandelbrot() {
    if (!started) {
      return;
    }

    const xi = p.mouseX - SPREAD;
    const xf = p.mouseX + SPREAD;
    const yi = p.mouseY - SPREAD;
    const yf = p.mouseY + SPREAD;

    const pixel = buffer.get(p.mouseX, p.mouseY);

    for (let x = xi; x <= xf; x++) {
      for (let y = yi; y <= yf; y++) {
        if (!(x === p.mouseX && y === p.mouseY) && pixel[0] === 0 && pixel[1] === 0 && pixel[2] === 0) {
          _drawOrbit(x, y, false);
        }
      }
    }
    _drawOrbit(p.mouseX, p.mouseY, true);
  }

  function _drawText() {
    p.fill(200);
    p.stroke(10);
    p.text('Mandelbrot Orbits Explorer', 10, 20);
    p.text('Press SPACEBAR to clean', 10, 40);
  }

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H);
    buffer = p.createGraphics(p.windowWidth, p.windowHeight);
    _buildPalette();
    buffer.background(palette[0]);
  };

  p.draw = () => {
    p.image(buffer, 0, 0);
    _drawAxes();
    _drawMandelbrot();
    _drawText();
  };

  p.mouseMoved = () => {
    started = true;
  };

  p.keyTyped = () => {
    if (p.key === ' ') {
      buffer.background(palette[0]);
    }
  }
});
