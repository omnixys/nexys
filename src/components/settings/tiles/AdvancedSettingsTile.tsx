/**
 * @file /settings/_components/tiles/AdvancedSettingsTile.tsx
 * @description Advanced settings tile - opens modal
 */

"use client";

import { Box, Typography } from "@mui/material";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import AppsIcon from "@mui/icons-material/Apps";
import SettingsIcon from "@mui/icons-material/Settings";
import DevicesIcon from "@mui/icons-material/Devices";
import StorageIcon from "@mui/icons-material/Storage";
import { useRouter } from "next/navigation";

import BentoTile from "./BentoTile";
import ActionCard from "./ActionCard";

export default function AdvancedSettingsTile({
  index,
  area,
  focused,
  setFocused,
}: {
  index: number;
  area?: string;
  focused: number | null;
  setFocused: (i: number | null) => void;
}) {
  const router = useRouter();

  return (
    <BentoTile
      index={index}
      area={area}
      focused={focused}
      setFocused={setFocused}
      onClick={() => router.push("/settings/advanced")}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" fontWeight={900} sx={{ mb: 3 }}>
          Advanced Settings
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: 2,
            flex: 1,
          }}
        >
          <ActionCard
            title="Keyboard Shortcuts"
            description="Customize hotkeys"
            color="#2196F3"
            icon={<KeyboardIcon />}
            enabled
          />
          <ActionCard
            title="Widgets"
            description="Dashboard widgets"
            color="#4CAF50"
            icon={<AppsIcon />}
            enabled
          />
          <ActionCard
            title="Multi-Factor Authentication"
            description="TOTP, Passkeys, Backup Codes"
            color="#9C27B0"
            icon={<SettingsIcon />}
            enabled={false}
          />
          <ActionCard
            title="Devices"
            description="Trusted & remembered devices"
            color="#00BCD4"
            icon={<DevicesIcon />}
            enabled
          />
          <ActionCard
            title="Cache"
            description="Clear app cache"
            color="#FF9800"
            icon={<StorageIcon />}
            enabled
          />
        </Box>
      </Box>
    </BentoTile>
  );
}
