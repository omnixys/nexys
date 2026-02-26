/**
 * @file /settings/advanced/page.tsx
 * @description Full page fallback for Advanced Settings
 */

"use client";

import { Container } from "@mui/material";
import AdvancedPanel from "../../../components/settings/panels/AdvancedPanel";
import LayoutShell from "../../../components/layout/navbar/home/LayoutShell";
import { useAuth } from "../../../providers/AuthProvider";

export default function AdvancedPage() {
  const { user, loading } = useAuth();

  return (
    <LayoutShell user={user} loading={loading}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <AdvancedPanel />
      </Container>
    </LayoutShell>
  );
}
