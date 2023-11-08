let instance = new p5(p => {
  const SCREEN_W = 1000;
  const SCREEN_H = 600;

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

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H);
    p.background(0);
    palettes.push([p.color('#424540'), p.color('#FF3900'), p.color('#F98B3B'), p.color('#E3C6AF'), p.color('#5D9B9C')]);
    palettes.push([p.color('#4D260A'), p.color('#CD6110'), p.color('#CEA64A'), p.color('#FFFF5E'), p.color('#FF7407')]);
    palettes.push([p.color('#A26654'), p.color('#F59682'), p.color('#E7E5DE'), p.color('#B3A79C'), p.color('#DEC0B0')]);
    palettes.push([p.color('#191A22'), p.color('#51545B'), p.color('#9DBCDE'), p.color('#6387AF'), p.color('#2C3B4F')]);
    palettes.push([p.color('#15495C'), p.color('#0084BB'), p.color('#ACA6AD'), p.color('#C9C7CC'), p.color('#77887C')]);
    palettes.push([p.color('#196862'), p.color('#75B791'), p.color('#FFFDF2'), p.color('#FFF1BE'), p.color('#F0DD94')]);

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

  p.draw = () => {
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      particle.update();
      if (particle.isDead()) {
        particles.splice(i, 1);
        continue;
      }
      particle.draw();
    }

    drawControlPanel();
  }

  function drawControlPanel() {
    p.fill(0);
    p.rect(0, 0, 250, p.height);

    p.fill(150);
    p.textStyle(p.BOLD);
    p.text("Alien Brush", 10, 20);

    p.textStyle(p.NORMAL);
    p.text("SPACEBAR to clear", 10, 50);

    p.text("Press NUMBER [n] to choose palette:", 10, 80);

    p.translate(20, 80);

    const blockSize = 12;

    for (let i = 0; i < palettes.length; i++) {
      p.translate(0, 20);
      p.text('[' + (i + 1) + ']', 0, 8);

      p.push();
      p.translate(20, 0);

      for (let j = 0; j < palettes[i].length; j++) {
        p.fill(palettes[i][j]);
        p.rect(0, 0, blockSize, blockSize);
        p.translate(blockSize, 0);
      }
      p.pop();

      if (currentPalette === i) {
        p.push(0);
        p.translate(20, 0);
        p.noFill();
        p.stroke(200);
        p.rect(0, 0, palettes[i].length * blockSize, blockSize);
        p.pop();
      }
    }

    p.translate(-20, 50);
    p.text("Press LETTER [x] to choose shape:", 10, 0);
    p.translate(20, 10);

    for (let i = 0; i < brushes.length; i++) {
      p.translate(0, 20);
      if (currentBrush === i) {
        p.textStyle(p.BOLDITALIC);
      }
      p.text('[' + ((10 + i).toString(16)) + '] ' + brushes[i].name, 0, 0);
      p.textStyle(p.NORMAL);
    }

  }

  function resetDrawing() {
    p.background(0);
    particles = [];
  }

  p.mouseDragged = () => {
    if (particles.length < MAX_N_PARTICLES) {
      particles.push(new Particle(
        p.mouseX, p.mouseY,
        p.mouseX, p.mouseY,
        p.random(palettes[currentPalette])
      ));
    }
  }

  p.keyTyped = () => {
    if (p.key === ' ') {
      resetDrawing();
    } else if (p.key === 'a' || p.key === 'A') {
      currentBrush = 0;
    } else if (p.key === 'b' || p.key === 'B') {
      currentBrush = 1;
    } else if (p.key === 'c' || p.key === 'C') {
      currentBrush = 2;
    } else {
      const parsed = Number.parseInt(p.key);
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
      this.velX += p.random(0, 1) - 0.5;
      this.velY += p.random(0, 1) - 0.5;
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
    const alpha = p.map(MAX_DIST - particle.dist, 0, MAX_DIST, 0, 255);
    p.fill(
      p.red(particle.color),
      p.green(particle.color),
      p.blue(particle.color),
      alpha
    );

    p.stroke(15, 15, 15, alpha);

    p.circle(
      particle.x,
      particle.y,
      Math.sin(p.map(particle.dist, 0, MAX_DIST, p.HALF_PI, p.PI)) * MAX_DIST
    );
  }

  function brushPetal(particle) {
    p.fill(particle.color);
    p.stroke(100);
    p.circle(
      particle.x,
      particle.y,
      (1 - Math.sin(p.map(particle.dist, 0, MAX_DIST, p.HALF_PI, p.PI))) * MAX_DIST
    );
  }

  function brushAlienFinger(particle) {
    const alpha = p.map(MAX_DIST - particle.dist, 0, MAX_DIST, 0, 255);
    p.fill(
      p.red(particle.color),
      p.green(particle.color),
      p.blue(particle.color),
      alpha
    );

    p.stroke(15, 15, 15, alpha);

    p.circle(
      particle.x,
      particle.y,
      (-particle.dist / MAX_DIST + 1) * MAX_DIST / 3
    );
  }
});
