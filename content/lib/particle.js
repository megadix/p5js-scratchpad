/**
 * Particle class
 */
class Particle {
    constructor(p5, pos, vel, acc, meta) {
        this.pos = pos || p5.createVector();
        this.vel = vel || p5.createVector();
        this.acc = acc || p5.createVector();
        this.meta = meta || {};
    }

    update() {
      this.pos.add(this.vel);
      this.vel.add(this.acc);
    }
}
