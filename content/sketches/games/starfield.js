let instance = new p5(p => {
  const SCREEN_W = 1000;
  const SCREEN_H = 600;

  p.disableFriendlyErrors = true;

  let div;

  const NUM_STARS = 500;
  const MAX_TRAIL = 30;
  const MAX_DIST = 100;
  const STARS_WIDTH = 100000;
  const STARS_WIDTH_2 = STARS_WIDTH / 2;

  const MIN_SPEED = 0.1;
  const MAX_SPEED = 40;
  const ACCEL = 1;
  const DECEL = 2;
  const TRAIL = 0.5;

  const stars = [];
  let trailNum = 1;
  let fpsSum = 0;
  let fpsNum = 0;
  let lastFps = null;

  let speed = MIN_SPEED;
  let direction = {
    x: 0,
    y: 0
  };

  let screenWidth_2;
  let screenHeight_2;

  function randomizeStar(star) {
    star.x = Math.random() * STARS_WIDTH - STARS_WIDTH_2;
    star.y = Math.random() * STARS_WIDTH - STARS_WIDTH_2;
    star.col.r = Math.round(Math.random() * 155 + 140);
    star.col.g = Math.round(Math.random() * 155 + 140);
    star.col.b = Math.round(Math.random() * 155 + 140);
  }

  function update() {
    const frameRate = p.frameRate();

    if (p.keyIsPressed === true && p.keyCode === p.CONTROL) {
      speed += ACCEL / frameRate;
      trailNum += TRAIL * (MAX_SPEED - speed) / frameRate;
    }
    else {
      speed -= DECEL / frameRate;
      trailNum -= TRAIL * (MAX_SPEED - speed) / frameRate;
    }

    speed = p.constrain(speed, MIN_SPEED, MAX_SPEED);
    trailNum = p.constrain(trailNum, 1, MAX_TRAIL);

    for (let i = 0; i < NUM_STARS; i++) {
      const star = stars[i];
      star.z -= speed;
      if (star.z < 1) {
        randomizeStar(star);
        star.z = MAX_DIST;
      }
    }

    screenWidth_2 = p.width / 2;
    screenHeight_2 = p.height / 2;

    if (fpsNum === 30) {
      lastFps = fpsSum / fpsNum;
      fpsSum = 0;
      fpsNum = 0;
    }
    else {
      fpsSum += p.frameRate();
      fpsNum++;
    }
  }

  function draw() {
    p.loadPixels();

    for (let i = 0; i < NUM_STARS; i++) {
      for (let j = 0; j < trailNum; j++) {
        const star = stars[i];
        const z = star.z + j / 6;
        if (z < 0) {
          continue;
        }
        const x = star.x / z + screenWidth_2 + direction.x;
        const y = star.y / z + screenHeight_2 + direction.y;
        if (x < 0 || x >= p.width || y < 0 || y >= p.height) {
          continue;
        }

        const base = (Math.round(y) * p.width + Math.round(x)) * 4;

        const darken = Math.pow(p.map(z, 1, MAX_DIST, 1, 3), 1.7);

        p.pixels[base + 0] = star.col.r * 2 / darken;
        p.pixels[base + 1] = star.col.g * 2 / darken;
        p.pixels[base + 2] = star.col.b * 2 / darken;
        p.pixels[base + 3] = 255;
      }
    }

    p.updatePixels();

    p.stroke(128);
    p.fill(255);
    p.text('Press CTRL for warp', 10, 10);
    p.text('FPS: ' + (lastFps ? Math.round(lastFps) : ''), 10, 30);
  }

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H);
    p.pixelDensity(1);
    p.noCursor();

    for (let i = 0; i < NUM_STARS; i++) {
      const star = {
        x: null, y: null, z: null,
        col: { r: null, g: null, b: null }
      };
      randomizeStar(star);
      star.z = p.map(NUM_STARS - i, 0, NUM_STARS, 0, MAX_DIST);
      stars.push(star);
    }
  };

  p.draw = () => {
    p.background(0);
    update();
    draw();
  };

  p.windowResized = function () {
    p.resizeCanvas(div.clientWidth, div.clientHeight);
  };

  p.mouseMoved = () => {
    const limitX = p.width / 10;
    const limitY = p.height / 10;


    direction.x = p.constrain(p.mouseX - screenWidth_2, -limitX, limitX);
    direction.y = p.constrain(p.mouseY - screenHeight_2, -limitY, limitY);
  }
});
