/**
 * @file /security/features/page.tsx
 * @description Full page fallback for Security Features
 */

"use client";

import { Container } from "@mui/material";
import LayoutShell from "../../../components/layout/navbar/home/LayoutShell";
import SecurityFeaturesPanel from "../../../components/settings/panels/SecurityFeaturesPanel";
import { useAuth } from "../../../providers/AuthProvider";


export default function FeaturesPage() {
  const { user, loading } = useAuth();

  return (
    <LayoutShell user={user} loading={loading}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <SecurityFeaturesPanel />
      </Container>
    </LayoutShell>
  );
}
