import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";

import { useThemeMode } from "@/providers/ThemeModeProvider";
import { BRANDING_TEXT, OMNIXYS_LOGOS } from "./omnixysBranding";
import { useTypedTranslations } from "../../../../../i18n/useTypedTranslations";

export default function BrandingHeader() {
  const theme = useTheme();
  const { scheme } = useThemeMode();
    const t = useTypedTranslations("branding");

  const logoSrc = OMNIXYS_LOGOS[scheme];

  return (
    <Box
      sx={{
        textAlign: "center",
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          src={logoSrc}
          alt="Omnixys Logo"
          width={50}
          height={50}
          priority
        />
      </Box>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: theme.palette.text.primary,
          letterSpacing: "-0.02em",
        }}
      >
        {t("title")}
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          mt: 0.5,
          color: theme.palette.text.secondary,
        }}
      >
        {t("tagline")}
      </Typography>
    </Box>
  );
}
