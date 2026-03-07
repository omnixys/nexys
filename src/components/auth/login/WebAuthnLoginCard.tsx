"use client";

import { Paper, Typography, Box, Button } from "@mui/material";
import BrandingHeader from "./BrandingHeader";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import SignUpLink from "@/components/auth/login/fields/SignUpLink";
import ForgotPasswordLink from "@/components/auth/login/fields/ForgotPasswordLink";

type WebAuthnLoginCardProps = {
  onStart: () => Promise<void> | void;
  loading?: boolean;
  errorText?: string | null;
};

export default function WebAuthnLoginCard({
  onStart,
  loading = false,
  errorText,
}: WebAuthnLoginCardProps) {
  const t = useTypedTranslations("login");

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
        <Typography variant="h6">{t("webauthn.title")}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {t("webauthn.subtitle")}
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        onClick={() => void onStart()}
        disabled={loading}
        sx={{ borderRadius: 999 }}
      >
        {t("webauthn.start")}
      </Button>

            <Box display="flex" justifyContent="space-between" mt={2}>
              <SignUpLink />
              <ForgotPasswordLink />
            </Box>

      {errorText && (
        <Typography color="error" mt={1}>
          {errorText}
        </Typography>
      )}
    </Paper>
  );
}
