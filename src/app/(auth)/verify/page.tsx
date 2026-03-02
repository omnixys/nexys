"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Stack,
} from "@mui/material";
import { useMutation } from "@apollo/client/react";
// import { VERIFY_REGISTRATION } from "@/graphql/authentication/verify-registration";
  // import { gql } from "@apollo/client";

  // export const VERIFY_REGISTRATION = gql`
  //   mutation VerifyRegistration($token: String!) {
  //     verifyRegistration(token: $token) {
  //       success
  //       message
  //       userId
  //     }
  //   }
  // `;

type VerifyState = "loading" | "success" | "error";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [state, setState] = useState<VerifyState>("success");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // const [verifyRegistration] = useMutation(VERIFY_REGISTRATION);


  // useEffect(() => {
  //   if (!token) {
  //     setState("error");
  //     setErrorMessage("Missing verification token.");
  //     return;
  //   }

  //   const runVerification = async () => {
  //     try {
  //       const { data } = await verifyRegistration({
  //         variables: { token },
  //       });

  //       if (data?.verifyRegistration?.success) {
  //         setState("success");

  //         // Optional: small delay before redirect
  //         setTimeout(() => {
  //           router.push("/login?verified=true");
  //         }, 2000);
  //       } else {
  //         setState("error");
  //         setErrorMessage(
  //           data?.verifyRegistration?.message ||
  //             "Verification failed. Please try again.",
  //         );
  //       }
  //     } catch (error: any) {
  //       setState("error");
  //       setErrorMessage(
  //         error?.message || "Unexpected error during verification.",
  //       );
  //     }
  //   };

  //   runVerification();
  // }, [token, verifyRegistration, router]);

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
      <Card sx={{ maxWidth: 500, width: "100%" }}>
        <CardContent>
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography variant="h5" fontWeight={700}>
              Account Verification
            </Typography>

            {state === "loading" && (
              <>
                <CircularProgress />
                <Typography color="text.secondary">
                  Verifying your account...
                </Typography>
              </>
            )}

            {state === "success" && (
              <>
                <Alert severity="success" sx={{ width: "100%" }}>
                  Your account has been successfully verified.
                </Alert>
                <Typography color="text.secondary">
                  Redirecting to login...
                </Typography>
              </>
            )}

            {state === "error" && (
              <>
                <Alert severity="error" sx={{ width: "100%" }}>
                  {errorMessage}
                </Alert>
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
    </Box>
  );
}
