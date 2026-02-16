"use client";

/**
 * @file PersonalInfoStep.tsx
 * @description Personal info step (4 structured rows desktop + mobile).
 */

import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Stack,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import type { SignUpFormValues } from "../SignUpWizard";
import {
  GenderType,
  MaritalStatusType,
} from "../../../../types/user/user-enum-type";
import { Check, Close, WidthFull } from "@mui/icons-material";
import { useLazyQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { CHECK_EMAIL } from "../../../../graphql/user/user-register.graphql";

export default function PersonalInfoStep() {
  const {
    control,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useFormContext<SignUpFormValues>();

      const [checkEmail] = useLazyQuery<{ checkEmail: boolean }>(CHECK_EMAIL);
      const [emailStatus, setEmailStatus] = useState<
        "idle" | "checking" | "available" | "taken"
        >("idle");
    
    const email = watch("personalInfo.email");
  
      useEffect(() => {
        if (!email || email.length < 3) return;
    
        const timeout = setTimeout(async () => {
          setEmailStatus("checking");
    
          try {
            const { data } = await checkEmail({
              variables: { email },
            });
    
            if (data?.checkEmail) {
              setEmailStatus("available");
              clearErrors("personalInfo.email");
            } else {
              setEmailStatus("taken");
              setError("personalInfo.email", {
                type: "manual",
                message: "Email ist bereits vergeben.",
              });
            }
          } catch {
            setEmailStatus("idle");
          }
        }, 400);
    
        return () => clearTimeout(timeout);
      }, [email]);

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700 }} mb={4}>
        Persönliche Daten
      </Typography>

      {/* =========================
          ROW 1 → FIRST + LAST
         ========================= */}
      <Box mb={3}>
        <Grid container spacing={5}>
          <Grid sx={{ xs: 12, md: 6, width: "47%" }}>
            <Controller
              name="personalInfo.firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Vorname"
                  value={field.value ?? ""}
                  error={!!errors.personalInfo?.firstName}
                  helperText={errors.personalInfo?.firstName?.message ?? " "}
                />
              )}
            />
          </Grid>

          <Grid sx={{ xs: 12, md: 6, width: "47%" }}>
            <Controller
              name="personalInfo.lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Nachname"
                  value={field.value ?? ""}
                  error={!!errors.personalInfo?.lastName}
                  helperText={errors.personalInfo?.lastName?.message ?? " "}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>

      {/* =========================
          ROW 2 → EMAIL
         ========================= */}
      <Box mb={3}>
        <Controller
          name="personalInfo.email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              fullWidth
              label="E-Mail"
              value={field.value ?? ""}
              error={!!errors.personalInfo?.email}
              helperText={
                errors.personalInfo?.email?.message ??
                (emailStatus === "checking"
                  ? "Überprüfung..."
                  : emailStatus === "available"
                    ? "✓ Verfügbar"
                    : " ")
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {emailStatus === "checking" && (
                      <CircularProgress size={18} />
                    )}
                    {emailStatus === "available" && <Check color="success" />}
                    {emailStatus === "taken" && <Close color="error" />}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Box>

      {/* =========================
          ROW 2 → Email + Birthdate
         ========================= */}
      <Box>
        <Stack direction={"row"} spacing={3}>
          <Controller
            name="personalInfo.birthDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                fullWidth
                label="Geburtsdatum"
                InputLabelProps={{ shrink: true }}
                value={field.value ?? ""}
                error={!!errors.personalInfo?.birthDate}
                helperText={errors.personalInfo?.birthDate?.message ?? " "}
              />
            )}
          />

          <Controller
            name="personalInfo.gender"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="Geschlecht"
                value={field.value ?? ""}
                error={!!errors.personalInfo?.gender}
                helperText={errors.personalInfo?.gender?.message ?? " "}
              >
                {Object.values(GenderType).map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="personalInfo.maritalStatus"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="Familienstand"
                value={field.value ?? ""}
                error={!!errors.personalInfo?.maritalStatus}
                helperText={errors.personalInfo?.maritalStatus?.message ?? " "}
              >
                {Object.values(MaritalStatusType).map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Stack>
      </Box>
    </>
  );
}