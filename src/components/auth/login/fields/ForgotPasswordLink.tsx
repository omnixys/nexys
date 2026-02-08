"use client";

import { useTheme } from "@mui/material";
import Link from "next/link";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

/**
 * Forgot-password link (i18n + typed).
 */
export default function ForgotPasswordLink() {
  const theme = useTheme();
  const t = useTypedTranslations("auth");

  return (
    <Link
      href="/"
      style={{
        textDecoration: "none",
        color: theme.palette.secondary.main,
        fontWeight: "bold",
      }}
    >
      {t("links.forgotPassword")}
    </Link>
  );
}
