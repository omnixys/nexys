"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import ProductShelf from "./ProductShelf";
import ProductZoomOverlay from "./ProductZoomOverlay";
import { useTranslations } from "next-intl";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

export default function ProductsTile({ isFocused }: { isFocused: boolean }) {
  const theme = useTheme();
    const t = useTypedTranslations("home");;
  
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography
        color={theme.palette.text.primary}
        variant="h6"
        sx={{ mb: 1.5, ml: 40 }}
      >
        {t("products.title")}
      </Typography>

      <ProductShelf isFocused={isFocused} />
    </Box>
  );
}
