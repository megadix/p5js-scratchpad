import Sketch from "../../common/Sketch";
import MandelbrotSetShaderScript from "./MandelbrotSetShaderScript";
import PageLayout from "../../common/PageLayout";

export default function MandelbrotSetShaderPage() {
  return (
    <PageLayout title="Mandelbrot Set - Shader Version"
                description="Rendering of Mandelbrot Set using OpenGL Shaders and p5.js">
      <p>For this sketch I used a GLSL (OpenGL) Shader to leverage the raw power of the GPU Card. I must say I'm
        impressed by the performance leap!</p>
      <p>Move mouse left/right to change the number of iterations.</p>
      <Sketch sketch={MandelbrotSetShaderScript}/>
    </PageLayout>
  );
}
