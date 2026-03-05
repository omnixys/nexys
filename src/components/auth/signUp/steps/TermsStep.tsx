"use client";

/**
 * @file TermsStep.tsx
 * @description Terms & Conditions step with scrollable legal container and i18n support.
 */

import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";

import { SignUpFormValues } from "@/schemas/sign-up.schema";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

export default function TermsStep() {
  const { control } = useFormContext<SignUpFormValues>();

  const t = useTypedTranslations("terms");

  const sections = [
    "scope",
    "account",
    "usage",
    "data",
    "liability",
    "termination",
    "intellectual",
    "law",
  ] as const;

  return (
    <>
      {/* ================= TITLE ================= */}

      <Typography variant="h5" sx={{ fontWeight: 700 }} mb={1}>
        {t("title")}
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        {t("intro")}
      </Typography>

      {/* ================= SCROLLABLE TERMS ================= */}

      <Paper
        variant="outlined"
        sx={{
          p: 4,
          maxHeight: 320,
          overflowY: "auto",
          borderRadius: 3,
          backgroundColor: "background.paper",
          mb: 3,
        }}
      >
        {sections.map((section) => (
          <Box key={section} mb={3}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 0.5,
              }}
            >
              {t(`sections.${section}.title`)}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {t(`sections.${section}.text`)}
            </Typography>
          </Box>
        ))}
      </Paper>

      {/* ================= ACCEPT CHECKBOX ================= */}

      <Controller
        name="acceptedTerms"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label={
                <Typography variant="body2">
                  {t("accept.prefix")}{" "}
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    {t("accept.terms")}
                  </Box>{" "}
                  {t("accept.and")}{" "}
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    {t("accept.privacy")}
                  </Box>{" "}
                  {t("accept.suffix")}
                </Typography>
              }
            />

            {fieldState.error?.message && (
              <Typography
                variant="caption"
                color="error.main"
                sx={{ display: "block", mt: 0.5 }}
              >
                {fieldState.error.message}
              </Typography>
            )}
          </>
        )}
      />
    </>
  );
}
