"use client";

import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "../../mock/products.mock";
import { OMNIXYS_LOGOS } from "@/app/(auth)/components/auth/login/omnixysBranding";
import { useThemeMode } from "@/providers/ThemeModeProvider";
import { useTranslations } from "next-intl";
import { useTypedTranslations } from "../../../../i18n/useTypedTranslations";

export default function ProductAppIcon({
  product,
  onOpen,
}: {
  product: Product
  onOpen: (product: any) => void;
  }) {
  const theme = useTheme();
  const { scheme } = useThemeMode();
    const t = useTypedTranslations("products");
  
  const logoSrc = OMNIXYS_LOGOS[scheme];
    const name = t(product.nameKey);
    const subtitle = product.subtitleKey ? t(product.subtitleKey) : undefined;
  
  return (
    <Box
      component={motion.div}
      tabIndex={0}
      role="button"
      aria-label={t("open", { name })}
      onClick={() => onOpen(product)} 
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen(product);
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      sx={{
        width: 96,
        textAlign: "center",
        outline: "none",
        cursor: "pointer",
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          width: 96,
          height: 96,
          borderRadius: 5,
          background: theme.palette.text.secondary,
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 1,
        }}
      >
        <Image
          src={logoSrc}
          alt={name}
          width={52}
          height={52}
          draggable={false}
        />
      </Box>

      <Typography
        color={theme.palette.text.primary}
        variant="body2"
        fontWeight={500}
      >
        {name}
      </Typography>

      {subtitle && (
        <Typography color={theme.palette.text.primary} variant="caption">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
