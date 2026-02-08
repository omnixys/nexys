/**
 * @file ProfileCompletenessSection.tsx
 * @description Large profile completeness card with circular progress
 */

"use client";

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

type Props = {
  value: number;
  missing?: string[];
  onAction?: () => void;
};

const MotionBox = motion(Box);

export default function ProfileCompletenessSection({
  value,
  missing = [],
  onAction,
}: Props) {
  const theme = useTheme();

  const data = [
    { name: "completed", value },
    { name: "remaining", value: 100 - value },
  ];

  return (
    <MotionBox
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      sx={{
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        p: 4,
        mb: 4,
        boxShadow: theme.shadows[1],
        backdropFilter: "blur(14px)",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="center"
      >
        {/* Progress */}
        <Box sx={{ width: 180, height: 180, position: "relative" }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                innerRadius={65}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                <Cell fill={theme.palette.primary.main} />
                <Cell fill={theme.palette.divider} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Typography variant="h3" fontWeight={700} color="text.primary">
              {value}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              completed
            </Typography>
          </Box>
        </Box>

        {/* Textual Info */}
        <Box flex={1}>
          <Typography variant="h6" fontWeight={700} mb={1}>
            Profile completeness
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
            {value >= 90
              ? "Your profile is almost complete."
              : "Complete your profile to unlock all features."}
          </Typography>

          {missing.length > 0 && (
            <Typography variant="body2" color="text.secondary" mb={2}>
              Missing: <strong>{missing.join(", ")}</strong>
            </Typography>
          )}

          {onAction && (
            <Button
              variant="contained"
              color="primary"
              onClick={onAction}
              sx={{
                borderRadius: theme.shape.borderRadius,
                px: 3,
              }}
            >
              Complete profile
            </Button>
          )}
        </Box>
      </Stack>
    </MotionBox>
  );
}
