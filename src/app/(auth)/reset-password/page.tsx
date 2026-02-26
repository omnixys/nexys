// /app/(auth)/reset-password/page.tsx

import { Box, Container } from "@mui/material";
import ResetPasswordFlow from "./ResetPasswordFlow";

export default function Page({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
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
        <ResetPasswordFlow token={searchParams.token ?? ""} />
      </Box>
    </Container>
  );
}
