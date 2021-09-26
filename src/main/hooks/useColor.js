import { useEffect } from "react";

export const useColor = (shader, color) => {
  useEffect(() => {
    shader.current.uniforms.color.value = color;
  }, [color, shader]);
};
