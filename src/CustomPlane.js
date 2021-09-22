import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const _VS = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `;
const _FS = `
  precision mediump float;

  uniform vec2 mouse;
  uniform vec2 resolution;
  uniform int atomsNum;
  uniform vec2 atoms [10];
  uniform vec2 speed [10];
  uniform float frames;


  void main() {
    vec2 xy = gl_FragCoord.xy / resolution.xy;
    // float d = distance(mouse, xy);
    // float c = sin(d*100.0);

    vec2 newAtoms [10];
     
    for(int i = 0; i < atomsNum; i++){
      newAtoms[i] = atoms[i] + speed[i] * sin(frames);
    }


    float s = 0.0;

    for(int i = 0; i < atomsNum; i++){
      float d = distance(xy, newAtoms[i]);
      s += exp(-pow(d * 5.0, 2.0));
    }

    float c = sin(s * 50.0);

    vec3 cl = vec3(1.0-c, s/1.5, c);

    for(int i = 0; i < atomsNum; i++){
      float d = distance(xy, newAtoms[i]);
      if(d < 0.01){
        cl = vec3(1.0, 1.0, 0);
      }
    }


    gl_FragColor = vec4(cl, 1.0);
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

  useFrame(() => {
    counter.current += 0.01;
    shader.current.uniforms.frames.value = counter.current;
  }, []);

  return (
    <mesh position={[0, 0, 0]}>
      <planeBufferGeometry args={[window.innerHeight, window.innerHeight]} />
      <shaderMaterial
        ref={shader}
        uniforms={{
          mouse: { value: [0, 0] },
          resolution: { value: [window.innerHeight, window.innerHeight] },
          atomsNum: { value: num_atoms },
          atoms: { value: l },
          speed: { value: s },
          frames: { value: 0 },
        }}
        vertexShader={_VS}
        fragmentShader={_FS}
      ></shaderMaterial>
    </mesh>
  );
}
