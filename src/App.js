import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function App() {
  return (
    <div className="container">
      <Canvas
        orthographic={true}
        camera={{
          position: [0, 0, 0],

          near: 0,
          far: 10,
        }}
      >
        {/* <OrbitControls /> */}
        <mesh position={[0, 0, 0]}>
          <planeBufferGeometry args={[2232, 1297]} />
          <meshBasicMaterial color="turquoise" />
        </mesh>
      </Canvas>
    </div>
  );
}
