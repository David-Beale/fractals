import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";

const _VS = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `;
const _FS = `
  precision highp float;

  uniform vec2 resolution;
  uniform float ratio;
  uniform vec2 center;
  uniform float scale;
  uniform float counter;


  void main() {
    float maxN = 250.0;
    float a = ratio  * ((gl_FragCoord.x / resolution.x - 0.5) * scale + center.x);
    float b = (gl_FragCoord.y / resolution.y - 0.5) * scale + center.y;

    float ca = a;
    float cb = b;
    // float ca = 0.2;
    // float cb = 0.66;
    float a2 = 0.0;
    float b2 = 0.0;

    float n = 0.0;
    for (; n < maxN; n++){
      a2 = a * a;
      b2 = b * b;
      
      b = (a + a) * b + cb;
      a = a2 - b2 + ca;
      if(a2 + b2 > 4.0){
        break;
      }
    }

    float brightness;
    if(n == maxN) {
      brightness = -0.1;
    }
    else {
      vec2 z = vec2(a,b);
      float sl = n - log2(log2(dot(z,z)));

      float al = 2.0 + 5.0 * cos(counter);
      brightness = counter/10.0 * mix( n, sl, al );
  
    } 
    vec3 col= vec3(0.0);
    col += 0.5 + 0.6*cos( 2.7 + brightness + vec3(0.99,0.05,0.65));
    // col += 0.5 + 0.6*cos( 2.7 + brightness + vec3(0.04,0.66,0.99));


    gl_FragColor = vec4(col, 1.0);
      }
  `;

const zoomSpeed = 0.03;
export default function CustomPlane() {
  const shader = useRef();
  const counter = useRef(0);
  const scale = useRef(3);
  const prevScale = useRef(3);
  // const center = useRef([-0.3, 0]);
  const center = useRef([0, 0]);
  const buttonDown = useRef(false);
  const prevMouse = useRef([]);
  const mousePos = useRef([]);
  const zooming = useRef(0);
  const zoomDirection = useRef(0);
  const counterDir = useRef(1);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

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
  }, []);

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
    if (counter.current > Math.PI) {
      counterDir.current = -1;
    } else if (counter.current < -Math.PI) {
      counterDir.current = 1;
    }
    counter.current += 0.01 * counterDir.current;
    shader.current.uniforms.counter.value = counter.current;
  }, []);
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

  return (
    <mesh
      position={[0, 0, 0]}
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
