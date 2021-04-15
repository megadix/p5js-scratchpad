import Sketch from "../../common/Sketch";
import MandelbrotSetShaderScript from "./MandelbrotSetShaderScript";

export default function MandelbrotSetShaderPage() {
  return (
    <>
      <p>For this sketch I used a GLSL Shader to leverage the raw power of the GPU Card. I must say I'm impressed by the performance leap!</p>
      <p>Move mouse left/right to change the number of iterations.</p>
      <Sketch sketch={MandelbrotSetShaderScript} />
    </>
  );
}
