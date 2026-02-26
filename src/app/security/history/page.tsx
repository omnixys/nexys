/**
 * @file /security/history/page.tsx
 * @description Full page fallback for Login History
 */

"use client";

import { Container } from "@mui/material";
import LayoutShell from "../../../components/layout/navbar/home/LayoutShell";
import LoginHistoryPanel from "../../../components/settings/panels/LoginHistoryPanel";
import { useAuth } from "../../../providers/AuthProvider";


export default function HistoryPage() {
  const { user, loading } = useAuth();

  return (
    <LayoutShell user={user} loading={loading}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <LoginHistoryPanel />
      </Container>
    </LayoutShell>
  );
}
