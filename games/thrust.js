const s = p => {
  function Ship(mass) {
    this.mass = mass;
    this.theta = p.HALF_PI;
    this.thrust = 0;
    this.pos = p.createVector(0, 0);
    this.acc = p.createVector(0, 0);
    this.vel = p.createVector(0, 0);
  }

  Ship.prototype.update = function () {
    let incThrust = false;

    if (p.keyIsDown(p.LEFT_ARROW)) {
      this.theta += 0.1;
    }
    if (p.keyIsDown(p.RIGHT_ARROW)) {
      this.theta -= 0.1;
    }
    if (p.keyIsDown(p.UP_ARROW)) {
      incThrust = true;
    }

    this.thrust += incThrust ? THRUST_STEP_UP : -THRUST_STEP_DOWN;
    this.thrust = p.constrain(this.thrust, 0, MAX_THRUST);

    this.acc.x = this.thrust * Math.cos(this.theta) / this.mass / frameRate;
    this.acc.y = (this.thrust * Math.sin(this.theta) / this.mass - this.mass * GRAVITY) / frameRate;
    this.vel.add(this.acc.x, this.acc.y);
    this.pos.add(this.vel);

    if (this.pos.y <= 0) {
      this.acc.x = 0;
      this.vel.x = 0;

      this.acc.y = 0;
      this.vel.y = 0;
      this.pos.y = 0;

      this.theta = p.HALF_PI;
    }

    this.pos.x = p.constrain(this.pos.x, 0, p.width);
    this.pos.y = p.constrain(this.pos.y, 0, p.height);
  };

  Ship.prototype.render = function () {
    p.fill(127);
    p.stroke(200);
    p.push();
    p.translate(this.pos.x, p.height - this.pos.y - 10);
    p.rotate(-this.theta + p.HALF_PI);

    // ship
    p.beginShape();
    p.vertex(-10, 10);
    p.vertex(10, 10);
    p.vertex(0, -20);
    p.endShape(p.CLOSE);

    // exhaust
    if (this.thrust > 0) {
      p.fill(200);
      p.beginShape();
      p.vertex(-5, 10);
      p.vertex(0, 10 + p.map(this.thrust, 0, MAX_THRUST, 0, 10));
      p.vertex(5, 10);
      p.endShape(p.CLOSE);
    }

    p.pop();

    p.stroke(128);
    p.fill(255);
    p.text(`thrust = ${ship.thrust.toFixed(1)}`, 10, 10);
    p.text(`a[x, y] = [${(ship.acc.x * frameRate).toFixed(1)}, ${(ship.acc.y * frameRate).toFixed(1)}]`, 10, 30);
    p.text(`v[x, y] = [${(ship.vel.x * frameRate).toFixed(1)}, ${(ship.vel.y * frameRate).toFixed(1)}]`, 10, 50);
  };

  function thDrawBackground() {
    p.background(0);
    const y = p.height - 1;
    p.line(0, y, p.width, y);
  }

  const SHIP_MASS = 1;
  const THRUST_STEP_UP = 2;
  const THRUST_STEP_DOWN = 0.4;
  const MAX_THRUST = 5;

  const GRAVITY = 1.625;

  let div;
  let frameRate;

  p.setup = () => {
    div = p.canvas.parentElement;
    p.createCanvas(div.clientWidth, div.clientHeight);
    p.noCursor();

    ship = new Ship(SHIP_MASS);
    const pos = p.createVector(p.width / 2, p.height / 2);
    ship.pos.add(pos);
  };

  p.draw = () => {
    frameRate = p.frameRate();
    thDrawBackground();
    ship.update();
    ship.render();
  };
};

let myp5 = new p5(s, 'canvas');
