/**
 * @file /settings/language/page.tsx
 * @description Full page fallback for Language & Region
 */

"use client";

import { Container } from "@mui/material";
import LayoutShell from "@/components/layout/navbar/home/LayoutShell";
import LanguagePanel from "@/components/settings/panels/LanguagePanel";
import { useAuth } from "@/providers/AuthProvider";

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
