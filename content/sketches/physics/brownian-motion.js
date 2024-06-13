let instance = new p5(p => {
  const SCREEN_W = 800;
  const SCREEN_H = 600;

  const HARD_MAX_PARTICLES = 20;

  const MIN_FALLOFF = 5;
  const MAX_FALLOFF = 11;

  const MIN_HALO = 0.26;
  const MAX_HALO = 0.29;

  let particles;
  let numParticles;
  let theShader;
  let particlesCoords = [];
  let particlesColors = [];
  let particlesFalloff = [];
  let particlesHalo = [];

  let halfWidth, halfHeight;

  p.preload = () => {
    theShader = p.loadShader('/lib/shaders/default.vert', '/lib/shaders/Particles.frag');
  };

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H, p.WEBGL);
    reset();
    p.shader(theShader);
  };

  p.draw = () => {
    if (!theShader) {
      p.background(255, 0, 0);
      throw new Error('Shader not loaded');
    }

    // p.shader(theShader);

    update();

    p.background(20);

    for (let i = 0; i < numParticles; i++) {
      const particle = particles[i];
      particlesCoords[i * 2] = particle.pos.x + 0.5;
      particlesCoords[i * 2 + 1] = particle.pos.y + 0.5;

      particlesColors[i * 3] = particle.meta.color.x;
      particlesColors[i * 3 + 1] = particle.meta.color.y;
      particlesColors[i * 3 + 2] = particle.meta.color.z;

      particlesFalloff[i] = particle.meta.fallof;
      particlesHalo[i] = particle.meta.halo;

      p.stroke(particle.meta.color.x * 255, particle.meta.color.y * 255, particle.meta.color.z * 255);

      p.point(particle.pos.x, particle.pos.y);
    }

    theShader.setUniform('resolution', [p.width, p.height]);
    theShader.setUniform('partCount', numParticles);
    theShader.setUniform('particles', particlesCoords, 2);
    theShader.setUniform('partColors', particlesColors, 3);
    theShader.setUniform('partFalloff', particlesFalloff);
    theShader.setUniform('partHalo', particlesHalo);

    p.rect(-1, -1, 1, 1);
  };

  p.touchStarted = () => {
    reset();
  };

  p.mousePressed = () => {
    reset();
  };

  function reset() {
    halfWidth = p.width / 2;
    halfHeight = p.height / 2;

    numParticles = HARD_MAX_PARTICLES;
    particles = new Array(numParticles);

    particlesCoords = new Array(HARD_MAX_PARTICLES * 2);
    particlesColors = new Array(HARD_MAX_PARTICLES * 3);
    particlesFalloff = new Array(HARD_MAX_PARTICLES);
    particlesHalo = new Array(HARD_MAX_PARTICLES);

    for (let i = 0; i < numParticles; i++) {
      const fallof = p.lerp(MIN_FALLOFF, MAX_FALLOFF, p.random());
      const halo = p.lerp(MIN_HALO, MAX_HALO, p.random());
      const color = p.createVector(p.random(), p.random(), p.random());

      const particle = new Particle(
        p,
        p.createVector(
          p.random(-0.3, 0.3),
          p.random(-0.3, 0.3)
        ),
        p.createVector(),
        p.createVector(),
        {
          color,
          fallof,
          halo
        }
      );

      particles[i] = particle;
    }
  }

  function update() {
    for (let i = 0; i < numParticles; i++) {
      const particle = particles[i];
      particle.pos.x += p.random(-0.001, 0.001);
      particle.pos.y += p.random(-0.001, 0.001);

      particle.update();

    }
  }
});
