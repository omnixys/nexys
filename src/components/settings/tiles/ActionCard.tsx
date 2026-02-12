/**
 * @file /settings/_components/tiles/ActionCard.tsx
 * @description Reusable action card used in Advanced tiles and panels
 */

"use client";

import { Box, Chip, Typography, alpha } from "@mui/material";

export default function ActionCard({
  title,
  description,
  color,
  icon,
  enabled,
  onClick,
}: {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  enabled: boolean;
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
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

        <Chip
          label={enabled ? "On" : "Off"}
          size="small"
          sx={{
            bgcolor: enabled ? alpha("#4CAF50", 0.2) : alpha("#757575", 0.2),
            color: enabled ? "#4CAF50" : "#757575",
            fontSize: "0.7rem",
          }}
        />
      </Box>

      <Box>
        <Typography variant="body1" fontWeight={700} sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
