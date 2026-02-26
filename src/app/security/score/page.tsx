/**
 * @file /security/score/page.tsx
 * @description Full page fallback for Security Score
 */

"use client";

import { Container } from "@mui/material";
import LayoutShell from "../../../components/layout/navbar/home/LayoutShell";
import SecurityScorePanel from "../../../components/settings/panels/SecurityScorePanel";
import { useAuth } from "../../../providers/AuthProvider";

export default function ScorePage() {
  const { user, loading } = useAuth();

  return (
    <LayoutShell user={user} loading={loading}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <SecurityScorePanel />
      </Container>
    </LayoutShell>
  );
}
