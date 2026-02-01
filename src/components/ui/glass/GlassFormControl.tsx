"use client";

import { Box, BoxProps } from "@mui/material";

export default function GlassFormControl({ children, ...props }: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        p: 2,
        borderRadius: 2,
        background: "rgba(20,12,40,0.65)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 0 24px rgba(168,62,180,0.25)",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
}
