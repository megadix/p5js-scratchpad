let instance = new p5(p => {
  let handPose;
  let video;
  let hands = [];

  const SCREEN_W = 800;
  const SCREEN_H = 600;
  const NUM_KEYPOINTS = 21;

  const HARD_MAX_PARTICLES = NUM_KEYPOINTS;
  const MIN_FALLOFF = 5;
  const MAX_FALLOFF = 11;

  const MIN_HALO = 0.26;
  const MAX_HALO = 0.29;

  const PALETTE = {
    wrist: [1, 0, 0],
    thumbFinger: [0, 1, 0],
    indexFinger: [0, 0, 1],
    middleFinger: [1, 1, 0],
    ringFinger: [1, 0, 1],
    pinkyFinger: [0, 1, 1],
  };

  let particles;
  let numParticles;
  let theShader;
  let particlesCoords = [];
  let particlesColors = [];
  let particlesFalloff = [];
  let particlesHalo = [];

  let halfWidth, halfHeight;

  p.preload = () => {
    handPose = ml5.handPose({
      maxHands: 1,
      modelType: 'lite'
    });
    theShader = p.loadShader('/lib/shaders/default.vert', '/lib/shaders/Particles.frag');
  }

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H, p.WEBGL);
    // Create the webcam video and hide it
    video = p.createCapture(p.VIDEO);
    video.size(SCREEN_W, SCREEN_H);
    video.hide();
    // start detecting hands from the webcam video
    handPose.detectStart(video, gotHands);

    resetParticles();
    p.shader(theShader);
  }

  // Callback function for when handPose outputs data
  function gotHands(results) {
    // save the output to the hands variable
    hands = results;
  }

  function update() {
    // Draw only the first hand
    let hand = hands[0];
    for (let i = 0; i < numParticles; i++) {
      const particle = particles[i];
      let keypoint = hand.keypoints[i];
      // flip the axes
      particle.pos.x = p.map(keypoint.x, 0, SCREEN_W, 1, -1);
      particle.pos.y = p.map(keypoint.y, 0, SCREEN_H, 1, -1);

      particle.update();
    }
  }

  function getColorForKeypoint(i) {
    if (i === 0) {
      return PALETTE.wrist;
    } else if (i >= 1 && i <= 4) {
      return PALETTE.thumbFinger;
    } else if (i >= 5 && i <= 8) {
      return PALETTE.indexFinger;
    } else if (i >= 9 && i <= 12) {
      return PALETTE.middleFinger;
    } else if (i >= 13 && i <= 16) {
      return PALETTE.ringFinger;
    } else if (i >= 17 && i <= 20) {
      return PALETTE.pinkyFinger;
    }
  }

  function resetParticles() {
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
      const keypointColor = getColorForKeypoint(i);
      const color = p.createVector(keypointColor[0], keypointColor[1], keypointColor[2]);

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

  p.draw = () => {
    if (!theShader) {
      p.background(255, 0, 0);
      throw new Error('Shader not loaded');
    }


    // Draw the webcam video
    //p.image(video, 0, 0, SCREEN_W, SCREEN_H);
    p.background(10);

    if (!hands.length) {
      return;
    }

    update();

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
  }

});
