/**
 * @file /settings/_components/panels/AdvancedPanel.tsx
 * @description Full Advanced settings panel
 */

"use client";

import { Box, Divider, Stack, Typography } from "@mui/material";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import AppsIcon from "@mui/icons-material/Apps";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageIcon from "@mui/icons-material/Storage";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";

import ActionCard from "../tiles/ActionCard";

export default function AdvancedPanel() {
  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <SettingsIcon sx={{ color: "#9C27B0" }} />
        <Box>
          <Typography variant="h6" fontWeight={900}>
            Advanced Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Developer tools, cache, widgets and security-related controls.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.10)" }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 2,
        }}
      >
        <ActionCard
          title="Keyboard Shortcuts"
          description="Configure hotkeys"
          color="#2196F3"
          icon={<KeyboardIcon />}
          enabled
        />
        <ActionCard
          title="Widgets"
          description="Enable dashboard widgets"
          color="#4CAF50"
          icon={<AppsIcon />}
          enabled
        />
        <ActionCard
          title="API Access"
          description="Developer settings & tokens"
          color="#9C27B0"
          icon={<SettingsIcon />}
          enabled={false}
        />
        <ActionCard
          title="Cache"
          description="Clear & rebuild app cache"
          color="#FF9800"
          icon={<StorageIcon />}
          enabled
        />
        <ActionCard
          title="Privacy Controls"
          description="Permissions & data visibility"
          color="#00BCD4"
          icon={<PrivacyTipIcon />}
          enabled
        />
        <ActionCard
          title="Storage Tools"
          description="Inspect & cleanup"
          color="#4CAF50"
          icon={<StorageIcon />}
          enabled
        />
      </Box>

      <Typography variant="caption" color="text.secondary">
        Next step: wire these to real endpoints (cache purge, token management,
        permission toggles).
      </Typography>
    </Stack>
  );
}
