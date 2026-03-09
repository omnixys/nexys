"use client";

import { useMutation } from "@apollo/client/react";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import AnimatedCheck from "@/components/ui/AnimatedCheck";
import {
  VerifySignUpDocument,
  type VerifySignUpMutation,
  type VerifySignUpMutationVariables,
} from "@/generated/graphql";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

type VerifyState = "loading" | "success" | "error";

export default function VerifyPage() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const t = useTypedTranslations("signup");

  const token = searchParams.get("token");

  const [state, setState] = useState<VerifyState>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const [showConfetti, setShowConfetti] = useState(false);

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [verifyRegistration] = useMutation<VerifySignUpMutation, VerifySignUpMutationVariables>(
    VerifySignUpDocument,
    {
      context: {
        fetchOptions: {
          credentials: "include",
        },
      },
    },
  );

  // screen size for confetti
  useEffect(() => {
    const update = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  // verification
  useEffect(() => {
    if (!token) {
      setState("error");
      setErrorMessage(t("verifyPage.errors.missingToken"));
      return;
    }

    const runVerification = async () => {
      try {
        const { data } = await verifyRegistration({
          variables: { token },
        });

        const result = data?.verifySignUp;

        if (!result) {
          setState("error");
          setErrorMessage(t("verifyPage.errors.unexpected"));
          return;
        }

        if (result.message === "OK") {
          setUsername(result.username ?? null);
          setState("success");

          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);

          setTimeout(() => {
            router.push("/home");
          }, 3000);

          return;
        }

        if (result.message === "ALREADY_REGISTERED") {
          setState("error");
          setErrorMessage(t("verifyPage.errors.alreadyRegistered"));
          return;
        }

        if (result.message === "ALREADY_CONSUMED_OR_EXPIRED") {
          setState("error");
          setErrorMessage(t("verifyPage.errors.expired"));
          return;
        }

        setState("error");
        setErrorMessage(t("verifyPage.errors.failed"));
      } catch {
        setState("error");
        setErrorMessage(t("verifyPage.errors.unexpected"));
      }
    };

    runVerification();
  }, [token, verifyRegistration, router, t]);

  return (
    <>
      {state === "success" && showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          numberOfPieces={320}
          colors={[theme.palette.primary.main, theme.palette.secondary.main, "#FFD700", "#FFFFFF"]}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1200,
          }}
        />
      )}

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
        >
          <Card
            sx={{
              maxWidth: 520,
              width: "100%",
              borderRadius: 4,
              backdropFilter: "blur(14px)",
            }}
          >
            <CardContent>
              <Stack spacing={4} alignItems="center" textAlign="center">
                <Typography variant="h5" fontWeight={700}>
                  {t("verifyPage.title")}
                </Typography>

                {state === "loading" && (
                  <>
                    <CircularProgress size={46} />

                    <Typography color="text.secondary">{t("verifyPage.loading")}</Typography>

                    <LinearProgress sx={{ width: "100%" }} />
                  </>
                )}

                {state === "success" && (
                  <>
                    <AnimatedCheck />

                    <Typography variant="h6" fontWeight={600}>
                      {t("verifyPage.successTitle", { username })}
                    </Typography>

                    <Typography color="text.secondary">
                      {t("verifyPage.successDescription")}
                    </Typography>

                    <LinearProgress sx={{ width: "100%" }} />
                  </>
                )}
                {state === "error" && (
                  <>
                    <ErrorOutlineRounded
                      sx={{
                        fontSize: 72,
                        color: "error.main",
                      }}
                    />

                    <Typography variant="h6" fontWeight={600}>
                      {t("verifyPage.errorTitle")}
                    </Typography>

                    <Typography color="text.secondary">{errorMessage}</Typography>

                    <Button variant="contained" onClick={() => router.push("/register")}>
                      {t("verifyPage.back")}
                    </Button>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </>
  );
}
