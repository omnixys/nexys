/**
 * @file /settings/language/page.tsx
 * @description Full page fallback for Language & Region
 */

"use client";

import LayoutShell from "@/components/layout/navbar/home/LayoutShell";
import LanguagePanel from "@/components/settings/panels/LanguagePanel";
import { useAuth } from "@/providers/AuthProvider";
import { Container } from "@mui/material";


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
