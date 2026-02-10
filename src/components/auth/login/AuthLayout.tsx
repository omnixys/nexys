"use client";

import { Box, useTheme, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(
          135deg,
          ${theme.palette.background.default},
          ${theme.palette.background.default},
          ${theme.palette.primary.main},
          ${theme.palette.secondary.main},
          ${theme.palette.background.default}
        )`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: isMobile ? 4 : 8,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: isMobile ? 420 : 1200,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 4,
          zIndex:1300,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
