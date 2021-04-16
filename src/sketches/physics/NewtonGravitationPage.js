import Sketch from "../../common/Sketch";
import NewtonGravitationScript from "./NewtonGravitationScript";
import PageLayout from "../../common/PageLayout";

export default function NewtonGravitationPage() {
  return (
    <PageLayout title="Newtonian Solar System"
                description="p5.js Simulation of Solar System using Newton's Universal Gravitation Law">
      <p>Simulation of Solar System using Newton's Universal Gravitation Law</p>
      <ul>
        <li><code>SPACEBAR</code>: pause / run</li>
        <li><code>SCROLL</code> mouse to zoom in / out</li>
        <li><code>ARROW LEFT / RIGHT</code> to change value for <code>dt</code></li>
        <li><code>ESC</code> restart simulation</li>
      </ul>
      <Sketch sketch={NewtonGravitationScript}/>
    </PageLayout>
  );
}