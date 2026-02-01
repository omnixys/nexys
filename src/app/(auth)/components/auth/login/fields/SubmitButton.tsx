"use client";

import { Button, CircularProgress, useTheme } from "@mui/material";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

/**
 * Props for the submit button.
 */
interface SubmitButtonProps {
  loading?: boolean;
}

/**
 * Submit button for the login form.
 * i18n + typed, fully theme-driven.
 */
export default function SubmitButton({ loading = false }: SubmitButtonProps) {
  const theme = useTheme();
  const t = useTypedTranslations("auth");

  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      disabled={loading}
      sx={{
        my: 2,
        color: theme.palette.getContrastText(theme.palette.primary.main),
        transition: "opacity 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          opacity: 0.92,
        },
        "&:active": {
          boxShadow: "none",
        },
      }}
    >
      {loading ? (
        <>
          <CircularProgress
            size={22}
            thickness={4}
            color="inherit"
            sx={{ mr: 1 }}
          />
          {t("submit.loading")}
        </>
      ) : (
        t("submit.login")
      )}
    </Button>
  );
}
