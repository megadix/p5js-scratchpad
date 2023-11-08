// See:
// https://en.wikipedia.org/wiki/Mandelbrot_set#Computer_drawings

let instance = new p5(p => {
  const SCREEN_W = 800;
  const SCREEN_H = 600;

  const TARGET_FRAMERATE = 10;

  const X_MIN = -2.0;
  const X_MAX = 1.0;

  const Y_MIN = -2.0;
  const Y_MAX = 2.0;

  const MAX_ITER = 64;

  const palette = [];

  let screen_x = 0;
  let screen_y = 0;

  let frameRate;
  let numCalcPerLoop = 1;
  let buffer;

  function _screenToRealX(x) {
    return p.map(x, 0, p.width, X_MIN, X_MAX);
  }

  function _screenToRealY(y) {
    return p.map(y, 0, p.height, Y_MIN, Y_MAX);
  }

  function _mandelbrot() {
    if (screen_x > p.width) {
      console.log('STOP');
      p.noLoop();
      return;
    }
    if (screen_y > p.height) {
      screen_x++;
      screen_y = 0;
    }

    let x0 = _screenToRealX(screen_x);
    let y0 = _screenToRealY(screen_y);

    let re = 0.0;
    let im = 0.0;
    let re_square = 0.0;
    let im_square = 0.0;

    let i = 0;

    while (i < MAX_ITER && re_square + im_square < 4) {
      const re1 = re_square - im_square + x0;
      const im1 = 2 * re * im + y0;
      re = re1;
      im = im1;
      re_square = re * re;
      im_square = im * im;

      i++;
    }

    buffer.stroke(palette[i], 100, 100);
    buffer.point(screen_x, screen_y);

    screen_y++;
  }

  function _buildPalette() {
    p.colorMode(p.HSB, MAX_ITER + 1, 100, 100);
    buffer.colorMode(p.HSB, MAX_ITER + 1, 100, 100);
    const color_scale = MAX_ITER / Math.log(MAX_ITER);

    for (let i = 0; i < MAX_ITER + 1; i++) {
      palette.push(Math.trunc(Math.log(i + 1) * color_scale));
    }
  }

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H);
    buffer = p.createGraphics(p.windowWidth, p.windowHeight);
    _buildPalette();
    buffer.background(palette[0]);
  };

  p.draw = () => {
    frameRate = p.frameRate();
    if (frameRate > TARGET_FRAMERATE) {
      numCalcPerLoop++;
    }
    else if (frameRate < TARGET_FRAMERATE) {
      numCalcPerLoop--;
    }

    for (let i = 0; i < numCalcPerLoop; i++) {
      _mandelbrot();
    }

    p.image(buffer, 0, 0);
    p.stroke(200);
  };
});
