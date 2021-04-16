import Sketch from "../../common/Sketch";
import GravityScript from "./GravityScript";

export default function GravityPage() {
  return (
    <>
      <p>Drag the small square anywhere in the box, then let it fall.</p>
      <Sketch sketch={GravityScript} />
    </>
  );
}