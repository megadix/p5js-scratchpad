let instance = new p5(p => {
  const SCREEN_W = 800;
  const SCREEN_H = 600;

  const maxIter = 10;
  const minDt = 0.1;
  const maxDt = 1.0;
  let shader;

  p.preload = () => {
    shader = p.loadShader('/lib/shaders/default.vert', 'double-pendulum-chaos.frag');
  }

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H, p.WEBGL);
    p.noStroke();
  };

  p.draw = () => {
    const numIter = p.map(p.mouseX, 0, p.width, 1, maxIter, true);
    const dt = p.map(p.mouseY, 0, p.height, maxDt, minDt, true);

    shader.setUniform("resolution", [p.width, p.height]);
    shader.setUniform("num_iter", numIter);
    shader.setUniform("dt", dt);
    shader.setUniform("l1", 1);
    shader.setUniform("l2", 1);
    shader.setUniform("m1", 1);
    shader.setUniform("m2", 1);

    p.shader(shader);
    p.rectMode(p.CENTER);
    p.rect(0, 0, p.width, p.height);
  }

});
