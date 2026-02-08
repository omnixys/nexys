/**
 * @file /settings/_components/SettingsDashboardHeader.tsx
 * @description Page header for Settings dashboard
 */

"use client";

import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function SettingsDashboardHeader() {
  const tSettings = useTranslations("settings");
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        fontWeight={800}
        sx={{
          mb: 1,
          background: "linear-gradient(90deg, #9C27B0 0%, #673AB7 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {tSettings("title")}
      </Typography>

      <Typography variant="body1" color="text.secondary">
        {tSettings("subtitle")}
      </Typography>
    </Box>
  );
}
