import Sketch from "../../common/Sketch";
import PageLayout from "../../common/PageLayout";
import DoublePendulumChaosScript from "./DoublePendulumChaosScript";

export default function DoublePendulumChaosPage() {
  return (
    <PageLayout title="Double Pendulum Chaos"
                description="p5.js sketch: Chaos emerging from Double Pendulum">
      <p>Chaos emerging from a double pendulum evolution.</p>
      <p>Controls:</p>
      <ul>
        <li>Mouse left / right: number of iterations</li>
        <li>Mouse up / Down: time resolution</li>
      </ul>
      <Sketch sketch={DoublePendulumChaosScript}/>
    </PageLayout>
  );
}