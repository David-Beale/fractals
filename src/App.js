import "./App.css";
import { Canvas } from "@react-three/fiber";
import Main from "./main/Main";
import Buttons from "./buttons/Buttons";
import { useState } from "react";
import { Vector3 } from "three";

export default function App() {
  const [fractal, setFractal] = useState([2, 2]);
  const [color, setColor] = useState([0.99, 0.05, 0.65]);

  const onRandomFractal = () => {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    setFractal([x, y]);
  };
  const onRandomColor = () => {
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();
    const colorVec = new Vector3(r, g, b);
    colorVec.setLength(1.2);
    setColor(colorVec.toArray());
  };

  const onContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div className="container" onContextMenu={onContextMenu}>
      <Buttons
        onRandomFractal={onRandomFractal}
        onRandomColor={onRandomColor}
      />
      <Canvas
        orthographic={true}
        camera={{
          position: [0, 0, 0],

          near: 0,
          far: 10,
        }}
      >
        <Main fractal={fractal} color={color} />
      </Canvas>
    </div>
  );
}
