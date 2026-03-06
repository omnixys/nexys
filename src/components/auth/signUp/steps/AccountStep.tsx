"use client";

/**
 * @file AccountStep.tsx
 * @description Account creation step
 */

import { useLazyQuery } from "@apollo/client/react";
import { Check, Close, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { SignUpFormValues } from "@/schemas/sign-up.schema";
import {
  CheckUsernameDocument,
  CheckUsernameQuery,
  CheckUsernameQueryVariables,
} from "@/generated/graphql";

import { useTypedTranslations } from "@/i18n/useTypedTranslations";

type UsernameStatus = "idle" | "checking" | "available" | "taken";

export default function AccountStep() {
  const t = useTypedTranslations("signup");

  const {
    register,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext<SignUpFormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>("idle");

  const [checkUsername] = useLazyQuery<
    CheckUsernameQuery,
    CheckUsernameQueryVariables
  >(CheckUsernameDocument);

  const username = watch("username");
  const password = watch("password");

  /**
   * Password strength calculation
   */
  const passwordStrength = useMemo(() => {
    if (!password) return 0;

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  }, [password]);

  /**
   * Username availability check (debounced)
   */
  useEffect(() => {
    if (!username || username.length < 3) {
      setUsernameStatus("idle");
      return;
    }

    const timeout = setTimeout(async () => {
      setUsernameStatus("checking");

      try {
        const { data } = await checkUsername({
          variables: { username },
        });

        if (data?.checkUsername) {
          setUsernameStatus("available");
          clearErrors("username");
        } else {
          setUsernameStatus("taken");

          setError("username", {
            type: "manual",
            message: t("account.username.taken"),
          });
        }
      } catch {
        setUsernameStatus("idle");
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [username, checkUsername, setError, clearErrors, t]);

  const usernameHelperText =
    errors.username?.message ??
    (usernameStatus === "checking"
      ? t("account.username.checking")
      : usernameStatus === "available"
        ? t("account.username.available")
        : " ");

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700 }} mb={4}>
        {t("account.title")}
      </Typography>

      <Stack spacing={3}>
        {/* ================================
            USERNAME
        ================================= */}
        <TextField
          {...register("username")}
          fullWidth
          label={t("account.fields.username")}
          autoComplete="username"
          error={!!errors.username}
          helperText={usernameHelperText}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {usernameStatus === "checking" && (
                  <CircularProgress size={18} />
                )}

                {usernameStatus === "available" && <Check color="success" />}

                {usernameStatus === "taken" && <Close color="error" />}
              </InputAdornment>
            ),
          }}
        />

        {/* ================================
            PASSWORD
        ================================= */}
        <Box>
          <TextField
            {...register("password")}
            type={showPassword ? "text" : "password"}
            fullWidth
            label={t("account.fields.password")}
            autoComplete="new-password"
            error={!!errors.password}
            helperText={errors.password?.message ?? " "}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((v) => !v)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LinearProgress
            variant="determinate"
            value={(passwordStrength / 4) * 100}
            sx={{
              mt: 1,
              height: 6,
              borderRadius: 3,
            }}
          />
        </Box>

        {/* ================================
            CONFIRM PASSWORD
        ================================= */}
        <TextField
          {...register("confirmPassword")}
          type="password"
          fullWidth
          label={t("account.fields.confirmPassword")}
          autoComplete="new-password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message ?? " "}
        />
      </Stack>
    </>
  );
}
