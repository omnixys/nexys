/**
 * @file /settings/notifications/page.tsx
 * @description Full page fallback for Notifications
 */

"use client";

import LayoutShell from "@/components/layout/navbar/home/LayoutShell";
import NotificationsPanel from "@/components/settings/panels/NotificationsPanel";
import { useAuth } from "@/providers/AuthProvider";
import { Container } from "@mui/material";

export default function NotificationsPage() {
  const { user, loading } = useAuth();

  return (
    <LayoutShell user={user} loading={loading}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <NotificationsPanel />
      </Container>
    </LayoutShell>
  );
}
