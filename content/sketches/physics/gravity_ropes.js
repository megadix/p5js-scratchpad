let instance = new p5(p => {
  const SCREEN_W = 600;
  const SCREEN_H = 400;

  const GRAVIT_ACCEL = 9.81;

  const tableY = SCREEN_H / 4;
  const tableRight = SCREEN_W - SCREEN_W / 6;

  // same velocity (with different direction) for both bodies
  let vel = 0;
  let ropeLen = (SCREEN_W + SCREEN_H) / 10 * 6;

  let hover = false;

  const body_1 = {
    size: SCREEN_W / 12,
    mass: 3.0,
    x: 0,
    y: 0
  };

  const body_2 = {
    size: SCREEN_W / 32,
    mass: 0.1,
    x: 0,
    y: 0
  };

  let status = 'IDLE';

  function updatePositions(body1X) {
    const body2X = tableRight + SCREEN_W / 16;
    const body2Y = ropeLen - (body2X - body1X);
    if (body2Y > SCREEN_H) {
      if (status === 'ANIMATION') {
        console.log('stop 2');
        // stop animation
        status = 'END';
      }
      return;
    }

    body_1.x = body1X;
    body_1.y = tableY - body_1.size / 2;

    body_2.x = body2X;
    body_2.y = body2Y;
  }

  function resetBodies() {
    vel = 0;
    updatePositions(body_1.size / 2);
  }

  function update() {
    hover = false;

    if (status === 'IDLE') {
      hover =
        p.mouseX > body_1.x - body_1.size / 2 && p.mouseX < (body_1.x + body_1.size / 2) &&
        p.mouseY > body_1.y - body_1.size / 2 && p.mouseY < (body_1.y + body_1.size / 2);

      return;
    }

    const a = body_2.mass * GRAVIT_ACCEL / (body_1.mass + body_2.mass);
    vel += a;
    updatePositions(body_1.x + vel);
  }

  function draw() {
    p.background(230);

    // table
    p.fill(180);
    p.rect(0, tableY, tableRight, SCREEN_H);

    // body 1
    if (hover) {
      p.fill(100);
    } else {
      p.fill(50);
    }

    p.rect(
      body_1.x - body_1.size / 2,
      body_1.y - body_1.size / 2,
      body_1.size, body_1.size
    );

    // body 2
    p.fill(50);
    p.rect(
      body_2.x - body_2.size / 2,
      body_2.y - body_2.size / 2,
      body_2.size, body_2.size
    );

    // pulley
    p.line(
      tableRight, tableY,
      body_2.x, body_1.y
    );

    // ropes
    p.line(
      body_1.x, body_1.y,
      body_2.x, body_1.y
    );
    p.line(
      body_2.x, body_1.y,
      body_2.x, body_2.y
    );
  }

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H);
    resetBodies();
  };

  p.draw = () => {
    update();
    draw();
  };

  p.mouseClicked = () => {
    if (status === 'END') {
      resetBodies();
    }
    status = 'ANIMATION';
  };
});
