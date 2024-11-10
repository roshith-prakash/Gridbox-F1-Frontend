import { Suspense } from "react";
import Scene from "../3DModels/Scene";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const TyreModel = () => {
  return (
    <Suspense
      fallback={
        <div className="h-full flex justify-center items-center animate-pulse"></div>
      }
    >
      <Canvas camera={{ position: [6, 0, -1] }} className="w-full">
        <ambientLight />
        <OrbitControls />
        <Scene />
        <Environment preset="park" />
      </Canvas>
    </Suspense>
  );
};

export default TyreModel;
