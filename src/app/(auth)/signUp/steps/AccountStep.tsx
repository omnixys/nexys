"use client";

import {
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  LinearProgress,
  Box,
  CircularProgress,
} from "@mui/material";
import { Check, Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormContext } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import type { SignUpFormValues } from "../SignUpWizard";
import { useLazyQuery } from "@apollo/client/react";
import { CHECK_USERNAME } from "../../../../graphql/user/user-register.graphql";

export default function AccountStep() {
  const {
    register,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext<SignUpFormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const [checkUsername] = useLazyQuery<{ checkUsername: boolean }>(CHECK_USERNAME);
  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");

  const username = watch("username");
  const password = watch("password");

  const passwordStrength = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  useEffect(() => {
    if (!username || username.length < 3) return;

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
            message: "Username ist bereits vergeben.",
          });
        }
      } catch {
        setUsernameStatus("idle");
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [username]);


  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700 }} mb={4}>
        Account erstellen
      </Typography>

      <Stack spacing={3}>
        {/* Username */}
        <TextField
          {...register("username")}
          fullWidth
          label="Username"
          autoComplete="username"
          error={!!errors.username}
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
          helperText={
            errors.username?.message ??
            (usernameStatus === "checking"
              ? "Überprüfung..."
              : usernameStatus === "available"
                ? "✓ Verfügbar"
                : " ")
          }
        />

        {/* Password */}
        <Box>
          <TextField
            {...register("password")}
            type={showPassword ? "text" : "password"}
            fullWidth
            label="Passwort"
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

        {/* Confirm */}
        <TextField
          {...register("confirmPassword")}
          type="password"
          fullWidth
          label="Passwort wiederholen"
          autoComplete="new-password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message ?? " "}
        />
      </Stack>
    </>
  );
}
