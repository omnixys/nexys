/**
 * @file /security/actions/page.tsx
 * @description Full page fallback for Quick Actions
 */

"use client";

import { Container } from "@mui/material";
import LayoutShell from "../../../components/layout/navbar/home/LayoutShell";
import QuickActionsPanel from "../../../components/settings/panels/QuickActionsPanel";
import { useAuth } from "../../../providers/AuthProvider";


export default function ActionsPage() {
  const { user, loading } = useAuth();

  return (
    <LayoutShell user={user} loading={loading}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <QuickActionsPanel />
      </Container>
    </LayoutShell>
  );
}
