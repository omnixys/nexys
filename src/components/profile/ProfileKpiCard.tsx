/**
 * @file ProfileKpiCard.tsx
 * @description Small KPI card for profile overview
 */

"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
};

const MotionBox = motion(Box);

export default function ProfileKpiCard({ label, value, hint, icon }: Props) {
  const theme = useTheme();

  return (
    <MotionBox
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      sx={{
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        p: 3,
        height: "100%",
        boxShadow: theme.shadows[1],
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        {icon}
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {label}
        </Typography>
      </Box>

      <Typography
        variant="h4"
        fontWeight={700}
        color="text.primary"
        sx={{ mt: 1 }}
      >
        {value}
      </Typography>

      {hint && (
        <Typography variant="caption" color="text.secondary">
          {hint}
        </Typography>
      )}
    </MotionBox>
  );
}
