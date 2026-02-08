/**
 * @file /settings/advanced/page.tsx
 * @description Full page fallback for Advanced Settings
 */

"use client";

import { Container } from "@mui/material";
import LayoutShell from "../../../components/home/layout/LayoutShell";
import { useAuth } from "../../../providers/AuthProvider";
import AdvancedPanel from "../_components/panels/AdvancedPanel";

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
