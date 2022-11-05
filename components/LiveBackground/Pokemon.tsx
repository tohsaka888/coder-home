import { useGLTF } from "@react-three/drei";
import { baseUrl } from "config/baseUrl";
import React, { useMemo } from "react";

function Pokemon() {
  const { scene } = useGLTF(`${baseUrl}/pokemon.glb`);

  return (
    <object3D receiveShadow castShadow position={[0, -10, 0]} scale={1.2}>
      <primitive object={scene} />
    </object3D>
  );
}

export default Pokemon;
