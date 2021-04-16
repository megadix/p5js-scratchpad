import Sketch from "../../common/Sketch";
import NormalFrictionScript from "./NormalFrictionScript";

export default function NormalFrictionPage() {
  return (
    <>
      <p>Click anywhere to start / reset the simulation.</p>
      <Sketch sketch={NormalFrictionScript} />
    </>
  );
}