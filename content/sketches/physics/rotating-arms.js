let instance = new p5(p => {
  const SCREEN_W = 400;
  const SCREEN_H = 300;

  let x0, y0;

  let omega1 = p.PI / 1000;
  let omega2 = p.PI / 400;
  let omega3 = - p.PI / 600;

  let theta1, theta2, theta3

  let len1 = 70;
  let len2 = 30;
  let len3 = 20;

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H);

    x0 = p.width / 2;
    y0 = p.height / 2;

    theta1 = p.random(0, p.TWO_PI);
    theta2 = p.random(0, p.TWO_PI);
    theta3 = p.random(0, p.TWO_PI);
  };

  p.draw = () => {
    p.background(230);
    drawPendulum();
    update();
  }

  function drawPendulum() {
    p.translate(x0, y0);

    p.stroke(0);
    p.strokeWeight(2);

    const x1 = len1 * Math.sin(theta1);
    const y1 = len1 * Math.cos(theta1);

    const x2 = x1 + len2 * Math.sin(theta2);
    const y2 = y1 + len2 * Math.cos(theta2);

    const x3 = x2 + len3 * Math.sin(theta3);
    const y3 = y2 + len3 * Math.cos(theta3);

    p.line(0, 0, x1, y1);
    p.line(x1, y1, x2, y2);
    p.line(x2, y2, x3, y3);

    p.fill(p.color('yellow'));
    p.circle(x1, y1, 20);
    p.fill(p.color('red'));
    p.circle(x2, y2, 10);
    p.fill(p.color('blue'));
    p.circle(x3, y3, 5);
  }

  function update() {
    theta1 += omega1 * p.deltaTime;
    theta2 += omega2 * p.deltaTime;
    theta3 += omega3 * p.deltaTime;
  }
});
