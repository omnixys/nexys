/**
 * @file /security/devices/page.tsx
 * @description Full page fallback for Active Devices
 */

"use client";

import { Container } from "@mui/material";
import LayoutShell from "../../../components/layout/navbar/home/LayoutShell";
import ActiveDevicesPanel from "../../../components/settings/panels/ActiveDevicesPanel";
import { useAuth } from "../../../providers/AuthProvider";

export default function DevicesPage() {
  const { user, loading } = useAuth();

  return (
    <LayoutShell user={user} loading={loading}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <ActiveDevicesPanel />
      </Container>
    </LayoutShell>
  );
}
