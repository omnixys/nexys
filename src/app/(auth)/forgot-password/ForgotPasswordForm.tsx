"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  useTheme,
  Alert,
  Fade,
  Stack,
} from "@mui/material";

import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";

import { useMutation } from "@apollo/client/react";

import {
  RequestPasswordResetDocument,
  RequestPasswordResetMutation,
  RequestPasswordResetMutationVariables,
} from "@/generated/graphql";

import { useTypedTranslations } from "@/i18n/useTypedTranslations";

type FormInput = {
  email: string;
};

const RESEND_SECONDS = 60;

export default function ForgotPasswordForm() {
  const theme = useTheme();
  const t = useTypedTranslations("recovery");

  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);
  const [emailSent, setEmailSent] = useState<string | null>(null);

  const schema = z.object({
    email: z.string().email(t("forgotPassword.validation.email")),
  });

  const [requestReset] = useMutation<
    RequestPasswordResetMutation,
    RequestPasswordResetMutationVariables
  >(RequestPasswordResetDocument);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { email: "" },
  });

  useEffect(() => {
    if (!submitted) return;

    const interval = setInterval(() => {
      setResendTimer((t) => Math.max(0, t - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [submitted]);

  const onSubmit = async (data: FormInput) => {
    setServerError(null);

    try {
      await requestReset({ variables: { email: data.email } });
      setEmailSent(data.email);
      setSubmitted(true);
    } catch {
      setEmailSent(data.email);
      setSubmitted(true);
    }
  };

const resend = async () => {
  if (!emailSent) return;

  try {
    await requestReset({
      variables: {
        email: emailSent,
      },
    });

    setResendTimer(RESEND_SECONDS);
  } catch {
    // ignore errors (anti-enumeration)
  }
};
  const cardSx = useMemo(
    () => ({
      width: "100%",
      borderRadius: 4,
      border: `1px solid ${theme.palette.divider}`,
      backdropFilter: "blur(30px)",
      WebkitBackdropFilter: "blur(30px)",
      transition: "all 0.3s ease",
      zIndex: 1300,
    }),
    [theme.palette.divider],
  );

  if (submitted) {
    return (
      <Fade in>
        <Card sx={cardSx}>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
            >
              <Box
                sx={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  mx: "auto",
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, #FFD700)`,
                  boxShadow: `0 0 30px ${theme.palette.primary.main}55`,
                }}
              >
                <MailOutlineRoundedIcon sx={{ fontSize: 44, color: "#fff" }} />
              </Box>
            </motion.div>

            <Typography variant="h5" fontWeight={700}>
              {t("forgotPassword.successTitle")}
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              {t("forgotPassword.successDescription")}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                fontWeight: 600,
                color: "primary.main",
              }}
            >
              {emailSent}
            </Typography>

            <Stack spacing={2} mt={3}>
              <Button
                variant="outlined"
                disabled={resendTimer > 0}
                onClick={resend}
              >
                {resendTimer > 0
                  ? `${t("forgotPassword.resend")} (${resendTimer}s)`
                  : t("forgotPassword.resend")}
              </Button>

              <Button component={Link} href="/login" variant="text">
                {t("forgotPassword.backToLogin")}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Fade>
    );
  }

  return (
    <Card sx={cardSx}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          {t("forgotPassword.title")}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          {t("forgotPassword.description")}
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label={t("forgotPassword.email")}
            type="email"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, borderRadius: 3 }}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting
              ? t("forgotPassword.sending")
              : t("forgotPassword.sendLink")}
          </Button>

          <Button
            component={Link}
            href="/login"
            fullWidth
            variant="text"
            sx={{ mt: 1.5 }}
          >
            {t("forgotPassword.cancel")}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
