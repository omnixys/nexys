/**
 * @file /security/_components/SecurityHeader.tsx
 * @description Header for Security Center
 */

"use client";

import { Box, Typography } from "@mui/material";

export default function SecurityHeader() {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        fontWeight={900}
        sx={{
          mb: 1,
          background: "linear-gradient(90deg, #2196F3 0%, #00BCD4 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Security Center
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Monitor and manage your account security
      </Typography>
    </Box>
  );
}
