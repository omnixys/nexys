/**
 * @file StaticTile.tsx
 * @description Generic static tile for non-live content
 */

"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { JSX } from "react";

export default function StaticTile({ title }: { title: string }): JSX.Element {
            const theme = useTheme();
  
  return (
    <Box p={2}>
      <Typography
        color={theme.palette.text.primary}
        variant="subtitle2"
        sx={{ opacity: 0.8, letterSpacing: 0.4}}
      >
        {title}
      </Typography>
    </Box>
  );
}
