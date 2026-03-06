"use client";

import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import BrandingHeader from "./BrandingHeader";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

type MagicLinkLoginCardProps = {
  onSend: (email: string) => Promise<void> | void;
  loading?: boolean;
  infoText?: string | null;
  errorText?: string | null;
};

export default function MagicLinkLoginCard({
  onSend,
  loading = false,
  infoText,
  errorText,
}: MagicLinkLoginCardProps) {
  const t = useTypedTranslations("login");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    await onSend(email);
  }

  return (
    <Paper
      elevation={8}
      sx={{
        zIndex: 1300,
        flex: 1,
        p: 4,
        borderRadius: 3,
        backdropFilter: "blur(5px)",
        animation: "auth-card-fade 0.6s ease-out both",
        "@keyframes auth-card-fade": {
          from: { opacity: 0, transform: "translateY(12px) scale(0.98)" },
          to: { opacity: 1, transform: "translateY(0) scale(1)" },
        },
      }}
    >
      <BrandingHeader />

      <Box mb={2}>
        <Typography variant="h6">{t("magicLink.title")}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {t("magicLink.subtitle")}
        </Typography>
      </Box>

      <form onSubmit={onSubmit}>
        <TextField
          name="email"
          type="email"
          label={t("magicLink.emailLabel")}
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ borderRadius: 999 }}
        >
          {t("magicLink.send")}
        </Button>
      </form>

      {infoText && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 2,
            background: "rgba(124,77,255,0.15)",
            animation: "fadeIn 400ms ease",
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(8px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <Typography>{infoText}</Typography>
        </Box>
      )}

      {errorText && (
        <Typography color="error" mt={1}>
          {errorText}
        </Typography>
      )}
    </Paper>
  );
}
