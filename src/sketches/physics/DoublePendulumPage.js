import Sketch from "../../common/Sketch";
import PageLayout from "../../common/PageLayout";
import DoublePendulumScript from "./DoublePendulumScript";

export default function DoublePendulumPage() {
  return (
    <PageLayout title="Double Pendulum"
                description="p5.js sketch: Kinematics of the Double Pendulum">
      <p>This sketch illustrates the chaotic behavior of a double pendulum.</p>
      <p>
        Reference: <a href="https://www.myphysicslab.com/pendulum/double-pendulum-en.html"
           target="_blank" rel="noreferrer">Double Pendulum</a> by Erik Neumann - myPhysicsLab
      </p>
      <Sketch sketch={DoublePendulumScript} />
    </PageLayout>
  );
}