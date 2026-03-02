"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { Box } from "@mui/material";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

const STAR_COUNT = 5000;

const StarBackground = (props: any) => {
  const ref = useRef<any>(null);

  const positions = React.useMemo(() => {
    const array = new Float32Array(STAR_COUNT * 3);
    random.inSphere(array, { radius: 1.2 });
    return array;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta * 0.1;
    ref.current.rotation.y -= delta * 0.07;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={positions}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "auto",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarBackground />
          <Preload all />
        </Suspense>
      </Canvas>
    </Box>
  );
};

export default StarsCanvas;
