"use client";

import { Box, LinearProgress, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import zxcvbn from "zxcvbn";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

type Props = {
  password: string;
};

export default function PasswordStrength({ password }: Props) {
  const theme = useTheme();
  const t = useTypedTranslations("recovery");

  const result = useMemo(() => {
    if (!password) {
      return {
        score: 0,
        pct: 0,
        label: "",
        color: "inherit",
      };
    }

    const r = zxcvbn(password);

    const labels = [
      t("resetPassword.strength.veryWeak"),
      t("resetPassword.strength.weak"),
      t("resetPassword.strength.medium"),
      t("resetPassword.strength.strong"),
      t("resetPassword.strength.veryStrong"),
    ];

    const colors = [
      theme.palette.error.main,
      theme.palette.error.main,
      theme.palette.warning.main,
      theme.palette.success.main,
      theme.palette.success.main,
    ];

    return {
      score: r.score,
      pct: (r.score / 4) * 100,
      label: labels[r.score],
      color: colors[r.score],
      feedback: r.feedback?.warning,
    };
  }, [password, theme, t]);

  if (!password) return null;

  return (
    <Box>
      <LinearProgress
        variant="determinate"
        value={result.pct}
        sx={{
          height: 8,
          borderRadius: 999,
          background: theme.palette.divider,
          "& .MuiLinearProgress-bar": {
            backgroundColor: result.color,
          },
        }}
      />

      <Box
        display="flex"
        justifyContent="space-between"
        mt={0.5}
        alignItems="center"
      >
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, color: result.color }}
        >
          {result.label}
        </Typography>

        {result.feedback && (
          <Typography variant="caption" color="text.secondary">
            {result.feedback}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
