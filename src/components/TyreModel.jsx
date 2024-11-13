import { Suspense } from "react";
import Scene from "../3DModels/Scene";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

// 3D model of tyre
const TyreModel = () => {
  return (
    <Suspense
      fallback={
        <div className="h-full flex justify-center items-center animate-pulse"></div>
      }
    >
      {/* Canvas to display the model */}
      <Canvas camera={{ position: [6, 0, -1] }} className="w-full">
        {/* Ambient light to display Model */}
        <ambientLight />
        {/* Model component */}
        <Scene />
        {/* Environment for the model to be in. */}
        <Environment preset="park" />
      </Canvas>
    </Suspense>
  );
};

export default TyreModel;
