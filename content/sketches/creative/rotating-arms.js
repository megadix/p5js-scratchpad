let instance = new p5(p => {
  class Segment {
    constructor(theta, omega, l, color) {
      this.theta = theta;
      this.omega = omega;
      this.l = l;
      this.color = color;
    }
  }

  const SCREEN_W = 800;
  const SCREEN_H = 600;

  let centerX, centerY;

  const MAX_SEGMENTS = 6;
  let num = 0;
  let segments = [];

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H);
    reset();
  };

  p.draw = () => {
    drawPendulum();
    update();
  };

  p.touchStarted = () => {
    reset();
  };

  p.mouseClicked = () => {
    reset();
  };

  function reset() {
    p.background(10);

    centerX = p.width / 2;
    centerY = p.height / 2;

    // random number of segments
    num = p.floor(p.random(3, MAX_SEGMENTS));
    const avgLength = (p.width + p.height) / 8;

    segments = [];

    for (let i = 0; i < num; i++) {
      const f = i * 200;

      segments.push(new Segment(
        p.random(0, p.TWO_PI),
        p.random(-p.PI / f, p.PI / f),
        p.random(1, avgLength),
        p.color(p.random(255), p.random(255), p.random(255), 30)
      ));
    }
  }

  function drawPendulum() {
    p.translate(centerX, centerY);

    let x0 = 0;
    let y0 = 0;

    for (let i = 1; i < num; i++) {
      const s = segments[i];

      const x1 = x0 + p.cos(s.theta) * s.l;
      const y1 = y0 + p.sin(s.theta) * s.l

      p.stroke(s.color);
      p.line(x0, y0, x1, y1);

      x0 = x1;
      y0 = y1;
    }
  }

  function update() {
    for (let i = 1; i < num; i++) {
      const s = segments[i];
      s.theta += s.omega * p.deltaTime;
    }
  }
});
