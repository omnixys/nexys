"use client";

/**
 * @file PersonalInfoStep.tsx
 * @description Personal info step (4 structured rows desktop + mobile).
 */

import { useLazyQuery } from "@apollo/client/react";
import { Check, Close } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { SignUpFormValues } from "@/schemas/sign-up.schema";
import {
  CheckEmailDocument,
  CheckEmailQuery,
  CheckEmailQueryVariables,
  GenderType,
  MaritalStatusType,
} from "@/generated/graphql";

import { useTypedTranslations } from "@/i18n/useTypedTranslations";

type EmailStatus = "idle" | "checking" | "available" | "taken";

export default function PersonalInfoStep() {
  const t = useTypedTranslations("signup");
  const enumT = useTypedTranslations("enums");

  const {
    control,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useFormContext<SignUpFormValues>();

  const [checkEmail] = useLazyQuery<CheckEmailQuery, CheckEmailQueryVariables>(
    CheckEmailDocument,
  );

  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");

  const email = watch("personalInfo.email");

  /**
   * Email availability check (debounced)
   */
  useEffect(() => {
    if (!email || email.length < 3) {
      setEmailStatus("idle");
      return;
    }

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
            message: t("personal.email.taken"),
          });
        }
      } catch {
        setEmailStatus("idle");
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [email, checkEmail, setError, clearErrors, t]);

  const emailHelperText =
    errors.personalInfo?.email?.message ??
    (emailStatus === "checking"
      ? t("personal.email.checking")
      : emailStatus === "available"
        ? t("personal.email.available")
        : " ");

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700 }} mb={4}>
        {t("personal.title")}
      </Typography>
      {/* ================================
          FIRST + LAST NAME
      ================================= */}
      <Box mb={3}>
        <Grid container spacing={3}>
          <Grid sx={{ xs: 12, md: 6, width: "47%" }}>
            <Controller
              name="personalInfo.firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t("personal.fields.firstName")}
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
                  label={t("personal.fields.lastName")}
                  error={!!errors.personalInfo?.lastName}
                  helperText={errors.personalInfo?.lastName?.message ?? " "}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>

      {/* ================================
          EMAIL
      ================================= */}
      <Box mb={3}>
        <Controller
          name="personalInfo.email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              fullWidth
              label={t("personal.fields.email")}
              error={!!errors.personalInfo?.email}
              helperText={emailHelperText}
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

      {/* ================================
          BIRTHDATE + ENUMS
      ================================= */}
      <Box>
        <Stack direction="row" spacing={3}>
          <Controller
            name="personalInfo.birthDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                fullWidth
                label={t("personal.fields.birthDate")}
                InputLabelProps={{ shrink: true }}
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
                label={t("personal.fields.gender")}
                error={!!errors.personalInfo?.gender}
                helperText={errors.personalInfo?.gender?.message ?? " "}
              >
                {Object.values(GenderType).map((g) => (
                  <MenuItem key={g} value={g}>
                    {enumT(`gender.${g}`)}
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
                label={t("personal.fields.maritalStatus")}
                error={!!errors.personalInfo?.maritalStatus}
                helperText={errors.personalInfo?.maritalStatus?.message ?? " "}
              >
                {Object.values(MaritalStatusType).map((m) => (
                  <MenuItem key={m} value={m}>
                    {enumT(`maritalStatus.${m}`)}
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
