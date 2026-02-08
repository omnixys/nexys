/**
 * @file /security/_components/tiles/BentoTile.tsx
 * @description Bento Tile with staggered entry + spatial focus + click support
 */

"use client";

import { Card, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const tileEntry = {
  hidden: { opacity: 0, scale: 0.92, y: 28 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function BentoTile({
  index,
  children,
  area,
  heavy,
  focused,
  setFocused,
  onClick,
}: {
  index: number;
  children: React.ReactNode;
  area?: string; // Use "auto / span X"
  heavy?: boolean;
  focused: number | null;
  setFocused: (i: number | null) => void;
  onClick?: () => void;
}) {
  const theme = useTheme();
  const isFocused = focused === index;
  const isDimmed = focused !== null && !isFocused;

  return (
    <MotionCard
      variants={tileEntry}
      tabIndex={0}
      role="button"
      onFocus={() => setFocused(index)}
      onBlur={() => setFocused(null)}
      onClick={onClick}
      animate={{
        scale: isFocused ? 1.03 : isDimmed ? 0.99 : 1,
        opacity: isDimmed ? 0.55 : 1,
      }}
      transition={{
        duration: heavy ? 0.5 : 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      sx={{
        ...(area ? { gridColumn: area } : {}),
        height: "100%",
        outline: "none",
        cursor: onClick ? "pointer" : "default",
        borderRadius: 4,
        backdropFilter: "blur(16px)",
        bgcolor: theme.palette.background.default,
        border: "1px solid rgba(255,255,255,0.14)",
        color: "#fff",
        display: "flex",
        boxShadow: isFocused
          ? "0 30px 90px rgba(0,0,0,0.6)"
          : "0 12px 45px rgba(0,0,0,0.35)",
        zIndex: isFocused ? 10 : 1,
      }}
    >
      {children}
    </MotionCard>
  );
}
