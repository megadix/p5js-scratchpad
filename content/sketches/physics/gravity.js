let instance = new p5(p => {
  const SCREEN_W = 600;
  const SCREEN_H = 400;
  const SHAPE_SIZE = 20;
  const SHAPE_SIZE_2 = SHAPE_SIZE / 2;

  const GRAVIT_ACCEL = 9.81;

  const shape = {
    // mass (kg)
    mass: 1,
    // coordinates (meters)
    x: SCREEN_W / 2,
    y: SCREEN_H / 10,
    // velocity (m/s)
    vy: 0
  };

  let hover = false;
  let drag = false;
  let dragX = 0;
  let dragY = 0;

  function update() {
    hover =
      p.mouseX > shape.x - SHAPE_SIZE_2 && p.mouseX < (shape.x + SHAPE_SIZE_2) &&
      p.mouseY > shape.y - SHAPE_SIZE_2 && p.mouseY < (shape.y + SHAPE_SIZE_2);

    const startDrag = !drag && hover;
    drag = p.mouseIsPressed;

    if (drag) {
      // manipulate object
      if (startDrag) {
        dragY = p.mouseY - shape.y;
        dragX = p.mouseX - shape.x;
      }
      shape.x = p.constrain(p.mouseX - dragX, SHAPE_SIZE_2, SCREEN_W - SHAPE_SIZE_2);
      shape.y = p.mouseY - dragY;
    }
    else {
      // animate object
      shape.vy = (shape.vy + GRAVIT_ACCEL);
      shape.y = shape.y + shape.vy;

      if (shape.y > SCREEN_H - SHAPE_SIZE_2) {
        shape.vy = 0.0;
        shape.y = SCREEN_H - SHAPE_SIZE_2;
      }
    }
  }

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H);
  };

  p.draw = () => {
    update();

    p.background(230);

    if (hover) {
      p.fill(100);
    }
    else {
      p.fill(51);
    }

    p.rect(shape.x - SHAPE_SIZE_2, shape.y - SHAPE_SIZE_2, SHAPE_SIZE, SHAPE_SIZE, SHAPE_SIZE / 5);
  };
});
