import Sketch from "../../common/Sketch";
import AlienBrushScript from "./AlienBrushScript";

export default function AlienBrushPage() {
  return (
    <>
      <p>Play and paint with an evolving, unpredictable set of brushes.</p>
      <p>Use the palette for maximum creativity!</p>
      <Sketch sketch={AlienBrushScript}/>
    </>
  );
}