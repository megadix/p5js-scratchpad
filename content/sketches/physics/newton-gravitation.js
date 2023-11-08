let instance = new p5(p => {
  class Body {
    constructor(name, mass, position, velocity, force, color) {
      this.name = name;
      this.mass = mass;
      this.position = position;
      this.velocity = velocity;
      this.force = force;
      this.color = color;
    }

    update(dt) {
      this.velocity.x += dt * this.force.x / this.mass;
      this.velocity.y += dt * this.force.y / this.mass;

      this.position.x += dt * this.velocity.x;
      this.position.y += dt * this.velocity.y;
    }
  }

  const SCREEN_W = 800;
  const SCREEN_H = 600;

  const G = 6.674e-11
  const maxZoomIn = 70000000e3;
  const maxZoomOut = 7e12;
  let zoom = 5e12;

  const minDt = 10e3;
  const maxDt = 10e6;
  const defaultDt = 10e4;
  let dt = 10e4;

  let bodies;
  let minMass = 3.3011e23;
  let maxMass = 0.0;

  function initSimulation() {
    const newBody = (name, mass, dist, vely, col) => {
      if (name !== 'Sun') {
        maxMass = p.max(maxMass, mass);
      }
      const theta = p.random(0, p.PI);

      return new Body(
        name, mass,
        p.createVector(p.cos(theta) * dist, p.sin(theta) * dist),
        p.createVector(p.cos(theta + p.HALF_PI) * vely, p.sin(theta + p.HALF_PI) * vely),
        p.createVector(0.0, 0.0),
        p.color(col)
      );
    }

    bodies = {}
    dt = defaultDt;

    bodies["Sun"] = newBody("Sun", 1.9885e30, 0.0, 0.0, '#ffff00');
    bodies["Mercury"] = newBody("Mercury", 3.3011e23, (69816900e3 + 46001200e3) / 2.0, 47.36e3, '#ff0000');
    bodies["Venus"] = newBody("Venus", 4.8675e24, (108939000e3 + 107477000e3) / 2.0, 35.02e3, '#ffff99');
    bodies["Earth"] = newBody("Earth", 5.97237e24, (152100000e3 + 147095000e3) / 2.0, 29.78e3, '#0099ff');
    bodies["Mars"] = newBody("Mars", 6.4171e23, (249200000e3 + 206700000e3) / 2.0, 24.007e3, '#ff6600');

    // TODO asteroid belt?

    bodies["Jupyter"] = newBody("Jupyter", 1.8982e27, (816.62e9 + 740.52e9) / 2.0, 13.07e3, '#ffcc00');
    bodies["Saturn"] = newBody("Saturn", 5.6834e26, (1.514e12 + 1.35255e12) / 2.0, 9.68e3, '#99ff99');
    bodies["Uranus"] = newBody("Uranus", 8.6810e25, (3.008e12 + 2.742e12) / 2.0, 6.8e3, '#99bbff');
    bodies["Neptune"] = newBody("Neptune", 1.024e26, (4.54e12 + 4.46e12) / 2.0, 5.43e3, '#99ffff');
  }

  function update() {
    // add gravitational forces
    Object.values(bodies).forEach(body1 => {
      body1.force = p.createVector(0.0, 0.0);

      Object.values(bodies).forEach(body2 => {
        if (body1 !== body2) {
          const dist = p5.Vector.sub(body2.position, body1.position)
          const r = dist.mag();
          const r2 = r * r;
          // Newton FTW
          const scalarForce = G * body1.mass * body2.mass / r2
          body1.force.x += scalarForce * dist.x / r;
          body1.force.y += scalarForce * dist.y / r;
        }
      });
    });
  }

  p.setup = () => {
    p.noLoop();
    p.createCanvas(SCREEN_W, SCREEN_H);
    initSimulation();
  }

  p.mouseWheel = (event) => {
    zoom *= (event.delta < 0) ? 0.9 : 1.1;
    zoom = p.constrain(zoom, maxZoomIn, maxZoomOut)
    if (!p.isLooping()) {
      p.redraw();
    }
  }

  p.keyPressed = () => {
    switch (p.keyCode) {
      case p.RIGHT_ARROW:
        dt = p.constrain(dt * 2.0, minDt, maxDt);
        break;
      case p.LEFT_ARROW:
        dt = p.constrain(dt / 2.0, minDt, maxDt);
        break;
      case p.ESCAPE:
        p.noLoop();
        initSimulation();
        p.redraw();
        break;
      default:
      // do nothing, but keeps linter happy
    }
  };

  p.keyTyped = () => {
    switch (p.key) {
      case ' ':
        if (p.isLooping()) {
          p.noLoop();
        } else {
          p.loop();
        }
        break;
      default:
      // do nothing, but keeps linter happy
    }
  };

  p.draw = () => {
    if (p.isLooping()) {
      Object.values(bodies).forEach(body => body.update(dt));
    }

    p.background(0);

    let texty = 10;

    Object.values(bodies).forEach(body => {
      p.stroke(body.color);
      p.fill(body.color);

      const radius = (body.name === 'Sun') ? 5 : p.map(body.mass, minMass, maxMass, 1, 4);

      p.circle(
        p.map(body.position.x, -zoom, zoom, 0, p.width),
        p.map(body.position.y, -zoom, zoom, 0, p.height),
        radius
      );

      p.circle(10, texty, radius);
      p.textStyle(p.NORMAL);
      p.textSize(12);
      p.textAlign(p.LEFT, p.CENTER);
      p.text(body.name, 20, texty);

      texty += 20;
    });

    p.text(`dt = ${p.round(dt, 2)}`, p.width - 80, 10);

    if (!p.isLooping()) {
      p.text('(paused)', p.width - 80, 30);
    }

    update();
  }

});
