/**
 * @file /settings/_components/tiles/StatItem.tsx
 * @description Small stat widget used in the bottom stats tile
 */

"use client";

import { Box, Typography } from "@mui/material";

export default function StatItem({
  label,
  value,
  change,
  color,
}: {
  label: string;
  value: string;
  change?: string;
  color: string;
}) {
  const c = change ?? "";
  const isPositive = c.startsWith("+");
  const isNegative = c.startsWith("-");

  return (
    <Box sx={{ textAlign: "center", minWidth: 120 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mb: 1, display: "block" }}
      >
        {label}
      </Typography>

      <Typography
        variant="h3"
        fontWeight={900}
        sx={{ color, mb: 0.5, letterSpacing: -0.6 }}
      >
        {value}
      </Typography>

      {!!c && (
        <Typography
          variant="caption"
          sx={{
            color: isPositive
              ? "#4CAF50"
              : isNegative
                ? "#FF5252"
                : "text.secondary",
            fontWeight: 700,
          }}
        >
          {c}
        </Typography>
      )}
    </Box>
  );
}
