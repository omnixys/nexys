/**
 * @file /security/actions/page.tsx
 * @description Full page fallback for Quick Actions
 */

"use client";

import { Container } from "@mui/material";
import LayoutShell from "../../../components/home/layout/LayoutShell";
import { useAuth } from "../../../providers/AuthProvider";
import QuickActionsPanel from "../../settings/_components/panels/QuickActionsPanel";

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
