import Sketch from "../../common/Sketch";
import LogisticMapScript from "./LogisticMapScript";
import PageLayout from "../../common/PageLayout";

export default function LogisticMapPage() {
  return (
    <PageLayout title="Logistic Map" description="Rendering of a Logistic Map with p5.js">
      <p>
        Simple rendering of a <a href="https://en.wikipedia.org/wiki/Logistic_map" target="_blank" rel="noreferrer">Logistic Map</a>
      </p>
      <p>
        The entire map is generated in one go, thus if you don't see anything just wait for it to be calculated.
      </p>
      <Sketch sketch={LogisticMapScript} />
    </PageLayout>
  );
}