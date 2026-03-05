"use client";

import { motion } from "framer-motion";
import { useTheme } from "@mui/material";

export default function AnimatedCheck() {
  const theme = useTheme();

  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
      {/* Circle */}

      <motion.circle
        cx="48"
        cy="48"
        r="42"
        stroke={theme.palette.success.main}
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.6 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          filter: "drop-shadow(0 0 12px rgba(0,255,140,0.6))",
        }}
      />

      {/* Check */}

      <motion.path
        d="M30 50 L44 64 L68 36"
        stroke={theme.palette.success.main}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.6,
          duration: 0.5,
          ease: "easeOut",
        }}
      />
    </svg>
  );
}
