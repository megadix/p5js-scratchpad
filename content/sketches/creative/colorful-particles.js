let instance = new p5(p => {
  p.setup = function() {
    p.createCanvas(400, 300);
    // Your setup code goes here
  };

  p.draw = function() {
    // draw a grey background
    p.background(100);
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.setup(); // Re-initialize the sketch
  };
});
