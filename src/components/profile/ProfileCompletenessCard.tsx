/**
 * @file ProfileCompletenessCard.tsx
 * @description Shows profile completeness as a circular progress indicator
 */

"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

type Props = {
  value: number; // 0 – 100
};

const MotionBox = motion(Box);

export default function ProfileCompletenessCard({ value }: Props) {
  const theme = useTheme();

  const data = [
    { name: "completed", value },
    { name: "remaining", value: 100 - value },
  ];

  return (
    <MotionBox
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      sx={{
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        p: 3,
        minHeight: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: theme.shadows[1],
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} color="text.primary">
        Profile Completeness
      </Typography>

      <Box sx={{ width: "100%", height: 140 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={45}
              outerRadius={60}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              <Cell fill={theme.palette.primary.main} />
              <Cell fill={theme.palette.divider} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight={700} color="text.primary">
            {value}%
          </Typography>
        </Box>
      </Box>

      <Typography variant="body2" color="text.secondary">
        Your profile is almost complete
      </Typography>
    </MotionBox>
  );
}
