import Sketch from "../../common/Sketch";
import SpringScript from "./SpringScript";

export default function SpringPage() {
  return (
    <>
      <p>Click anywhere to start / reset the simulation.</p>
      <p>You can also drag the body up / down (even off screen) to see the effect at various starting points.</p>
      <Sketch sketch={SpringScript} />
    </>
  );
}