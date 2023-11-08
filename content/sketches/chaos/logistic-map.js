let instance = new p5(p => {
  const SCREEN_W = 800;
  const SCREEN_H = 600;

  const R_MIN = 0.0;
  const R_MAX = 4.0;
  const R_INCREMENT = 0.001;
  const X0_START_INCREMENT = 0.01;
  const MIN_DIFF = 0.0001;
  const MAX_ITERATIONS = 1024;

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H);
    p.noLoop();
  };

  p.draw = () => {
    p.background(230);

    for (let r = R_MIN; r < R_MAX; r += R_INCREMENT) {
      for (let x0_start = 0.0; x0_start < 1.0; x0_start += X0_START_INCREMENT) {
        let x0 = x0_start;
        let i = 0;
        while (i < MAX_ITERATIONS) {
          const x1 = r * x0 * (1 - x0);
          const diff = Math.abs(x1 - x0);
          x0 = x1;
          if (diff < MIN_DIFF) {
            break;
          }
          i++;
        }
        // p.stroke(`hsl(${Math.trunc(Math.log10(i))}, 100%, 50%)`);
        p.point(r * SCREEN_W / R_MAX, x0 * SCREEN_H);
      }
    }
  };
});
