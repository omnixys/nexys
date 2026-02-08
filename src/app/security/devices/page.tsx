/**
 * @file /security/devices/page.tsx
 * @description Full page fallback for Active Devices
 */

"use client";

import { Container } from "@mui/material";
import LayoutShell from "../../../components/home/layout/LayoutShell";
import { useAuth } from "../../../providers/AuthProvider";
import ActiveDevicesPanel from "../../settings/_components/panels/ActiveDevicesPanel";

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
