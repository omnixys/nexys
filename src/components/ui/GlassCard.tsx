"use client";

import { Box, BoxProps } from "@mui/material";
import { motion } from "framer-motion";
import { glassTokens } from "./glassTokens";

const MotionBox = motion(Box);

type GlassVariant = "soft" | "strong" | "neon";
type Density = "normal" | "compact";

type GlassCardProps = BoxProps & {
  variant?: GlassVariant;
  density?: Density;
  active?: boolean;
};

export default function GlassCard({
  children,
  variant = "soft",
  density = "normal",
  active = false,
  ...rest
}: GlassCardProps) {
  const padding = density === "compact" ? 2.5 : 4;

  return (
    <MotionBox
      animate={
        active
          ? {
              scale: 1.5,
              boxShadow: `0 0 40px ${glassTokens.glow.neon}`,
            }
          : { scale: 1 }
      }
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      sx={{
        p: padding,
        borderRadius: 3,
        backgroundColor: `rgba(20,12,40,${glassTokens.opacity[variant]})`,
        backdropFilter: `blur(${glassTokens.blur[variant]})`,
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 12px 32px rgba(0,0,0,0.45)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
      {...rest}
    >
      {children}
    </MotionBox>
  );
}
