let instance = new p5(p => {
  const SCREEN_W = 800;
  const SCREEN_H = 600;

  const scaleSize = 100;
  const scaleWeight = 10;

  const G = 9.8;

  let x0, y0;
  let theta1 = p.PI / 2;
  let theta1_v = 0;
  let theta1_a = 0.01;
  let theta2 = -p.PI - 0.001;
  let theta2_v = 0;
  let theta2_a = -0.011;
  let l1 = 1;
  let l2 = 1;
  let m1 = 2;
  let m2 = 1;
  const damp = 0.995;

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H);

    x0 = p.width / 2;
    y0 = p.height / 2;
  };

  p.draw = () => {
    p.background(230);
    drawPendulum();
    update(p.deltaTime / 1000);
  }

  function drawPendulum() {
    p.translate(x0, y0);

    const x1 = l1 * Math.sin(theta1) * scaleSize;
    const y1 = l1 * Math.cos(theta1) * scaleSize;

    const x2 = x1 + l2 * Math.sin(theta2) * scaleSize;
    const y2 = y1 + l2 * Math.cos(theta2) * scaleSize;

    p.stroke(0);
    p.strokeWeight(2);
    p.line(0, 0, x1, y1);
    p.line(x1, y1, x2, y2);
    p.fill(p.color('yellow'));
    p.circle(x1, y1, m1 * scaleWeight);
    p.fill(p.color('red'));
    p.circle(x2, y2, m2 * scaleWeight);
  }

  function update(dt) {
    theta1_v *= damp;
    theta2_v *= damp;

    const theta1_a_num = -G * (2 * m1 + m2) * Math.sin(theta1) - m2 * G * Math.sin(theta1 - 2 * theta2) +
      -2 * Math.sin(theta1 - theta2) * m2 *
      (theta2_v * theta2_v * l2 + theta1_v * theta1_v * l1 * Math.cos(theta1 - theta2));
    const theta1_a_den = l1 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * theta2))

    theta1_a = theta1_a_num / theta1_a_den;

    const theta2_a_num = 2 * Math.sin(theta1 - theta2) * (
      theta1_v * theta1_v * l1 * (m1 + m2) + G * (m1 + m2) * Math.cos(theta1) +
      theta2_v * theta2_v * l2 * m2 * Math.cos(theta1 - theta2)
    );
    const theta2_a_den = l2 * (
      2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * theta2)
    );

    theta2_a = theta2_a_num / theta2_a_den;

    theta1_v += theta1_a * dt;
    theta2_v += theta2_a * dt;

    theta1 += theta1_v * dt;
    theta2 += theta2_v * dt;
  }

});
