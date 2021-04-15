import PageLayout from "../../common/PageLayout";
import {Link} from "react-router-dom";

export default function SketchesCreativePage() {
  return (
    <PageLayout title="Creative">
      <ul>
        <li><Link to="/sketches/creative/wobble-circles">Wobble Circles</Link></li>
        <li><Link to="/sketches/creative/maze">Maze</Link></li>
        <li><Link to="/sketches/creative/alien-brush">Alien Brush</Link></li>
      </ul>
    </PageLayout>
  );
}