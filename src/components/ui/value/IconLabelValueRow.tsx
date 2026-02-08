"use client";

import React from "react";
import type { SxProps, Theme } from "@mui/material";
import { Box, Stack, Typography } from "@mui/material";

type Props = {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;

  /** Layout */
  labelWidth?: number | string;

  /** Optional style overrides */
  rootSx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
  valueSx?: SxProps<Theme>;
};

export function IconLabelValueRow({
  icon,
  label,
  children,
  labelWidth = 140,
  rootSx,
  labelSx,
  valueSx,
}: Props) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `${typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth} 1fr`,
        alignItems: "center",
        gap: 2,
        ...(rootSx ?? {}),
      }}
    >
      {/* Label area: icon + label */}
      <Stack direction="row" spacing={1} alignItems="center" sx={labelSx}>
        {icon}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ whiteSpace: "nowrap" }}
        >
          {label}
        </Typography>
      </Stack>

      {/* Value area */}
      <Box sx={valueSx}>{children}</Box>
    </Box>
  );
}
