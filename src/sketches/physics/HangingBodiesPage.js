import Sketch from "../../common/Sketch";
import HangingBodiesScript from "./HangingBodiesScript";
import PageLayout from "../../common/PageLayout";

export default function HangingBodiesPage() {
  return (
    <PageLayout title="Hanging Bodies"
                description="p5.js sketch illustrating the effect of gravity on bodies attached with a rope">
      <p>This sketch illustrates the effect of gravity on bodies attached with a rope.</p>
      <p>Click anywhere to start / reset the simulation.</p>
      <Sketch sketch={HangingBodiesScript}/>
    </PageLayout>
  );
}