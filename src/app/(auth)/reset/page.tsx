"use client";

import {
  Alert,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useTheme,
  Box,
} from "@mui/material";

import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { motion } from "framer-motion";
import { useMutation } from "@apollo/client/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import zxcvbn from "zxcvbn";

import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import PasswordStrength from "@/components/ui/PasswordStrength";
import { CompletePasswordResetDocument, CompletePasswordResetMutation, CompletePasswordResetMutationVariables, MfaPreference, VerifyPasswordResetStepUpDocument, VerifyPasswordResetStepUpMutation, VerifyPasswordResetStepUpMutationVariables, VerifyPasswordResetTokenDocument, VerifyPasswordResetTokenMutation, VerifyPasswordResetTokenMutationVariables } from "@/generated/graphql";


export default function ResetPage() {
  const theme = useTheme();
  const router = useRouter();
  const t = useTypedTranslations("recovery");

  const sp = useSearchParams();
  const token = sp.get("token") ?? "";

  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaMethod, setMfaMethod] = useState<MfaPreference | null>(null);

  const [totpCode, setTotpCode] = useState("");
  const [backupCode, setBackupCode] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const [verifyToken] = useMutation<
    VerifyPasswordResetTokenMutation,
    VerifyPasswordResetTokenMutationVariables
  >(VerifyPasswordResetTokenDocument);
  const [verifyStepUp] = useMutation<
    VerifyPasswordResetStepUpMutation,
    VerifyPasswordResetStepUpMutationVariables
  >(VerifyPasswordResetStepUpDocument);
  const [completeReset] = useMutation<
    CompletePasswordResetMutation,
    CompletePasswordResetMutationVariables
  >(CompletePasswordResetDocument);

  const strength = useMemo(() => {
    if (!newPassword) return { score: 0, pct: 0 };
    const r = zxcvbn(newPassword);
    return { score: r.score, pct: (r.score / 4) * 100 };
  }, [newPassword]);

  const handleVerifyToken = async () => {
    try {
      const res = await verifyToken({ variables: { token } });
      const data = res?.data?.verifyPasswordResetToken;

      setMfaRequired(data?.mfaRequired ?? false);
      setMfaMethod(data?.mfaMethod ?? null);

      if (!data?.mfaRequired) setActiveStep(2);
      else setActiveStep(1);
    } catch {
      setError(t("resetPassword.errors.invalidToken"));
    }
  };

  const handleStepUp = async () => {
    try {
      let input: any = { token };

      if (mfaMethod === "TOTP") input.code = totpCode;
      if (mfaMethod === "BACKUP_CODES") input.code = backupCode;

      await verifyStepUp({ variables: { input } });

      setActiveStep(2);
    } catch {
      setError(t("resetPassword.errors.verificationFailed"));
    }
  };

  const handleComplete = async () => {
    try {
      await completeReset({
        variables: { input: { token, newPassword } },
      });

      setActiveStep(3);

      setTimeout(() => {
        router.push("/login");
      }, 3500);
    } catch {
      setError(t("resetPassword.errors.resetFailed"));
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 520,
        mx: "auto",
        mt: 20,
        borderRadius: 4,
        backdropFilter: "blur(30px)",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={800} mb={3}>
          {t("resetPassword.title")}
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {["verify", "mfa", "password"].map((s) => (
            <Step key={s}>
              <StepLabel>{t(`resetPassword.steps.${s}`)}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && <Alert severity="error">{error}</Alert>}

        {activeStep === 0 && (
          <Button fullWidth variant="contained" onClick={handleVerifyToken}>
            {t("resetPassword.verifyToken")}
          </Button>
        )}

        {activeStep === 1 && (
          <Stack spacing={2}>
            {mfaMethod === "TOTP" && (
              <TextField
                label={t("resetPassword.totp")}
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value)}
              />
            )}

            {mfaMethod === "BACKUP_CODES" && (
              <TextField
                label={t("resetPassword.backupCode")}
                value={backupCode}
                onChange={(e) => setBackupCode(e.target.value)}
              />
            )}

            <Button variant="contained" onClick={handleStepUp}>
              {t("resetPassword.verify")}
            </Button>
          </Stack>
        )}

        {activeStep === 2 && (
          <Stack spacing={2}>
            <TextField
              label={t("resetPassword.newPassword")}
              type={showPw ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPw((p) => !p)}>
                      {showPw ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <PasswordStrength password={newPassword} />

            <Divider />

            <Typography variant="caption" color="text.secondary">
              {t("resetPassword.securityHint")}
            </Typography>

            <Button
              variant="contained"
              disabled={newPassword.length < 12}
              onClick={handleComplete}
            >
              {t("resetPassword.setPassword")}
            </Button>
          </Stack>
        )}

        {activeStep === 3 && (
          <Stack spacing={2} alignItems="center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              <CheckCircleRounded
                sx={{ fontSize: 72, color: "success.main" }}
              />
            </motion.div>

            <Typography variant="h6" fontWeight={700}>
              {t("resetPassword.successTitle")}
            </Typography>

            <Typography color="text.secondary">
              {t("resetPassword.successDescription")}
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
