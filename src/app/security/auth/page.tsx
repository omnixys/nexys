/**
 * @file /security/auth/page.tsx
 * @description Full page fallback for Authentication Methods
 */

"use client";

import { Container } from "@mui/material";
import LayoutShell from "../../../components/layout/navbar/home/LayoutShell";
import AuthenticationPanel from "../../../components/settings/panels/AuthenticationPanel";
import { useAuth } from "../../../providers/AuthProvider";


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
