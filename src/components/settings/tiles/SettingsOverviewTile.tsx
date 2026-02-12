/**
 * @file /settings/_components/tiles/SettingsOverviewTile.tsx
 * @description Overview tile with category shortcuts (opens modals)
 */

"use client";

import { Box, Chip, Typography, alpha } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import PaletteIcon from "@mui/icons-material/Palette";
import LanguageIcon from "@mui/icons-material/Language";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StorageIcon from "@mui/icons-material/Storage";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import { useRouter } from "next/navigation";

import BentoTile from "./BentoTile";

const categories = [
  {
    id: "appearance",
    name: "Appearance",
    icon: <PaletteIcon />,
    count: 4,
    color: "#9C27B0",
    href: "/settings/appearance",
  },
  {
    id: "language",
    name: "Language",
    icon: <LanguageIcon />,
    count: 2,
    color: "#2196F3",
    href: "/settings/language",
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: <NotificationsIcon />,
    count: 8,
    color: "#FF9800",
    href: "/settings/notifications",
  },
  {
    id: "data",
    name: "Data",
    icon: <StorageIcon />,
    count: 6,
    color: "#4CAF50",
    href: "/settings/data",
  },
  {
    id: "privacy",
    name: "Privacy",
    icon: <PrivacyTipIcon />,
    count: 5,
    color: "#00BCD4",
    href: "/settings/advanced",
  },
  {
    id: "family",
    name: "Family",
    icon: <FamilyRestroomIcon />,
    count: 3,
    color: "#E91E63",
    href: "/settings/advanced",
  },
];

export default function SettingsOverviewTile({
  index,
  area,
  focused,
  setFocused,
  heavy,
}: {
  index: number;
  area?: string;
  focused: number | null;
  setFocused: (i: number | null) => void;
  heavy?: boolean;
}) {
  const router = useRouter();

  return (
    <BentoTile
      index={index}
      area={area}
      focused={focused}
      setFocused={setFocused}
      heavy={heavy}
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SettingsIcon sx={{ fontSize: 28, color: "#fff" }} />
            </Box>

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 800, letterSpacing: 0.6 }}
              >
                SETTINGS OVERVIEW
              </Typography>

              <Typography
                variant="h2"
                fontWeight={900}
                sx={{
                  background:
                    "linear-gradient(90deg, #9C27B0 0%, #673AB7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: -0.8,
                  lineHeight: 1.05,
                }}
              >
                28 Settings
              </Typography>
            </Box>
          </Box>

          <Chip
            label="95% Configured"
            sx={{
              bgcolor: alpha("#4CAF50", 0.2),
              color: "#4CAF50",
              fontWeight: 800,
              fontSize: "0.875rem",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: 2,
            flex: 1,
            alignContent: "start",
          }}
        >
          {categories.map((c) => (
            <Box
              key={c.id}
              onClick={(e) => {
                e.stopPropagation();
                router.push(c.href);
              }}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: alpha(c.color, 0.1),
                border: `1px solid ${alpha(c.color, 0.2)}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: alpha(c.color, 0.15),
                  transform: "translateY(-3px)",
                },
              }}
            >
              <Box sx={{ color: c.color, mb: 1 }}>{c.icon}</Box>
              <Typography variant="body2" fontWeight={800} sx={{ mb: 0.5 }}>
                {c.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {c.count} options
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </BentoTile>
  );
}
