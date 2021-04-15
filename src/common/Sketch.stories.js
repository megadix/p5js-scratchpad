import Sketch from "./Sketch";
import TestSketchScript from "../sketches/TestSketchScript";

const SketchStories = {
  title: 'Common/Sketch',
  component: Sketch
};

export default SketchStories;

const Template = (args) => {
  return (<Sketch {...args} />);
};

export const SampleSketch = Template.bind({});
SampleSketch.args = {
  sketch: TestSketchScript,
  children: (
    <>
      <p>Sample Description paragraph 1</p>
      <p>Sample Description paragraph 2</p>
    </>
  )
};
