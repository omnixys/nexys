/**
 * @file /settings/data/page.tsx
 * @description Full page fallback for Data Management
 */

"use client";

import { Container } from "@mui/material";
import LayoutShell from "../../../components/home/layout/LayoutShell";
import { useAuth } from "../../../providers/AuthProvider";
import DataPanel from "../_components/panels/DataPanel";

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
