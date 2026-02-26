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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/client/react";
import { REQUEST_PASSWORD_RESET } from "../../../graphql/authentication/reset.authentication";

const schema = z.object({
  email: z.string().email("Bitte eine gültige E-Mail eingeben."),
});

type FormInput = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const theme = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [requestReset] = useMutation(REQUEST_PASSWORD_RESET);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormInput) => {
    setServerError(null);

    try {
      await requestReset({
        variables: { email: data.email },
      });

      // Always show neutral success (anti-enumeration)
      setSubmitted(true);
    } catch {
      // Still show neutral success to avoid leaking existence
      setSubmitted(true);
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
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Prüfe deine E-Mails
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Wenn ein Konto zu dieser E-Mail existiert, erhältst du in Kürze
              eine Nachricht mit einem Reset-Link.
            </Typography>

            <Button
              component={Link}
              href="/login"
              variant="text"
              sx={{ mt: 3, borderRadius: 3 }}
            >
              Zurück zum Login
            </Button>
          </CardContent>
        </Card>
      </Fade>
    );
  }

  return (
    <Card sx={cardSx}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Passwort vergessen?
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Gib deine E-Mail ein. Wenn ein Konto existiert, senden wir dir einen
          Reset-Link.
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="E-Mail"
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
            {isSubmitting ? "Senden..." : "Reset-Link senden"}
          </Button>

          <Button
            component={Link}
            href="/login"
            fullWidth
            variant="text"
            sx={{ mt: 1.5, borderRadius: 3 }}
          >
            Abbrechen
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
