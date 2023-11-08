let instance = new p5(p => {
  const SCREEN_W = 600;
  const SCREEN_H = 400;
  const SHAPE_SIZE = 20;

  // gravitational acceleration
  const g = 9.81;
  // kinetic friction coefficient
  const mu_k = 0.04;

  const shape = {
    // coordinates (meters)
    x: 0,
    y: SCREEN_H - SCREEN_H / 10 - SHAPE_SIZE,
    // velocity (m/s)
    vx: 0
  };

  let status = 'IDLE';

  function update() {
    if (status === 'IDLE') {
      return;
    }

    if (status === 'NEW_ANIMATION') {
      shape.x = SHAPE_SIZE;
      // give some initial speed
      shape.vx = 20; // m/s
      status = 'ANIMATION';
    }

    if (shape.vx < 0.1) {
      // stop animation
      shape.vx = 0;
      status = 'END';
    }

    if (shape.vx > 0) {
      const a = -g * mu_k;
      shape.vx += a;
    }
    shape.x = p.constrain(shape.x + shape.vx, 0, SCREEN_W);
  }

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H);
  };

  p.draw = () => {
    update();

    p.background(230);

    const groundY = SCREEN_H - SCREEN_H / 10;
    p.line(0, groundY, SCREEN_W, groundY);

    if (status === 'ANIMATION' || status === 'END') {
      p.rect(shape.x, shape.y, SHAPE_SIZE, SHAPE_SIZE);
    }
  };

  p.mouseClicked = () => {
    if (status === 'IDLE' || status === 'END') {
      status = 'NEW_ANIMATION';
    }
  };
});
