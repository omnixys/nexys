"use client";

import { Box, Typography, useTheme } from "@mui/material";

export default function RoleSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        p: 4,
        height: "100%",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography fontWeight={700} mb={3}>
        {title}
      </Typography>

      {children}
    </Box>
  );
}
