import * as THREE from "three";
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
    double test = 0.0;
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
const num_atoms = 10;
const l = [];
const s = [];
for (let i = 0; i < 2 * num_atoms; i++) {
  l.push(Math.random());
  s.push(Math.random());
}
export default function CustomPlane() {
  const shader = useRef();
  const counter = useRef(0);
  const scale = useRef(0.0001);
  const targetScale = useRef(0.0001);
  const center = useRef([0.2510190964592524, -0.00001057574347854329]);
  const targetCenter = useRef(center.current);
  useFrame(() => {
    center.current[0] += (targetCenter.current[0] - center.current[0]) * 0.01;
    center.current[1] += (targetCenter.current[1] - center.current[1]) * 0.01;
    scale.current += (targetScale.current - scale.current) * 0.01;
    // console.log(center.current);
    // counter.current += 0.01;
    shader.current.uniforms.center.value = center.current;
    shader.current.uniforms.scale.value = scale.current;
    // shader.current.uniforms.frames.value = counter.current;
  }, []);
  const onPointerDown = (e) => {
    const offset = (window.innerWidth - window.innerHeight) / 2;
    const px = (e.clientX - offset) / window.innerHeight;
    const py = e.clientY / window.innerHeight;
    const dx = (px - 0.5) * scale.current;
    const dy = (0.5 - py) * scale.current;
    targetCenter.current = [center.current[0] + dx, center.current[1] + dy];
    targetScale.current = scale.current * 0.1;
    console.log(scale.current);
  };
  return (
    <mesh position={[0, 0, 0]} onPointerDown={onPointerDown}>
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
