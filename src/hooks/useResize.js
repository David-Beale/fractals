import { useEffect, useState } from "react";

export const useResize = (shader) => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const windowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
      shader.current.uniforms.ratio.value =
        window.innerWidth / window.innerHeight;
      shader.current.uniforms.resolution.value = [
        window.innerWidth,
        window.innerHeight,
      ];
    };
    window.addEventListener("resize", windowResize);
    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, [shader]);

  return windowSize;
};
