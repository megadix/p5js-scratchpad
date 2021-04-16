import Sketch from "../../common/Sketch";
import MandelbrotSetScript from "./MandelbrotSetScript";
import PageLayout from "../../common/PageLayout";

export default function MandelbrotSetPage() {
  return (
    <PageLayout title="Mandelbrot Set"
                description="Simple rendering of the Mandelbrot Set using p5.js">
      <p>One-pass rendering of the <a href="https://en.wikipedia.org/wiki/Mandelbrot_set" target="_blank" rel="noreferrer">Mandelbrot Set</a>.</p>
      <p>
        This time I experimented with <a href="https://p5js.org/reference/#/p5/frameRate">P5.js's <code>frameRate()</code></a>:
        each <code>draw()</code> call renders as many lines as allowed by the computer power, trying to keep a steady
        flow of pixels.
      </p>
      <Sketch sketch={MandelbrotSetScript} />
    </PageLayout>
  );
}