import PageLayout from "./common/PageLayout";
import {Link} from "react-router-dom";

export default function HomePage() {
  return (
    <PageLayout title="Homepage"
                suppressInPageTitle
                description="Homepage">
      <p>
        A (semi)random collection of <a href="https://p5js.org/" target="_blank" rel="noreferrer">p5.js</a> scripts:
        exercises, experiments... fun!
      </p>
      <p>
        Please don't take these examples too seriously, as I am by no means a P5.js expert.
      </p>
      <h4>Sketches</h4>
      <p>
        I divided the sketches in the following categories:
      </p>
      <ul>
        <li><Link to='/sketches/chaos'>Chaos</Link></li>
        <li><Link to='/sketches/creative'>Creative</Link></li>
        <li><Link to='/sketches/games'>Games</Link></li>
        <li><Link to='/sketches/physics'>Physics</Link></li>
      </ul>
    </PageLayout>
  );
}