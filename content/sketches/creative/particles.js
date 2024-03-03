let instance = new p5(p => {
  const SCREEN_W = 800;
  const SCREEN_H = 600;

  let halfWidth, halfHeight;

  const HARD_MAX_PARTICLES = 20;

  const MIN_FALLOFF = 5;
  const MAX_FALLOFF = 11;

  const MIN_HALO = 0.26;
  const MAX_HALO = 0.29;

  let numParticles;
  let theShader;
  let particlesCoords = [];
  let particlesCoords_z = [];
  let particlesColors = [];
  let particlesFalloff = [];
  let particlesHalo = [];

  let lorentzSpeed = 1e-4;
  let sigma = 10;
  let rho = 28;
  let beta = 8 / 3;

  let minX = -30;
  let maxX = 30;
  let maxWidth = maxX - minX;

  let minY = -30;
  let maxY = 40;
  let maxHeight = maxY - minY;

  let minZ = 0;
  let maxZ = 60;

  p.preload = () => {
    theShader = p.loadShader('/lib/shaders/default.vert', '/lib/shaders/Particles.frag');
  };

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H, p.WEBGL);
    reset();
  };

  function reset() {
    halfWidth = p.width / 2;
    halfHeight = p.height / 2;

    // numParticles = p.floor(p.random(10, HARD_MAX_PARTICLES));
    numParticles = HARD_MAX_PARTICLES;

    particlesCoords = new Array(HARD_MAX_PARTICLES * 2);
    particlesColors = new Array(HARD_MAX_PARTICLES * 3);
    particlesFalloff = new Array(HARD_MAX_PARTICLES);
    particlesHalo = new Array(HARD_MAX_PARTICLES);

    for (let i = 0; i < HARD_MAX_PARTICLES; i++) {
      const fallof = MAX_FALLOFF;
      const halo = MAX_HALO;
      const color = p.createVector(p.random(), p.random(), p.random());

      particlesCoords[i * 2] = (p.random(minX, maxX) - minX) / maxWidth;
      particlesCoords[i * 2 + 1] = (p.random(minY, maxY) - minY) / maxHeight;
      particlesCoords_z[i] = p.random(minZ, maxZ);

      particlesColors[i * 3] = color.x;
      particlesColors[i * 3 + 1] = color.y;
      particlesColors[i * 3 + 2] = color.z;

      particlesFalloff[i] = fallof;
      particlesHalo[i] = halo;
    }
  }

  p.draw = () => {
    if (!theShader) {
      p.background(255, 0, 0);
      throw new Error('Shader not loaded');
    }
    p.shader(theShader);

    p.background(50);

    theShader.setUniform('resolution', [p.width, p.height]);
    theShader.setUniform('partCount', numParticles);
    theShader.setUniform('particles', particlesCoords, 2);
    theShader.setUniform('partColors', particlesColors, 3);
    theShader.setUniform('partFalloff', particlesFalloff);
    theShader.setUniform('partHalo', particlesHalo);

    const noiseSigma = 1 + ((p.noise(p.frameCount * 0.002) - 0.5) / 1000);
    const noiseRho = 1 + ((p.noise(p.frameCount * 0.005) - 0.5) / 1000);
    const noiseBeta = 1 + ((p.noise(p.frameCount * 0.007) - 0.5) / 1000);

    for (let i = 0; i < numParticles; i++) {
      const x = particlesCoords[i * 2] * maxWidth + minX;
      const y = particlesCoords[i * 2 + 1] * maxHeight + minY;
      const z = particlesCoords_z[i];

      // Lorentz Attractor with some noise added
      const dx = sigma * noiseSigma * (y - x) * p.deltaTime * lorentzSpeed;
      const dy = (x * (rho * noiseRho - z) - y) * p.deltaTime * lorentzSpeed;
      const dz = (x * y - beta * noiseBeta * z) * p.deltaTime * lorentzSpeed;

      particlesCoords[i * 2] += dx / maxWidth;
      particlesCoords[i * 2 + 1] += dy / maxHeight;
      particlesCoords_z[i] += dz;

      const v2 = Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2);

      let falloff = p.constrain(
        p.map(v2, 0.05, 0.21, 0, 1),
        0, 1
      );
      falloff = 1 - Math.pow(falloff, 0.5);
      particlesFalloff[i] = p.lerp(MIN_FALLOFF, MAX_FALLOFF, falloff);

      let halo = p.constrain(
        p.map(v2, 0.05, 0.21, 0, 1),
        0, 1
      );
      halo = Math.pow(halo, 0.5);
      particlesHalo[i] = p.lerp(MIN_HALO, MAX_HALO, halo);
    }

    // if (p.frameCount % 50 === 0) {
    //   console.log(noiseRho);
    // }

    p.rect(-1, -1, 1, 1);
  };

  p.touchStarted = () => {
    reset();
  };

  p.mousePressed = () => {
    reset();
  };

});
