let instance = new p5(p => {
  const WIDTH = 800;
  const HEIGHT = 600;

  let numCircles = 10;
  let thetaIncr = p.TWO_PI / 30;

  let noiseAmpl;
  let maxRadius;
  let innerRadiusReduce;

  let thetaFrame = 0.0;
  let thetaFrameIncr = 0.00002;


  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
    // p.noLoop();
    noiseAmpl = p.width / 10;
    maxRadius = p.width / 3;
    innerRadiusReduce = noiseAmpl / 4;
  };

  p.draw = () => {
    p.background(0);

    p.push();
    p.translate(p.width / 2, p.height / 2);

    p.noFill();

    for (let i = 0; i < numCircles; i++) {
      p.beginShape();

      let curMaxRadius = maxRadius - i * innerRadiusReduce;
      const stroke = p.map(curMaxRadius, maxRadius / innerRadiusReduce, maxRadius, 0, 255);
      p.stroke(stroke);

      let theta = 0.0;

      let r = null;
      let x = null;
      let y = null;

      r = curMaxRadius - p.noise(theta + thetaFrame, curMaxRadius) * noiseAmpl;

      while(theta < p.TWO_PI) {
        r = curMaxRadius - p.noise(theta + thetaFrame, curMaxRadius) * noiseAmpl;
        x = r * Math.cos(theta);
        y = r * Math.sin(theta);
        p.curveVertex(x, y);

        theta += thetaIncr;
        thetaFrame += thetaFrameIncr;
      }

      p.endShape(p.CLOSE);
    }

    p.pop();
  };
});
