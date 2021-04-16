import PageLayout from "../../common/PageLayout";
import {Link} from "react-router-dom";

export default function SketchesChaosPage() {
  return (
    <PageLayout title="Chaos" description="Chaos, Fractals, and Maths-inspired sketches using p5.js">
      <p>Chaos, Fractals, and Maths-inspired sketches.</p>
      <ul>
        <li><Link to="/sketches/chaos/logistic-map">Logistic Map</Link></li>
        <li><Link to="/sketches/chaos/mandelbrot">Mandelbrot Set</Link></li>
        <li><Link to="/sketches/chaos/mandelbrot-shader">Mandelbrot Set - Shader Version</Link></li>
        <li><Link to="/sketches/chaos/mandelbrot-orbits-explorer">Mandelbrot Set Orbits Explorer</Link></li>
      </ul>
    </PageLayout>
  );
}