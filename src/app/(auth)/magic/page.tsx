"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";

import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";

import { motion } from "framer-motion";

import { AuthManager } from "@/utils/AuthManager";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import Confetti from "react-confetti";

type State = "loading" | "success" | "error";

export default function VerifyMagicLinkPage() {
  const params = useSearchParams();
  const router = useRouter();
  const t = useTypedTranslations("login");

  const token = params.get("token");

  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    async function verify() {
      if (!token) {
        setState("error");
        return;
      }

      try {
        await AuthManager.verifyMagicLink(token);

        setState("success");

        setTimeout(() => {
          router.push("/home");
        }, 2000);
      } catch {
        setState("error");
      }
    }

    verify();
  }, [token, router]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 460,
          width: "100%",
          borderRadius: 4,
          backdropFilter: "blur(30px)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <CardContent>
          <Stack spacing={4} alignItems="center" textAlign="center">
            {/* LOADING */}

            {state === "loading" && (
              <>
                <CircularProgress size={46} />

                <Typography color="text.secondary">
                  {t("magicLink.verifying")}
                </Typography>
              </>
            )}

            {/* SUCCESS */}

            {state === "success" && (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 14 }}
                >
                  <CheckCircleRounded
                    sx={{
                      fontSize: 72,
                      color: "success.main",
                    }}
                  />
                </motion.div>

                <Typography variant="h6" fontWeight={600}>
                  {t("magicLink.successTitle")}
                </Typography>

                <Typography color="text.secondary">
                  {t("magicLink.successDescription")}
                </Typography>
              </>
            )}

            {/* ERROR */}

            {state === "error" && (
              <>
                <ErrorOutlineRounded
                  sx={{
                    fontSize: 72,
                    color: "error.main",
                  }}
                />

                <Typography variant="h6" fontWeight={600}>
                  {t("magicLink.errorTitle")}
                </Typography>

                <Typography color="text.secondary">
                  {t("magicLink.errorDescription")}
                </Typography>

                <Button
                  variant="contained"
                  onClick={() => router.push("/login")}
                >
                  {t("magicLink.backToLogin")}
                </Button>
              </>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
