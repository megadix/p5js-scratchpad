import Sketch from "../../common/Sketch";
import ThrustScript from "./ThrustScript";

export default function ThrustPage() {
  return (
    <>
      <p>A classic game.</p>
      <p>Controls:</p>
      <ul>
        <li><code>ARROW RIGHT</code> / <code>ARROW LEFT</code>: rotate ship clockwise / counterclockwise</li>
        <li><code>ARROW UP</code>: fire thrust</li>
      </ul>
      <Sketch sketch={ThrustScript} />
    </>
  );
}