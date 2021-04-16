import Sketch from "../../common/Sketch";
import MazeExportedScript from "./MazeScript";
import PageLayout from "../../common/PageLayout";

export default function MazePage() {
  return (
    <PageLayout title="Maze"
                description="Create random mazes using a Breadth-First Tree Search Algorithm using p5.js">
      <p>Create random mazes using a Breadth-First Tree Search Algorithm</p>
      <p>
        Admittedly, this is not the best way to build a maze, because mazes created by the program tend to be
        <em>really</em> easy to solve. Nevertheless I'm sure it will serve as a basis for future developments, and maybe
        an autonomous library (i.e. not bound to P5.js)
      </p>
      <Sketch sketch={MazeExportedScript}/>
    </PageLayout>
  );
}