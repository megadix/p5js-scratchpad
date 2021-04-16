import PageLayout from "../../common/PageLayout";
import {Link} from "react-router-dom";

export default function SketchesChaosPage() {
  return (
    <PageLayout title="Chaos">
      <ul>
        <li><Link to="/sketches/chaos/logistic-map">Logistic Map</Link></li>
        <li><Link to="/sketches/chaos/mandelbrot">Mandelbrot Set</Link></li>
        <li><Link to="/sketches/chaos/mandelbrot-shader">Mandelbrot Set - Shader Version</Link></li>
        <li><Link to="/sketches/chaos/mandelbrot-orbits-explorer">Mandelbrot Set Orbits Explorer</Link></li>
      </ul>
    </PageLayout>
  );
}