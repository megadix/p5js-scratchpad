/*
 * Inspired by:
 *
 * Generative Art for Beginners | Particle System Algorithms with Vanilla JavaScript and HTML Canvas
 * https://youtu.be/vDnsnsozSBo
 * by Frank's Laboratory
 */

const MAX_DIST = 50;
const MAX_N_PARTICLES = 100;

let particles = [];

const palettes = [];
let currentPalette;

const brushes = [];
let currentBrush;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  palettes.push([color('#424540'), color('#FF3900'), color('#F98B3B'), color('#E3C6AF'), color('#5D9B9C')]);
  palettes.push([color('#4D260A'), color('#CD6110'), color('#CEA64A'), color('#FFFF5E'), color('#FF7407')]);
  palettes.push([color('#A26654'), color('#F59682'), color('#E7E5DE'), color('#B3A79C'), color('#DEC0B0')]);
  palettes.push([color('#191A22'), color('#51545B'), color('#9DBCDE'), color('#6387AF'), color('#2C3B4F')]);
  palettes.push([color('#15495C'), color('#0084BB'), color('#ACA6AD'), color('#C9C7CC'), color('#77887C')]);
  palettes.push([color('#196862'), color('#75B791'), color('#FFFDF2'), color('#FFF1BE'), color('#F0DD94')]);

  currentPalette = 0;

  brushes.push(
    {
      name: 'Worm',
      fn: brushWorm
    },
    {
      name: 'Petal',
      fn: brushPetal
    },
    {
      name: 'Alien finger',
      fn: brushAlienFinger
    }
  );

  currentBrush = 0;
}

function draw() {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.update();
    if (p.isDead()) {
      particles.splice(i, 1);
      continue;
    }
    p.draw();
  }

  drawControlPanel();
}

function drawControlPanel() {
  fill(0);
  rect(0, 0, 250, height);

  fill(150);
  textStyle(BOLD);
  text("Alien Brush", 10, 20);

  textStyle(NORMAL);
  text("SPACEBAR to clear", 10, 50);

  text("Press NUMBER [n] to choose palette:", 10, 80);

  translate(20, 80);

  const blockSize = 12;

  for (let i = 0; i < palettes.length; i++) {
    translate(0, 20);
    text('[' + (i + 1) + ']', 0, 8);

    push();
    translate(20, 0);
    for (let j = 0; j < palettes[i].length; j++) {
      fill(palettes[i][j]);
      rect(0, 0, blockSize, blockSize);
      translate(blockSize, 0);
    }
    pop();

    if (currentPalette === i) {
      push(0);
      translate(20, 0);
      noFill();
      stroke(200);
      rect(0, 0, palettes[i].length * blockSize, blockSize);
      pop();
    }
  }

  translate(-20, 50);
  text("Press LETTER [x] to choose shape:", 10, 0);
  translate(20, 10);

  for (let i = 0; i < brushes.length; i++) {
    translate(0, 20);
    if (currentBrush === i) {
      textStyle(BOLDITALIC);
    }
    text('[' + (new Number(10 + i).toString(16)) + '] ' + brushes[i].name, 0, 0);
    textStyle(NORMAL);
  }

}

function resetDrawing() {
  background(0);
  particles = [];
}

function mouseDragged() {
  if (particles.length < MAX_N_PARTICLES) {
    particles.push(new Particle(
      mouseX, mouseY,
      mouseX, mouseY,
      random(palettes[currentPalette])
    ));
  }
}

function keyTyped() {
  if (key === ' ') {
    resetDrawing();
  } else if (key === 'a' || key === 'A') {
    currentBrush = 0;
  } else if (key === 'b' || key === 'B') {
    currentBrush = 1;
  } else if (key === 'c' || key === 'C') {
    currentBrush = 2;
  } else {
    const parsed = Number.parseInt(key);
    if (!Number.isNaN(parsed) && parsed > 0 && parsed <= palettes.length) {
      currentPalette = parsed - 1;
    }
  }
  return false;
}

class Particle {
  constructor(x, y, centerX, centerY, color) {
    this.velX = 0;
    this.velY = 0;
    this.x = x;
    this.y = y;
    this.centerX = centerX;
    this.centerY = centerY;
    this.color = color;
  }

  update() {
    this.velX += random(0, 1) - 0.5;
    this.velY += random(0, 1) - 0.5;
    this.x += this.velX;
    this.y += this.velY;

    this.dist =
      Math.sqrt(
        Math.pow(this.centerX - this.x, 2) +
        Math.pow(this.centerY - this.y, 2)
      )
  }

  isDead() {
    return this.dist > MAX_DIST;
  }

  draw() {
    brushes[currentBrush].fn(this);
  }
}

/*
 * Brush implementations
 */

function brushWorm(particle) {
  const alpha = map(MAX_DIST - particle.dist, 0, MAX_DIST, 0, 255);
  fill(
    red(particle.color),
    green(particle.color),
    blue(particle.color),
    alpha
  );

  stroke(15, 15, 15, alpha);

  circle(
    particle.x,
    particle.y,
    Math.sin(map(particle.dist, 0, MAX_DIST, HALF_PI, PI)) * MAX_DIST
  );
}

function brushPetal(particle) {
  fill(particle.color);
  stroke(100);
  circle(
    particle.x,
    particle.y,
    (1 - Math.sin(map(particle.dist, 0, MAX_DIST, HALF_PI, PI))) * MAX_DIST
  );
}

function brushAlienFinger(particle) {
  const alpha = map(MAX_DIST - particle.dist, 0, MAX_DIST, 0, 255);
  fill(
    red(particle.color),
    green(particle.color),
    blue(particle.color),
    alpha
  );

  stroke(15, 15, 15, alpha);

  circle(
    particle.x,
    particle.y,
    (-particle.dist / MAX_DIST + 1) * MAX_DIST / 3
  );
}