"use client";

import React from "react";
import type { SxProps, Theme } from "@mui/material";
import { Stack, Typography } from "@mui/material";

type Props = {
  icon: React.ReactNode;
  label: string;
  value: string | number;

  /** Optional style overrides */
  rootSx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
  valueSx?: SxProps<Theme>;
};

export function IconLabelValue({
  icon,
  label,
  value,
  rootSx,
  labelSx,
  valueSx,
}: Props) {
  return (
    <Stack direction="row" spacing={1.2} alignItems="center" sx={rootSx}>
      {icon}

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ whiteSpace: "nowrap", ...(labelSx ?? {}) }}
      >
        {label}
      </Typography>

      <Typography
        variant="body2"
        fontWeight={600}
        color="text.primary"
        sx={{ whiteSpace: "nowrap", ...(valueSx ?? {}) }}
      >
        {value}
      </Typography>
    </Stack>
  );
}
