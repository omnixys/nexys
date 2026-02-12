/**
 * @file /security/_components/panels/QuickActionsPanel.tsx
 * @description Full Quick Actions panel
 */

"use client";

import { Divider, Stack, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import DevicesIcon from "@mui/icons-material/Devices";
import WarningIcon from "@mui/icons-material/Warning";
import SecurityIcon from "@mui/icons-material/Security";

import ActionCard from "../tiles/ActionCard";

export default function QuickActionsPanel() {
  return (
    <Stack spacing={3}>
      <Typography variant="h6" fontWeight={900}>
        Quick Actions
      </Typography>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.10)" }} />

      <Stack spacing={2}>
        <ActionCard
          title="Change Password"
          description="Update your account password"
          color="#2196F3"
          icon={<LockIcon />}
        />
        <ActionCard
          title="Manage Devices"
          description="Review and remove devices"
          color="#4CAF50"
          icon={<DevicesIcon />}
        />
        <ActionCard
          title="Security Alert"
          description="View recent security events"
          color="#FF9800"
          icon={<WarningIcon />}
        />
        <ActionCard
          title="Recovery Options"
          description="Set up account recovery"
          color="#9C27B0"
          icon={<SecurityIcon />}
        />
      </Stack>

      <Typography variant="caption" color="text.secondary">
        Next step: connect actions to actual routes/endpoints (password flow,
        device revoke, alert feed, recovery setup).
      </Typography>
    </Stack>
  );
}
