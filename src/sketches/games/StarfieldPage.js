import Sketch from "../../common/Sketch";
import StarfieldScript from "./StarfieldScript";
import PageLayout from "../../common/PageLayout";

export default function StarfieldPage() {
  return (
    <PageLayout title="Starfield"
                description="An interactive 3D starfield created with p5.js">
      <p>Don't forget to activate Warp Speeed ;)</p>
      <Sketch sketch={StarfieldScript} />
    </PageLayout>
  );
}