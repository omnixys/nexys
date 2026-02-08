"use client";

import { Box, useTheme } from "@mui/material";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(
          135deg,
          ${theme.palette.background.default},
          ${theme.palette.background.default},
          ${theme.palette.background.default},
          ${theme.palette.primary.main},
          ${theme.palette.secondary.main},
          ${theme.palette.primary.main},
          ${theme.palette.background.default},
          ${theme.palette.background.default},
          ${theme.palette.background.default}
        )`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        backgroundAttachment: "fixed",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: "1200px",
          gap: 4,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
