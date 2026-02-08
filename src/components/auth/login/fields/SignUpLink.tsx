"use client";

import { useTheme } from "@mui/material";
import Link from "next/link";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

/**
 * Sign-up link (i18n + typed).
 */
export default function SignUpLink() {
  const theme = useTheme();
  const t = useTypedTranslations("auth");

  return (
    <Link
      href="/sign-up"
      style={{
        textDecoration: "none",
        color: theme.palette.secondary.main,
        fontWeight: "bold",
      }}
    >
      {t("links.signup")}
    </Link>
  );
}
