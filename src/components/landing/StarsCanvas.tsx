"use client";

import React, { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { Box } from "@mui/material";

/* =====================================================
   Utility
===================================================== */
function generateSpherePoints(count: number, radius: number) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    let x, y, z, len;

    do {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      z = Math.random() * 2 - 1;
      len = x * x + y * y + z * z;
    } while (len > 1 || len === 0);

    const scale = radius * Math.cbrt(Math.random());
    positions[i * 3] = x * scale;
    positions[i * 3 + 1] = y * scale;
    positions[i * 3 + 2] = z * scale;
  }

  return positions;
}

/* =====================================================
   Stars
===================================================== */
const StarBackground = () => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => generateSpherePoints(5000, 1.2), []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta * 0.1;
    ref.current.rotation.y -= delta * 0.07;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
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

/* =====================================================
   Canvas (GLOBAL FX LAYER)
===================================================== */
export default function StarsCanvas() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
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
}
