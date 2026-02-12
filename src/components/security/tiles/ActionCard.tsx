/**
 * @file /security/_components/tiles/ActionCard.tsx
 * @description Reusable action card used in Quick Actions tile and panel
 */

"use client";

import { Box, Typography, alpha } from "@mui/material";

export default function ActionCard({
  title,
  description,
  color,
  icon,
  onClick,
}: {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: alpha(color, 0.1),
        border: `1px solid ${alpha(color, 0.2)}`,
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover": onClick
          ? {
              bgcolor: alpha(color, 0.15),
              transform: "translateY(-4px)",
              boxShadow: `0 8px 32px ${alpha(color, 0.2)}`,
            }
          : undefined,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: alpha(color, 0.2),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color,
          }}
        >
          {icon}
        </Box>

        <Typography variant="body1" fontWeight={800}>
          {title}
        </Typography>
      </Box>

      <Typography variant="caption" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
}
