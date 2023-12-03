"use client";
import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

export default function WebXRVeiwer() {
  return (
    <>
      <ARButton />
      <Canvas className="">
        <BoxVeiwer/>
        <OrbitControls />
      </Canvas>
    </>
  );
}
const BoxVeiwer = () => {
  const boxRef = useRef();
  // useFrame(() => {
  //   if (boxRef.current) {
  //   // boxRef.current.rotation.x += 0.1;
  //   }
  // });

  return(
  <XR>
    <mesh ref={boxRef}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  </XR>
);
};
