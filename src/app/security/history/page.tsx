/**
 * @file /security/history/page.tsx
 * @description Full page fallback for Login History
 */

"use client";

import { Container } from "@mui/material";
import LayoutShell from "../../../components/home/layout/LayoutShell";
import { useAuth } from "../../../providers/AuthProvider";
import LoginHistoryPanel from "../../settings/_components/panels/LoginHistoryPanel";

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
