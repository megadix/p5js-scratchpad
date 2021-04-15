import {Link} from "react-router-dom";
import PageLayout from "../../common/PageLayout";

export default function SketchesGamesPage() {
  return (
    <PageLayout title="Games">
      <ul>
        <li><Link to="/sketches/games/starfield">Starfield</Link></li>
        <li><Link to="/sketches/games/thrust">Thrust</Link></li>
      </ul>
    </PageLayout>
  );
}