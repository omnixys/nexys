/**
 * @file /settings/data/page.tsx
 * @description Full page fallback for Data Management
 */

"use client";

import LayoutShell from "@/components/layout/navbar/home/LayoutShell";
import DataPanel from "@/components/settings/panels/DataPanel";
import { useAuth } from "@/providers/AuthProvider";
import { Container } from "@mui/material";

export default function DataPage() {
  const { user, loading } = useAuth();

  return (
    <LayoutShell user={user} loading={loading}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <DataPanel />
      </Container>
    </LayoutShell>
  );
}
