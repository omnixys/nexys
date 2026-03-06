"use client";

import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import BrandingHeader from "./BrandingHeader";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

type TotpLoginCardProps = {
  onVerify: (code: string, username: string) => Promise<void> | void;
  loading?: boolean;
  errorText?: string | null;
};

export default function TotpLoginCard({
  onVerify,
  loading = false,
  errorText,
}: TotpLoginCardProps) {
  const t = useTypedTranslations("login");

async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const data = new FormData(e.currentTarget);

  const username = String(data.get("username") ?? "").trim();
  const code = String(data.get("totp") ?? "").trim();

  await onVerify(code, username);
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
        <Typography variant="h6">{t("totp.title")}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {t("totp.subtitle")}
        </Typography>
      </Box>

      <form onSubmit={onSubmit}>
        <TextField
          name="username"
          label={t("totp.usernameLabel")}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          name="totp"
          label={t("totp.codeLabel")}
          fullWidth
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 6,
          }}
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ borderRadius: 999 }}
        >
          {t("totp.verify")}
        </Button>
      </form>

      {errorText && (
        <Typography color="error" mt={1}>
          {errorText}
        </Typography>
      )}
    </Paper>
  );
}
