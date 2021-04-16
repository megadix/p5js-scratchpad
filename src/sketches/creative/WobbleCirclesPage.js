import Sketch from "../../common/Sketch";
import WobbleCirclesScript from "./WobbleCirclesScript";
import PageLayout from "../../common/PageLayout";

export default function WobbleCirclesPage() {
  return (
    <PageLayout title="Wobble Circles"
                description="An hypnotic, wobbling tunnel">
      <Sketch sketch={WobbleCirclesScript}/>
    </PageLayout>
  );
}