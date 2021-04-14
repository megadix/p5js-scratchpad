const TestSketch = (p) => {

  function onResize() {
    const container = p.canvas.parentNode;
    p.resizeCanvas(container.offsetWidth, container.offsetHeight);
  }

  p.setup = () => {
    onResize();
  }

  p.windowResized = () => onResize();

  p.draw = () => {
    p.background(0);
    p.fill(255);
    p.rect(
      p.width / 3.0,
      p.height / 3.0,
      p.width / 3.0,
      p.height / 3.0
    );
  };
};

export default TestSketch;