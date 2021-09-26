import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const useCounter = (counter, shader) => {
  const counterDir = useRef(1);
  useFrame(() => {
    if (counter.current > 6) {
      counterDir.current = -1;
    } else if (counter.current < -6) {
      counterDir.current = 1;
    }
    counter.current += 0.01 * counterDir.current;
    shader.current.uniforms.counter.value = counter.current;
  }, []);
};
