/**
 * @file DepthBlurLayer.tsx
 */

"use client";

import { motion } from "framer-motion";

export default function DepthBlurLayer({ active }: { active: boolean }) {
  return (
    <motion.div
      animate={{
        opacity: active ? 1 : 0,
        backdropFilter: active ? "blur(6px)" : "blur(0px)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: "rgba(0,0,0,0.15)",
      }}
    />
  );
}
