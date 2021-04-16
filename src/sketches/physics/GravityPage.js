import Sketch from "../../common/Sketch";
import GravityScript from "./GravityScript";
import PageLayout from "../../common/PageLayout";

export default function GravityPage() {
  return (
    <PageLayout title="Gravity"
                description="p5.js sketch illustrating gravity">
      <p>This sketch illustrates the effect of gravity on free bodies.</p>
      <p>Drag the small square anywhere in the box, then let it fall.</p>
      <Sketch sketch={GravityScript} />
    </PageLayout>
  );
}