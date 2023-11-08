/*
 * Inspired by:
 * https://openprocessing.org/user/281256/?view=sketches&o=48
 */

let instance = new p5(p => {
  const SCREEN_W = 800;
  const SCREEN_H = 600;

  const BUILDING_WIDTH = 20;
  const MOON_ORBIT = 2500;
  const MOON_SPEED = 1;

  let c = 0
  let z = 0

  let shiftY = -30;

  let moonX = 0;
  let moonShiftX = 0;
  let moonShiftY = 500;
  let moonY = 150;
  let moonZ = -3000;

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H, p.WEBGL, p.lights);
    p.frameRate(30);
    // p.noLoop();
    calculateMoonCoords();
  };

  p.draw = () => {
    p.background(0);
    p.noStroke();

    drawPlane();

    for (let j = 0; j < 100; j++) {
      for (let i = -20; i < 20; i++) {
        if (i === 0 || i % 3 === 0 || i % 4 === 0) {
          continue;
        }
        drawBuilding(i, j);
      }
    }
    c = (c - 10) % BUILDING_WIDTH;
    if (c === 0) z++;

    drawMoon();
    calculateMoonCoords();
  };

  function drawPlane() {
    p.push();
    // p.emissiveMaterial(20, 10, 10, 250);
    p.ambientMaterial(20, 10, 10);
    p.rotateX(p.PI / 2.0);
    p.translate(0, 0, -100);
    p.plane(1500, 1500);
    p.pop();
  }

  function drawMoon() {
    p.fill(255);
    p.translate(moonX, moonY, moonZ);
    p.sphere(200, 20, 20);
  }

  function calculateMoonCoords() {
    moonY = -p.sin(p.frameCount / 200 * MOON_SPEED) * MOON_ORBIT + moonShiftY;
    moonX = p.cos(p.frameCount / 200 * MOON_SPEED) * MOON_ORBIT + moonShiftX;
  }

  function drawBuilding(i, j) {
    p.push();
    let h = p.noise(2 + i * 0.5, (z + j) * 0.5) * 250;
    p.fill(p.map(j, 0, 100, 0, 255));
    p.translate(
      p.map(i, -20, 20, -400, 400),
      -h / 2 + 250 + shiftY,
      -j * 20 + 330 - c
    );
    p.box(20, h, 20)
    p.pop()
  }

  p.keyTyped = () => {
    console.log(`#1 "${p.key}"`);
    if (p.key === ' ') {
      p.redraw();
    }
  };
});
