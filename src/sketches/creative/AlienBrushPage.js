import Sketch from "../../common/Sketch";
import AlienBrushScript from "./AlienBrushScript";
import PageLayout from "../../common/PageLayout";

export default function AlienBrushPage() {
  return (
    <PageLayout title="Alien Brush"
                description="Play and paint with an evolving, unpredictable set of brushes using p5.js">
      <p>Play and paint with an evolving, unpredictable set of brushes.</p>
      <p>Use the palette for maximum creativity!</p>
      <Sketch sketch={AlienBrushScript}/>
    </PageLayout>
  );
}