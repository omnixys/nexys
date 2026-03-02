"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { gql } from "@apollo/client";
import { Box, CircularProgress, Typography } from "@mui/material";
import { AuthManager } from "@/utils/AuthManager";
import { useMutation } from "@apollo/client/react";

const VERIFY_MAGIC_LINK = gql`
  mutation VerifyMagicLink($token: String!) {
    verifyMagicLink(token: $token) {
      accessToken
      refreshToken
      idToken
      expiresIn
      refreshExpiresIn
      scope
    }
  }
`;

export default function VerifyMagicLinkPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [verifyMagicLink] = useMutation(VERIFY_MAGIC_LINK, {
    context: { fetchOptions: { credentials: "include" } },
  });

  useEffect(() => {
    async function verify() {
      if (!token) return;

      try {
                await AuthManager.verifyMagicLink(token);
                  router.push("/home");
      } catch (err) {
        router.push("/login?error=invalidLink");
      }
    }

    verify();
  }, [token]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
      <Typography mt={2}>Verifying Magic Link...</Typography>
    </Box>
  );
}
