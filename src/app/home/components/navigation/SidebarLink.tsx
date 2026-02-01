/**
 * @file SidebarLink.tsx
 * @description Sidebar navigation link
 */

"use client";

import Link from "next/link";
import { Box, Typography, useTheme } from "@mui/material";
import { JSX } from "react";

export default function SidebarLink({
  href,
  label,
}: {
  href: string;
  label: string;
  }): JSX.Element {
        const theme = useTheme();
  
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          px: 3,
          py: 1.5,
          color: "rgba(255,255,255,0.7)",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.06)",
            color: "#fff",
          },
        }}
      >
        <Typography color={theme.palette.text.primary}>{label}</Typography>
      </Box>
    </Link>
  );
}
