import Sketch from "../../common/Sketch";
import SpringScript from "./SpringScript";
import PageLayout from "../../common/PageLayout";

export default function SpringPage() {
  return (
    <PageLayout title="Spring Forces"
    description="p5.js sketch illustrating spring forces">
      <p>This sketch illustrates the effect of spring forces.</p>
      <p>Click anywhere to start / reset the simulation.</p>
      <p>You can also drag the body up / down (even off screen) to see the effect at various starting points.</p>
      <Sketch sketch={SpringScript} />
    </PageLayout>
  );
}