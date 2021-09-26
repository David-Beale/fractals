import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const zoomSpeed = 0.03;

export const useMouseInteraction = (center, scale, shader) => {
  const buttonDown = useRef(false);
  const prevMouse = useRef([]);
  const mousePos = useRef([]);
  const zooming = useRef(0);
  const zoomDirection = useRef(0);
  const prevScale = useRef(3);

  const updateCenter = () => {
    const px = mousePos.current[0] / window.innerWidth - 0.5;
    const py = 0.5 - mousePos.current[1] / window.innerHeight;
    const scaleDiff = prevScale.current - scale.current;
    center.current[0] += px * scaleDiff;
    center.current[1] += py * scaleDiff;
  };
  const updateScale = () => {
    const direction = zoomDirection.current === 0 ? -1 : 1;
    prevScale.current = scale.current;
    scale.current += scale.current * zoomSpeed * direction;
    if (scale.current < 0.00002) scale.current = 0.00002;
    else if (scale.current > 3) scale.current = 3;
  };
  const translate = () => {
    const dx = (prevMouse.current[0] - mousePos.current[0]) / window.innerWidth;
    const dy =
      (mousePos.current[1] - prevMouse.current[1]) / window.innerHeight;
    center.current[0] += dx * scale.current;
    center.current[1] += dy * scale.current;
    prevMouse.current = mousePos.current;
  };

  const onPointerDown = (e) => {
    buttonDown.current = true;
    prevMouse.current = [e.clientX, e.clientY];
    mousePos.current = [e.clientX, e.clientY];
  };
  const onPointerUp = () => {
    buttonDown.current = false;
  };
  const onPointerMove = (e) => {
    if (buttonDown.current === false) return;
    mousePos.current = [e.clientX, e.clientY];
  };
  const onWheel = (e) => {
    mousePos.current = [e.clientX, e.clientY];
    zooming.current = 10;
    if (e.deltaY < 0) {
      zoomDirection.current = 0;
    } else {
      zoomDirection.current = 2;
    }
  };

  useFrame(() => {
    if (zooming.current) {
      updateScale();
      updateCenter();

      shader.current.uniforms.scale.value = scale.current;
      zooming.current--;
    }
    if (buttonDown.current) {
      translate();
    }
  }, []);

  return [onPointerDown, onPointerUp, onPointerMove, onWheel];
};
