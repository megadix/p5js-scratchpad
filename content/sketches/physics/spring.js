let instance = new p5(p => {
  const SCREEN_W = 600;
  const SCREEN_H = 400;
  const SHAPE_SIZE = 20;
  const SHAPE_SIZE_2 = SHAPE_SIZE / 2;

  const GRAVIT_ACCEL = 9.81;

  const spring = {
    // spring constant
    k: 0.1,
    // spring length at rest (m)
    rest: 150,
    // coordinates of fixed end
    nodeX: SCREEN_W / 2,
    nodeY: SCREEN_H / 10,
    damp: 0.92
  };

  const shape = {
    // mass (kg)
    mass: 1,
    // coordinates (meters)
    x: spring.nodeX,
    y: spring.nodeY + spring.rest,
    // velocity (m/s)
    vy: 0
  };

  let hover = false;
  let drag = false;
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
      }
      shape.y = p.mouseY - dragY;
    }
    else {
      // animate object
      const deltaLen = shape.y - spring.nodeY;
      const spring_force = spring.k * (spring.rest - deltaLen);
      const a = spring_force / shape.mass + GRAVIT_ACCEL;
      shape.vy = (shape.vy + a) * spring.damp;
      shape.y += shape.vy;

      if (p.abs(shape.vy) < 0.1) {
        shape.vy = 0.0;
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

    p.line(spring.nodeX, spring.nodeY, shape.x, shape.y);
    p.rect(shape.x - SHAPE_SIZE_2, shape.y - SHAPE_SIZE_2, SHAPE_SIZE, SHAPE_SIZE, SHAPE_SIZE / 5);
  };
});
