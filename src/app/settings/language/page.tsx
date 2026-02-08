/**
 * @file /settings/language/page.tsx
 * @description Full page fallback for Language & Region
 */

"use client";

import { Container } from "@mui/material";
import LayoutShell from "../../../components/home/layout/LayoutShell";
import { useAuth } from "../../../providers/AuthProvider";
import LanguagePanel from "../_components/panels/LanguagePanel";

export default function LanguagePage() {
  const { user, loading } = useAuth();

  return (
    <LayoutShell user={user} loading={loading}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <LanguagePanel />
      </Container>
    </LayoutShell>
  );
}
