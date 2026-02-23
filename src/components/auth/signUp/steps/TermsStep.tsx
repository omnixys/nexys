"use client";

/**
 * @file TermsStep.tsx
 * @description Terms & Conditions step with scrollable AGB container.
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

export default function TermsStep() {
  const { control } = useFormContext<SignUpFormValues>();

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700 }} mb={1}>
        Allgemeine Geschäftsbedingungen
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Bitte lesen und akzeptieren Sie unsere AGB.
      </Typography>

      {/* ================= Scrollable AGB Box ================= */}

      <Paper
        variant="outlined"
        sx={{
          p: 5,
          maxHeight: 260,
          overflowY: "auto",
          borderRadius: 3,
          backgroundColor: "background.paper",
          mb: 3,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          1. Geltungsbereich
        </Typography>
        <Typography variant="body2" paragraph>
          Diese Allgemeinen Geschäftsbedingungen gelten für alle Leistungen und
          Dienste, die von Omnixys Technologies angeboten werden. Mit der
          Registrierung erkennen Sie diese Bedingungen an.
        </Typography>

        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          2. Datenschutz
        </Typography>
        <Typography variant="body2" paragraph>
          Ihre personenbezogenen Daten werden gemäß unserer Datenschutzerklärung
          und den geltenden Datenschutzgesetzen (DSGVO) verarbeitet und
          geschützt.
        </Typography>

        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          3. Nutzungsrechte
        </Typography>
        <Typography variant="body2" paragraph>
          Mit der Registrierung erhalten Sie ein persönliches, nicht
          übertragbares Recht zur Nutzung der Omnixys-Plattform gemäß Ihrem
          gewählten Kontotyp.
        </Typography>

        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          4. Haftung
        </Typography>
        <Typography variant="body2" paragraph>
          Omnixys Technologies haftet nur im Rahmen der gesetzlichen
          Bestimmungen. Eine Haftung für indirekte Schäden oder entgangenen
          Gewinn ist ausgeschlossen.
        </Typography>

        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          5. Kündigung
        </Typography>
        <Typography variant="body2">
          Sie können Ihr Konto jederzeit über die Kontoeinstellungen kündigen.
          Omnixys behält sich das Recht vor, Konten bei Verstößen gegen diese
          AGB zu sperren.
        </Typography>
      </Paper>

      {/* ================= Checkbox ================= */}

      <Controller
        name="termsAccepted"
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
                  Ich habe die{" "}
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    AGB
                  </Box>{" "}
                  und die{" "}
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Datenschutzerklärung
                  </Box>{" "}
                  gelesen und akzeptiere diese.
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
