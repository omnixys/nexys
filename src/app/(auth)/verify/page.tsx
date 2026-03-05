"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Stack,
  LinearProgress,
} from "@mui/material";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import { motion } from "framer-motion";
import { useMutation } from "@apollo/client/react";
import {
  VerifySignUpDocument,
  VerifySignUpMutation,
  VerifySignUpMutationVariables,
} from "@/generated/graphql";

type VerifyState = "loading" | "success" | "error";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [state, setState] = useState<VerifyState>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [verifyRegistration] = useMutation<
    VerifySignUpMutation,
    VerifySignUpMutationVariables
  >(VerifySignUpDocument, {
    context: {
      fetchOptions: {
        credentials: "include",
      },
    },
  });

  useEffect(() => {
    if (!token) {
      setState("error");
      setErrorMessage("Missing verification token.");
      return;
    }

    const runVerification = async () => {
      try {
        const { data } = await verifyRegistration({
          variables: { token },
        });

        if (data?.verifySignUp) {
          setState("success");

          // Apple-like delayed redirect
          setTimeout(() => {
            router.push("/home");
          }, 2500);
        } else {
          setState("error");
          setErrorMessage("Verification failed.");
        }
      } catch (err: any) {
        setState("error");
        setErrorMessage(err?.message ?? "Unexpected verification error.");
      }
    };

    runVerification();
  }, [token, verifyRegistration, router]);

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
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
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
                Account Verification
              </Typography>

              {state === "loading" && (
                <>
                  <CircularProgress size={46} />

                  <Typography color="text.secondary">
                    Verifying your account...
                  </Typography>

                  <LinearProgress sx={{ width: "100%" }} />
                </>
              )}

              {state === "success" && (
                <>
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45 }}
                  >
                    <CheckCircleRounded
                      sx={{
                        fontSize: 72,
                        color: "success.main",
                      }}
                    />
                  </motion.div>

                  <Typography variant="h6" fontWeight={600}>
                    Your account is ready
                  </Typography>

                  <Typography color="text.secondary">
                    You have successfully verified your account.
                    <br />
                    Redirecting to your dashboard...
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
                    Verification failed
                  </Typography>

                  <Typography color="text.secondary">{errorMessage}</Typography>

                  <Button
                    variant="contained"
                    onClick={() => router.push("/register")}
                  >
                    Back to Registration
                  </Button>
                </>
              )}
            </Stack>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
