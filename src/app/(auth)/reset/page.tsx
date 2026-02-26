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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useMutation } from "@apollo/client/react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import zxcvbn from "zxcvbn";

import {
  VERIFY_PASSWORD_RESET_TOKEN,
  VERIFY_PASSWORD_RESET_STEP_UP,
  COMPLETE_PASSWORD_RESET,
} from "../../../graphql/authentication/reset.authentication";

type MfaMethod = "TOTP" | "SECURITY_QUESTIONS" | "BACKUP_CODES" | "WEBAUTHN";

const STEPS = ["Token prüfen", "Verifikation", "Passwort setzen"];

export default function ResetPage() {
  const theme = useTheme();
  const sp = useSearchParams();
  const token = sp.get("token") ?? "";

  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaMethod, setMfaMethod] = useState<MfaMethod | null>(null);

  const [totpCode, setTotpCode] = useState("");
  const [backupCode, setBackupCode] = useState("");
  const [answers, setAnswers] = useState<
    { questionId: string; answer: string }[]
  >([]);

  const [newPassword, setNewPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const [verifyToken] = useMutation(VERIFY_PASSWORD_RESET_TOKEN);
  const [verifyStepUp] = useMutation(VERIFY_PASSWORD_RESET_STEP_UP);
  const [completeReset] = useMutation(COMPLETE_PASSWORD_RESET);

  const strength = useMemo(() => {
    if (!newPassword) return { score: 0, pct: 0 };
    const r = zxcvbn(newPassword);
    return { score: r.score, pct: (r.score / 4) * 100 };
  }, [newPassword]);

  /* =============================
     STEP 1: Verify Token
  ============================= */

  const handleVerifyToken = async () => {
    try {
      const res = await verifyToken({ variables: { token } });

      const data = res?.data?.verifyPasswordResetToken;

      setMfaRequired(data.mfaRequired);
      setMfaMethod(data.mfaMethod);

      if (!data.mfaRequired) {
        setActiveStep(2);
      } else {
        setActiveStep(1);
      }
    } catch {
      setError("Token ungültig oder abgelaufen.");
    }
  };

  /* =============================
     STEP 2: Dynamic MFA
  ============================= */

  const handleStepUp = async () => {
    try {
      let input: any = { token };

      if (mfaMethod === "TOTP") {
        input.code = totpCode;
      }

      if (mfaMethod === "BACKUP_CODES") {
        input.code = backupCode;
      }

      if (mfaMethod === "SECURITY_QUESTIONS") {
        input.answers = answers;
      }

      if (mfaMethod === "WEBAUTHN") {
        // Placeholder for real WebAuthn flow
        input.credentialResponse = await fakeWebAuthn();
      }

      await verifyStepUp({ variables: { input } });

      setActiveStep(2);
    } catch {
      setError("Verifikation fehlgeschlagen.");
    }
  };

  /* =============================
     STEP 3: Complete Reset
  ============================= */

  const handleComplete = async () => {
    try {
      await completeReset({
        variables: {
          input: {
            token,
            newPassword,
          },
        },
      });

      setActiveStep(3);
    } catch {
      setError("Passwort konnte nicht gesetzt werden.");
    }
  };

  /* =============================
     MOCK WebAuthn
  ============================= */

  const fakeWebAuthn = async () => {
    // Replace with real WebAuthn later
    return {
      id: "mock",
      rawId: "mock",
      response: {},
      type: "public-key",
    };
  };

  /* =============================
     UI
  ============================= */

  return (
    <Card
      sx={{
        maxWidth: 520,
        mx: "auto",
        mt: 10,
        borderRadius: 4,
        backdropFilter: "blur(30px)",
        border: `1px solid ${theme.palette.divider}`,
        zIndex: 1300,
        position: 'relative'
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={800} mb={3}>
          Passwort zurücksetzen
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {STEPS.map((s) => (
            <Step key={s}>
              <StepLabel>{s}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && <Alert severity="error">{error}</Alert>}

        {/* STEP 0 */}
        {activeStep === 0 && (
          <Button fullWidth variant="contained" onClick={handleVerifyToken}>
            Token prüfen
          </Button>
        )}

        {/* STEP 1 - Dynamic MFA */}
        {activeStep === 1 && (
          <Stack spacing={2}>
            {mfaMethod === "TOTP" && (
              <TextField
                label="TOTP Code"
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value)}
              />
            )}

            {mfaMethod === "BACKUP_CODES" && (
              <TextField
                label="Backup Code"
                value={backupCode}
                onChange={(e) => setBackupCode(e.target.value)}
              />
            )}

            {mfaMethod === "SECURITY_QUESTIONS" && (
              <>
                <TextField
                  label="Antwort 1"
                  onChange={(e) =>
                    setAnswers([
                      { questionId: "UUID1", answer: e.target.value },
                    ])
                  }
                />
                <TextField
                  label="Antwort 2"
                  onChange={(e) =>
                    setAnswers((prev) => [
                      ...prev,
                      { questionId: "UUID2", answer: e.target.value },
                    ])
                  }
                />
              </>
            )}

            {mfaMethod === "WEBAUTHN" && (
              <Button variant="outlined" onClick={handleStepUp}>
                Mit Sicherheitsschlüssel bestätigen
              </Button>
            )}

            {mfaMethod !== "WEBAUTHN" && (
              <Button variant="contained" onClick={handleStepUp}>
                Verifizieren
              </Button>
            )}
          </Stack>
        )}

        {/* STEP 2 */}
        {activeStep === 2 && (
          <Stack spacing={2}>
            <TextField
              label="Neues Passwort"
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
              helperText="Mindestens 12 Zeichen."
            />

            <LinearProgress
              variant="determinate"
              value={strength.pct}
              sx={{ borderRadius: 999 }}
            />

            <Divider />

            <Button
              variant="contained"
              disabled={newPassword.length < 12}
              onClick={handleComplete}
            >
              Passwort setzen
            </Button>
          </Stack>
        )}

        {activeStep === 3 && (
          <Alert severity="success">Passwort erfolgreich geändert.</Alert>
        )}
      </CardContent>
    </Card>
  );
}
