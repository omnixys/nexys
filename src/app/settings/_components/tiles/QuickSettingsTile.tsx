/**
 * @file /settings/_components/tiles/QuickSettingsTile.tsx
 * @description Quick toggle tile (summary switches)
 */

"use client";

import { Box, Switch, Typography, alpha } from "@mui/material";
import { useSettings } from "../SettingsContext";
import BentoTile from "./BentoTile";

export default function QuickSettingsTile({
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
  const { state, setState } = useSettings();

  const quick = [
    {
      id: "darkMode",
      label: "Dark Mode",
      enabled: state.darkMode,
      toggle: () => setState({ darkMode: !state.darkMode }),
    },
    {
      id: "autoBackup",
      label: "Auto Backup",
      enabled: state.autoBackup,
      toggle: () => setState({ autoBackup: !state.autoBackup }),
    },
    {
      id: "familySharing",
      label: "Family Sharing",
      enabled: state.familySharing,
      toggle: () => setState({ familySharing: !state.familySharing }),
    },
    {
      id: "emailNotifications",
      label: "Email Notifications",
      enabled: true,
      toggle: () => {},
    },
    {
      id: "pushNotifications",
      label: "Push Notifications",
      enabled: true,
      toggle: () => {},
    },
    {
      id: "smsNotifications",
      label: "SMS Notifications",
      enabled: false,
      toggle: () => {},
    },
  ];

  return (
    <BentoTile
      index={index}
      area={area}
      focused={focused}
      setFocused={setFocused}
    >
      <Box sx={{ width: "100%", height: "100%", p: 3 }}>
        <Typography variant="h6" fontWeight={900} sx={{ mb: 3 }}>
          Quick Settings
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {quick.map((s) => (
            <Box
              key={s.id}
              onClick={(e) => {
                e.stopPropagation();
                s.toggle();
              }}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "all 0.2s",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.08)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Typography variant="body2" fontWeight={700}>
                {s.label}
              </Typography>

              <Switch
                size="small"
                checked={s.enabled}
                onChange={(e) => {
                  e.stopPropagation();
                  s.toggle();
                }}
                sx={{
                  "& .MuiSwitch-track": {
                    bgcolor: s.enabled
                      ? alpha("#4CAF50", 0.5)
                      : alpha("#757575", 0.5),
                  },
                  "& .MuiSwitch-thumb": {
                    bgcolor: s.enabled ? "#4CAF50" : "#757575",
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </BentoTile>
  );
}
