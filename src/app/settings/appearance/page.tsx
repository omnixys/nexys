/**
 * @file /settings/appearance/page.tsx
 * @description Full page fallback for Appearance (non-modal navigation)
 */

"use client";

import LayoutShell from "@/components/layout/navbar/home/LayoutShell";
import AppearancePanel from "@/components/settings/panels/AppearancePanel";
import { useAuth } from "@/providers/AuthProvider";
import { Container } from "@mui/material";

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
