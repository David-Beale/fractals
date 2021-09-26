import { useEffect } from "react";

export const useFractal = (fractal, shader, center, scale) => {
  useEffect(() => {
    if (fractal[0] < 2) {
      shader.current.uniforms.fractal.value = fractal;
      shader.current.uniforms.scale.value = 3;
      center.current[0] = 0;
      center.current[1] = 0;
      scale.current = 3;
    }
  }, [center, fractal, scale, shader]);
};
