import Sketch from "../../common/Sketch";
import NewtonGravitationScript from "./NewtonGravitationScript";

export default function NewtonGravitationPage() {
  return (
    <>
      <p>Simulation of Solar System using Newton's Universal Gravitation Law</p>
      <ul>
        <li>Scroll mouse to zoom in / out</li>
        <li>
          <code>+</code> and <code>-</code> to change <code>dt</code> (time interval) and see what happens when you
          approximate... too much!
        </li>
      </ul>
      <Sketch sketch={NewtonGravitationScript} />
    </>
  );
}