"use client";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  useTheme,
  InputAdornment,
  IconButton,
  LinearProgress,
  Divider,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import zxcvbn from "zxcvbn";

type Question = { id: string; question: string };

type VerifyResponse =
  | { ok: true; questions: Question[]; expiresAt: number }
  | { ok: false; code: string };

type CompleteResponse = { ok: true } | { ok: false; code: string };

const STEPS = ["Sicherheitsfragen", "Neues Passwort"];

function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function strengthLabel(score: number): string {
  return ["Very weak", "Weak", "Okay", "Strong", "Very strong"][score] ?? "—";
}

export default function ResetPasswordFlow() {
  const sp = useSearchParams();
  const token = sp.get("token") ?? "";
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const cardSx = useMemo(
    () => ({
      width: "100%",
      borderRadius: 4,
      border: `1px solid ${theme.palette.divider}`,
      backdropFilter: "blur(30px)",
      WebkitBackdropFilter: "blur(30px)",
      zIndex: 1300
    }),
    [theme.palette.divider],
  );

  // Countdown ticker
  useEffect(() => {
    if (!expiresAt) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [expiresAt]);

  const msLeft = expiresAt ? expiresAt - now : 0;
  const isExpired = expiresAt ? msLeft <= 0 : false;

  const strength = useMemo(() => {
    if (!newPassword) return { score: 0, pct: 0, label: "—" };
    const r = zxcvbn(newPassword);
    return {
      score: r.score,
      pct: (r.score / 4) * 100,
      label: strengthLabel(r.score),
    };
  }, [newPassword]);

  // Load questions
  useEffect(() => {
    const run = async () => {
      if (!token) {
        setErr("Kein Token gefunden.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/auth/reset/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const json = (await res.json()) as VerifyResponse;

      if (!json.ok) {
        setErr("Link ungültig oder abgelaufen.");
        setLoading(false);
        return;
      }

      setQuestions(json.questions);
      setExpiresAt(json.expiresAt);
      setLoading(false);
    };

    void run();
  }, [token]);

  const handleNextStep = () => {
    setErr(null);
    setActiveStep(1);
  };

  const handleVerifyQuestions = async () => {
    setSubmitting(true);
    setErr(null);

    const res = await fetch("/api/auth/reset/verify-answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        answers: questions.map((q) => ({
          questionId: q.id,
          answer: answers[q.id] ?? "",
        })),
      }),
    });

    const json = await res.json();

    if (!json.ok) {
      setErr("Sicherheitsfragen sind nicht korrekt.");
      setSubmitting(false);
      return;
    }

    setActiveStep(1); // Nur hier erlauben!
    setSubmitting(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setErr(null);

    const payload = {
      token,
      answers: questions.map((q) => ({
        questionId: q.id,
        answer: answers[q.id] ?? "",
      })),
      newPassword,
      confirmPassword,
    };

    const res = await fetch("/api/auth/reset/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = (await res.json()) as CompleteResponse;

    if (!json.ok) {
      setErr("Reset fehlgeschlagen oder Antworten falsch.");
      setSubmitting(false);
      return;
    }

    setDone(true);
    setSubmitting(false);
  };

  if (loading) {
    return (
      <Card sx={cardSx}>
        <CardContent sx={{ p: 4 }}>
          <Typography>Prüfen…</Typography>
        </CardContent>
      </Card>
    );
  }

  if (done) {
    return (
      <Card sx={cardSx}>
        <CardContent sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h5" fontWeight={800}>
            Passwort aktualisiert
          </Typography>
          <Button component={Link} href="/login" sx={{ mt: 3 }}>
            Zum Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={cardSx}>
      <CardContent sx={{ p: 4 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" fontWeight={800}>
            Passwort zurücksetzen
          </Typography>
          {expiresAt && (
            <Typography variant="body2" color="text.secondary">
              Gültig: {formatCountdown(msLeft)}
            </Typography>
          )}
        </Stack>

        <Alert severity="info" sx={{ my: 2 }}>
          Nach dem Zurücksetzen wirst du auf allen Geräten abgemeldet.
        </Alert>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {err && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {err}
          </Alert>
        )}

        {activeStep === 0 && (
          <Stack spacing={2}>
            {questions.map((q) => (
              <TextField
                key={q.id}
                label={q.question}
                fullWidth
                value={answers[q.id] ?? ""}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [q.id]: e.target.value,
                  }))
                }
              />
            ))}

            <Button
              variant="contained"
              disabled={questions.some((q) => !(answers[q.id] ?? "").trim())}
              onClick={handleVerifyQuestions}
            >
              Weiter
            </Button>
          </Stack>
        )}

        {activeStep === 1 && (
          <Stack spacing={2}>
            <TextField
              label="Neues Passwort"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword((prev) => !prev)}
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={`Strength: ${strength.label}`}
            />

            <LinearProgress
              variant="determinate"
              value={strength.pct}
              sx={{ borderRadius: 999 }}
            />

            <TextField
              label="Passwort bestätigen"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              helperText={
                confirmPassword && newPassword !== confirmPassword
                  ? "Passwörter stimmen nicht überein."
                  : " "
              }
            />

            <Button
              variant="contained"
              disabled={
                submitting ||
                newPassword.length < 8 ||
                newPassword !== confirmPassword
              }
              onClick={handleSubmit}
            >
              Passwort setzen
            </Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
