import Sketch from "../../common/Sketch";
import MandelbrotOrbitsExplorerScript from "./MandelbrotOrbitsExplorerScript";
import PageLayout from "../../common/PageLayout";

export default function MandelbrotOrbitsExplorerPage() {
  return (
    <PageLayout title="Mandelbrot Set Orbits Explorer"
                description="A tool to visualize the orbits of each point in the Mandelbrot Set written using p5.js">
      <p>A tool to visualize the orbits of each point in the Mandelbrot Set</p>
      <Sketch sketch={MandelbrotOrbitsExplorerScript}/>
    </PageLayout>
  );
}