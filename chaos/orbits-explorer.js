// See:
// https://en.wikipedia.org/wiki/Mandelbrot_set#Computer_drawings

const s = p => {
  let div;

  const X_MIN = -2.5;
  const X_MAX = 1;
  const Y_MIN = -1;
  const Y_MAX = 1;
  const MAX_ITER = 16;

  const palette = [];

  function toScreenX(x) {
    return p.map(x, X_MIN, X_MAX, 0, p.width);
  }

  function toScreenY(y) {
    return p.map(y, Y_MIN, Y_MAX, 0, p.height);
  }

  function _buildPalette() {
    p.colorMode(p.HSB, MAX_ITER + 1, 100, 100);
    const color_scale = MAX_ITER / Math.log(MAX_ITER);
    for (let i = 0; i < MAX_ITER + 1; i++) {
      palette.push(Math.trunc(Math.log(i + 1) * color_scale));
    }
  }

  function _drawBackground() {
    p.strokeWeight(1);
    p.stroke(100);

    const scr_x0 = toScreenX(0);
    const scr_y0 = toScreenY(0);

    p.line(0, scr_y0, p.width, scr_y0);
    p.line(scr_x0, 0, scr_x0, p.height);
  }

  function _drawOrbit() {
    let x0 = p.map(p.mouseX, 0, p.width, X_MIN, X_MAX);
    let y0 = p.map(p.mouseY, 0, p.height, Y_MIN, Y_MAX);

    let re = 0.0;
    let im = 0.0;
    let re_square = 0.0;
    let im_square = 0.0;

    let i = 0;

    let scrx = toScreenX(re);
    let scry = toScreenY(im);

    p.noFill();
    p.beginShape();
    p.stroke(palette[0]);

    p.vertex(scrx, scry);
    p.rect(p.mouseX, p.mouseY, 5, 5);

    while (i < MAX_ITER && re_square + im_square < 4) {
      const re1 = re_square - im_square + x0;
      const im1 = 2 * re * im + y0;
      re = re1;
      im = im1;
      re_square = re * re;
      im_square = im * im;

      i++;

      scrx = toScreenX(re);
      scry = toScreenY(im);

      p.stroke(palette[i], 100, 100);
      p.vertex(scrx, scry);
      p.rect(scrx, scry, 5, 5);
    }

    p.endShape();

  }

  p.setup = () => {
    div = p.canvas.parentElement;
    p.createCanvas(div.clientWidth, div.clientHeight);
    _buildPalette();
  };

  p.draw = () => {
    p.background(0);
    _drawBackground();
    _drawOrbit();
  };
};

let myp5 = new p5(s, 'canvas');