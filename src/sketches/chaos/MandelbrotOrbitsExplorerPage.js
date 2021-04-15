import Sketch from "../../common/Sketch";
import MandelbrotOrbitsExplorerScript from "./MandelbrotOrbitsExplorerScript";

export default function MandelbrotOrbitsExplorerPage() {
  return (
    <>
      <p>Mandelbrot Set Orbit Explorer</p>
      <Sketch sketch={MandelbrotOrbitsExplorerScript} />
    </>
  );
}