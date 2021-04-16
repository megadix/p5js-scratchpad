import PageLayout from "../common/PageLayout";
import {Link} from "react-router-dom";

export default function SketchesHomePage() {
  return (
    <PageLayout title="Sketches" description="All p5.js sketches">
      <ul>
        <li><Link to='/sketches/chaos'>Chaos</Link></li>
        <li><Link to='/sketches/creative'>Creative</Link></li>
        <li><Link to='/sketches/games'>Games</Link></li>
        <li><Link to='/sketches/physics'>Physics</Link></li>
      </ul>
    </PageLayout>
  );
}