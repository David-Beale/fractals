import "./App.css";
import { Canvas } from "@react-three/fiber";
import Main from "./main/Main";
import Buttons from "./buttons/Buttons";
import { useState } from "react";

export default function App() {
  const [fractal, setFractal] = useState([2, 2]);
  const onRandomFractal = () => {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    setFractal([x, y]);
  };

  const onContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div className="container" onContextMenu={onContextMenu}>
      <Buttons onRandomFractal={onRandomFractal} />
      <Canvas
        orthographic={true}
        camera={{
          position: [0, 0, 0],

          near: 0,
          far: 10,
        }}
      >
        <Main fractal={fractal} />
      </Canvas>
    </div>
  );
}
