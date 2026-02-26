// /app/(auth)/forgot-password/page.tsx

import { Box, Container } from "@mui/material";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function Page() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
        }}
      >
        <ForgotPasswordForm />
      </Box>
    </Container>
  );
}
