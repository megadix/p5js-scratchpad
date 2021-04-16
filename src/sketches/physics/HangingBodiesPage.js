import Sketch from "../../common/Sketch";
import HangingBodiesScript from "./HangingBodiesScript";

export default function HangingBodiesPage() {
  return (
    <>
      <p>Click anywhere to start / reset the simulation.</p>
      <Sketch sketch={HangingBodiesScript} />
    </>
  );
}