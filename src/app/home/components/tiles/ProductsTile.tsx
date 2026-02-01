"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import ProductShelf from "./ProductShelf";
import ProductZoomOverlay from "./ProductZoomOverlay";
import { useTranslations } from "next-intl";

export default function ProductsTile({ isFocused }: { isFocused: boolean }) {
  const theme = useTheme();
    const t = useTranslations("products");
  
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography
        color={theme.palette.text.primary}
        variant="h6"
        sx={{ mb: 1.5, ml: 40 }}
      >
        {t("title")}
      </Typography>

      <ProductShelf isFocused={isFocused} />
    </Box>
  );
}
