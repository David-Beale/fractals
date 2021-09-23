import { useMemo, useRef } from "react";
import { _VS } from "./shaders/vs";
import { _FS } from "./shaders/fs";
import { useResize } from "./hooks/useResize";
import { useMouseInteraction } from "./hooks/useMouseInteraction";
import { useCounter } from "./hooks/useCounter";

export default function CustomPlane() {
  const shader = useRef();
  const counter = useRef(0);
  const scale = useRef(3);
  const center = useRef([-0.3, 0]);

  const uniforms = useMemo(() => {
    return {
      mouse: { value: [0, 0] },
      resolution: { value: [window.innerWidth, window.innerHeight] },
      ratio: {
        value: window.innerWidth / window.innerHeight,
      },
      center: {
        value: center.current,
      },
      scale: {
        value: scale.current,
      },
      counter: {
        value: counter.current,
      },
    };
  }, []);

  const windowSize = useResize(shader);
  const [onPointerDown, onPointerUp, onPointerMove, onWheel] =
    useMouseInteraction(center, scale, shader);
  useCounter(counter, shader);

  return (
    <mesh
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      onWheel={onWheel}
    >
      <planeBufferGeometry args={windowSize} />
      <shaderMaterial
        ref={shader}
        uniforms={uniforms}
        vertexShader={_VS}
        fragmentShader={_FS}
      ></shaderMaterial>
    </mesh>
  );
}
