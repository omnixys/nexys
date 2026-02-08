/**
 * @file /settings/notifications/page.tsx
 * @description Full page fallback for Notifications
 */

"use client";

import { Container } from "@mui/material";
import LayoutShell from "../../../components/home/layout/LayoutShell";
import { useAuth } from "../../../providers/AuthProvider";
import NotificationsPanel from "../_components/panels/NotificationsPanel";

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
