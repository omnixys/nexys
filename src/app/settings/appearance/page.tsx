/**
 * @file /settings/appearance/page.tsx
 * @description Full page fallback for Appearance (non-modal navigation)
 */

"use client";

import { Container } from "@mui/material";
import LayoutShell from "../../../components/home/layout/LayoutShell";
import { useAuth } from "../../../providers/AuthProvider";
import AppearancePanel from "../_components/panels/AppearancePanel";

export default function AppearancePage() {
  const { user, loading } = useAuth();

  return (
    <LayoutShell user={user} loading={loading}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <AppearancePanel />
      </Container>
    </LayoutShell>
  );
}
