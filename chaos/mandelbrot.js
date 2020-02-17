// See:
// https://en.wikipedia.org/wiki/Mandelbrot_set#Computer_drawings

const s = p => {
  const SCREEN_W = 800;
  const SCREEN_H = 600;

  const X_MIN = -2.5;
  const X_MAX = 1;

  const Y_MIN = -1;
  const Y_MAX = 1;

  const MAX_ITER = 64;

  const x_increment = (X_MAX - X_MIN) / SCREEN_W;
  const y_increment = (Y_MAX - Y_MIN) / SCREEN_H;

  const palette = [];

  function mandelbrot() {
    for (let screen_x = 0; screen_x <= SCREEN_W; screen_x++) {
      for (let screen_y = 0; screen_y <= SCREEN_H; screen_y++) {
        let x0 = p.map(screen_x, 0, SCREEN_W, X_MIN, X_MAX);
        let y0 = p.map(screen_y, 0, SCREEN_H, Y_MIN, Y_MAX);

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

        p.stroke(palette[i], 100, 100);
        p.point(screen_x, screen_y);
      }
    }
  }

  function buildPalette() {
    const color_scale = MAX_ITER / Math.log(MAX_ITER);
    for (let i = 0; i < MAX_ITER + 1; i++) {
      palette.push(Math.trunc(Math.log(i + 1) * color_scale));
    }
  }

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H);
    p.noLoop();
    p.colorMode(p.HSB, MAX_ITER + 1, 100, 100);
    buildPalette();
  };

  p.draw = () => {
    p.background(230);
    mandelbrot();
  };
};

let myp5 = new p5(s);
