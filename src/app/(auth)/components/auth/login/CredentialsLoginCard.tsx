"use client";

import { Paper, Typography, Box, useTheme } from "@mui/material";
import BrandingHeader from "./BrandingHeader";
import UsernameField from "./fields/UsernameField";
import PasswordField from "./fields/PasswordField";
import AgreeWithTerms from "./fields/AgreeWithTerms";
import SubmitButton from "./fields/SubmitButton";
import ForgotPasswordLink from "./fields/ForgotPasswordLink";
import SignUpLink from "./fields/SignUpLink";
import { FormEvent } from "react";
import { useTypedTranslations } from "../../../../../i18n/useTypedTranslations";
import { AuthErrorKey } from "../../../login/LogInPage";

// -------------------------------------------------------------
// Types
// -------------------------------------------------------------
type CredentialsLoginCardProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
  error?: AuthErrorKey | null;
};

export default function CredentialsLoginCard({
  onSubmit,
  loading = false,
  error,
}: CredentialsLoginCardProps) {
  const theme = useTheme();
  const t = useTypedTranslations("auth");
  
   const isDark = theme.palette.mode === "dark";
  return (
    <Paper
      elevation={8}
      sx={{
        zIndex: 1300,
        flex: 1,
        p: 4,
        borderRadius: 3,
        backgroundColor: theme.palette.background.default,
        backdropFilter: "blur(5px)",
        animation: "auth-card-fade 0.6s ease-out both",

        "@keyframes auth-card-fade": {
          from: {
            opacity: 0,
            transform: "translateY(12px) scale(0.98)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
        },
      }}
    >
      <BrandingHeader />
      <form onSubmit={onSubmit}>
        <UsernameField />
        <PasswordField />
        <AgreeWithTerms />
        <SubmitButton loading={loading} />
      </form>
      {error && <Typography color="error">{t(`errors.${error}`)}</Typography>}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <SignUpLink />
        <ForgotPasswordLink />
      </Box>
    </Paper>
  );
}
