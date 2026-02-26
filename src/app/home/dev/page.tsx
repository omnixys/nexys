"use client";

import { gql } from "@apollo/client";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import { Box, Button } from "@mui/material";
import { useMutation } from "@apollo/client/react";

/* =========================
   REGISTRATION
========================= */

const GENERATE_REG_OPTIONS = gql`
  mutation {
    generateWebAuthnRegistrationOptions
  }
`;

const VERIFY_REG = gql`
  mutation VerifyReg($response: JSON!) {
    verifyWebAuthnRegistration(response: $response)
  }
`;

/* =========================
   AUTHENTICATION
========================= */

const GENERATE_AUTH_OPTIONS = gql`
  mutation {
    generateWebAuthnAuthOptions
  }
`;

const VERIFY_AUTH = gql`
  mutation VerifyAuth($response: JSON!) {
    verifyWebAuthnAuthentication(response: $response)
  }
`;

export default function WebAuthnTest() {
  const [generateRegOptions] = useMutation(GENERATE_REG_OPTIONS, {
    context: { fetchOptions: { credentials: "include" } },
  });

  const [verifyReg] = useMutation(VERIFY_REG, {
    context: { fetchOptions: { credentials: "include" } },
  });

  const [generateAuthOptions] = useMutation(GENERATE_AUTH_OPTIONS, {
    context: { fetchOptions: { credentials: "include" } },
  });

  const [verifyAuth] = useMutation(VERIFY_AUTH, {
    context: { fetchOptions: { credentials: "include" } },
  });

  /* =========================
     REGISTER
  ========================= */

  const handleRegister = async () => {
    try {
      const { data } = await generateRegOptions();

      const options = data.generateWebAuthnRegistrationOptions;

      const registrationResponse = await startRegistration(options);

      await verifyReg({
        variables: { response: registrationResponse },
      });

      alert("Passkey registered successfully!");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  /* =========================
     AUTHENTICATE
  ========================= */

  const handleAuthenticate = async () => {
    try {
      const { data } = await generateAuthOptions();

      const options = data.generateWebAuthnAuthOptions;

      const authResp = await startAuthentication(options);

      await verifyAuth({
        variables: { response: authResp },
      });

      alert("Authentication successful!");
    } catch (error) {
      console.error(error);
      alert("Authentication failed");
    }
  };

  return (
    <Box>
      <Button sx={{ zIndex: 1300 }} onClick={handleRegister}>
        Register Passkey
      </Button>

      <Button sx={{ zIndex: 1300, ml: 2 }} onClick={handleAuthenticate}>
        Authenticate
      </Button>
    </Box>
  );
}
