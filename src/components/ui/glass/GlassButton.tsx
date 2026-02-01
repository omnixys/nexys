"use client";

import { Button, ButtonProps } from "@mui/material";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

export default function GlassButton({ children, ...props }: ButtonProps) {
  return (
    <MotionButton
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      {...props}
      sx={{
        textTransform: "none",
        fontWeight: 600,
        borderRadius: 999,
        color: "#fff",
        background:
          "linear-gradient(90deg, rgba(168,62,180,0.9), rgba(112,66,248,0.9))",
        boxShadow: "0 0 20px rgba(168,62,180,0.6)",
        "&:hover": {
          boxShadow: "0 0 32px rgba(168,62,180,0.9)",
          background:
            "linear-gradient(90deg, rgba(168,62,180,1), rgba(112,66,248,1))",
        },
        ...props.sx,
      }}
    >
      {children}
    </MotionButton>
  );
}
