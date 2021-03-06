import PageLayout from "../../common/PageLayout";
import {Link} from "react-router-dom";

export default function SketchesPhysicsPage() {
  return (
    <PageLayout title="Physics"
                description="Physics-based sketches using p5.js">
      <p>Physics-based sketches:</p>
      <ul>
        <li><Link to="/sketches/physics/gravity">Gravity</Link></li>
        <li><Link to="/sketches/physics/gravity_ropes">Gravity and hanging bodies</Link></li>
        <li><Link to="/sketches/physics/normal_friction">Normal and Friction Forces</Link></li>
        <li><Link to="/sketches/physics/spring">Spring</Link></li>
        <li><Link to="/sketches/physics/newton-gravitation">Newton Gravitation</Link></li>
        <li><Link to="/sketches/physics/double-pendulum">Double Pendulum</Link></li>
      </ul>
    </PageLayout>
  );
}