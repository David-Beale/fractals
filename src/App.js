import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CustomPlane from "./CustomPlane";

export default function App() {
  const onPointerMove = (e) => {
    // if (!shader.current) return;
    // shader.current.uniforms.mouse.value = [
    //   THREE.MathUtils.mapLinear(e.clientX, 0, window.innerWidth, 0, 1),
    //   THREE.MathUtils.mapLinear(e.clientY, 0, window.innerHeight, 1, 0),
    // ];
  };

  return (
    <div className="container" onPointerMove={onPointerMove}>
      <Canvas
        orthographic={true}
        camera={{
          position: [0, 0, 0],

          near: 0,
          far: 10,
        }}
      >
        <CustomPlane />
      </Canvas>
    </div>
  );
}
