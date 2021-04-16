import Sketch from "../../common/Sketch";
import NormalFrictionScript from "./NormalFrictionScript";
import PageLayout from "../../common/PageLayout";

export default function NormalFrictionPage() {
  return (
    <PageLayout title="Normal and Friction Forces"
                description="p5.js sketch illustrating normal and friction forces">
      <p>This sketch illustrates the effect of normal and friction forces.</p>
      <p>Click anywhere to start / reset the simulation.</p>
      <Sketch sketch={NormalFrictionScript}/>
    </PageLayout>
  );
}