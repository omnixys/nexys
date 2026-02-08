/**
 * @file TileSkeleton.tsx
 * @description Reusable skeleton for bento tiles
 */

"use client";

import { Box, Skeleton } from "@mui/material";
import { JSX } from "react";

export default function TileSkeleton({
  lines = 3,
}: {
  lines?: number;
}): JSX.Element {
  return (
    <Box p={2}>
      <Skeleton variant="text" width={80} height={20} sx={{ opacity: 0.6 }} />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height={18}
          sx={{ mt: 1, opacity: 0.35 }}
        />
      ))}
    </Box>
  );
}
