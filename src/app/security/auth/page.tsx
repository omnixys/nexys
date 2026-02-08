/**
 * @file /security/auth/page.tsx
 * @description Full page fallback for Authentication Methods
 */

"use client";

import { Container } from "@mui/material";
import LayoutShell from "../../../components/home/layout/LayoutShell";
import { useAuth } from "../../../providers/AuthProvider";
import AuthenticationPanel from "../../settings/_components/panels/AuthenticationPanel";

export default function AuthPage() {
  const { user, loading } = useAuth();

  return (
    <LayoutShell user={user} loading={loading}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <AuthenticationPanel />
      </Container>
    </LayoutShell>
  );
}
