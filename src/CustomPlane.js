import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const _VS = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `;
const _FS = `
  precision highp float;

  uniform vec2 resolution;
  uniform float offset;
  uniform vec2 center;
  uniform float scale;


  void main() {
    float maxN = 250.0;
    float zoom = 2.0;
    float a = ((gl_FragCoord.x - offset) / resolution.x - 0.5) * scale + center.x;
    float b = (gl_FragCoord.y / resolution.y - 0.5) * scale + center.y;

    float ca = a;
    float cb = b;

    float z = 0.0;
    
    float n = 0.0;
    for (; n < maxN; n++){
      float a2 = a * a -  b * b;
      float b2 = 2.0 * a * b;

      a = a2 + ca;
      b = b2 + cb;

      if(abs(a2 + b2) > 4.0){
        break;
      }
    }

    float brightness = sqrt(n / maxN);
    if(n == maxN) brightness = 0.0;


    gl_FragColor = vec4(brightness, brightness, brightness, 1.0);
    
    // float c = 0.0;
    // if(a <0.0) c = 1.0;
    // gl_FragColor = vec4(c, c, c, 1.0);

  }
  `;

const zoomSpeed = 0.008;
export default function CustomPlane() {
  const shader = useRef();
  const counter = useRef(0);
  const scale = useRef(5);
  const prevScale = useRef(5);
  const center = useRef([-0.3, 0]);
  const buttonDown = useRef(false);
  const mousePos = useRef([]);

  const updateCenter = () => {
    const offset = (window.innerWidth - window.innerHeight) / 2;
    const px = (mousePos.current[0] - offset) / window.innerHeight - 0.5;
    const py = 0.5 - mousePos.current[1] / window.innerHeight;
    const scaleDiff = prevScale.current - scale.current;
    center.current[0] += px * scaleDiff;
    center.current[1] += py * scaleDiff;
  };
  const updateScale = () => {
    const direction = buttonDown.current === 0 ? -1 : 1;
    prevScale.current = scale.current;
    scale.current += scale.current * zoomSpeed * direction;
    if (scale.current < 0.00002) scale.current = 0.00002;
    else if (scale.current > 5) scale.current = 5;
  };

  useFrame(() => {
    if (buttonDown.current !== false) {
      updateScale();
      updateCenter();

      shader.current.uniforms.center.value = center.current;
      shader.current.uniforms.scale.value = scale.current;
    }
    // counter.current += 0.01;
    // shader.current.uniforms.frames.value = counter.current;
  }, []);
  const onPointerDown = (e) => {
    buttonDown.current = e.button;
    mousePos.current = [e.clientX, e.clientY];
  };
  const onPointerUp = () => {
    buttonDown.current = false;
  };
  const onPointerMove = (e) => {
    if (buttonDown.current === false) return;
    mousePos.current = [e.clientX, e.clientY];
  };

  return (
    <mesh
      position={[0, 0, 0]}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
    >
      <planeBufferGeometry args={[window.innerHeight, window.innerHeight]} />
      <shaderMaterial
        ref={shader}
        uniforms={{
          mouse: { value: [0, 0] },
          resolution: { value: [window.innerHeight, window.innerHeight] },
          offset: {
            value: (window.innerWidth - window.innerHeight) / 2,
          },
          center: {
            value: center.current,
          },
          scale: {
            value: scale.current,
          },
        }}
        vertexShader={_VS}
        fragmentShader={_FS}
      ></shaderMaterial>
    </mesh>
  );
}
