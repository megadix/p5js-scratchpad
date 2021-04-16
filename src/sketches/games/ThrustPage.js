import Sketch from "../../common/Sketch";
import ThrustScript from "./ThrustScript";
import PageLayout from "../../common/PageLayout";

export default function ThrustPage() {
  return (
    <PageLayout title="Thrust"
                description="The classic game of Thrust made with p5.js">
      <p>The classic game of Thrust.</p>
      <p>Controls:</p>
      <ul>
        <li><code>ARROW RIGHT</code> / <code>ARROW LEFT</code>: rotate ship clockwise / counterclockwise</li>
        <li><code>ARROW UP</code>: fire thrust</li>
      </ul>
      <Sketch sketch={ThrustScript}/>
    </PageLayout>
  );
}