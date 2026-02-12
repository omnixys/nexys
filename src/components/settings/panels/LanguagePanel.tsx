/**
 * @file /settings/_components/panels/LanguagePanel.tsx
 * @description Full Language & Region settings panel
 */

"use client";

import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useSettings } from "../SettingsContext";
import { useTranslations } from "next-intl";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
];

const currencies = ["USD", "EUR", "GBP", "CHF", "JPY"];

export default function LanguagePanel() {
  const { state, setState } = useSettings();
    const tSettings = useTranslations("settings");
  

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <LanguageIcon sx={{ color: "#2196F3" }} />
        <Box>
          <Typography variant="h6" fontWeight={900}>
            {tSettings("tiles.language")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tSettings("subtitle")}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.10)" }} />

      <Box>
        <Typography fontWeight={900} sx={{ mb: 1 }}>
          {tSettings("labels.language")}
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={state.language}
            onChange={(e) => setState({ language: e.target.value })}
          >
            {languages.map((l) => (
              <MenuItem key={l.code} value={l.code}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                  <Typography variant="body1">{l.flag}</Typography>
                  <Typography variant="body2" fontWeight={800}>
                    {l.name}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Typography fontWeight={900} sx={{ mb: 1 }}>
          {tSettings("labels.currency")}
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={state.currency}
            onChange={(e) => setState({ currency: e.target.value })}
          >
            {currencies.map((c) => (
              <MenuItem key={c} value={c}>
                <Typography variant="body2" fontWeight={900}>
                  {c}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Typography fontWeight={900} sx={{ mb: 1 }}>
          {tSettings("labels.regionFormat")}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip label="Europe (DE)" clickable />
          <Chip label="24-hour time" clickable />
          <Chip label="Metric units" clickable />
          <Chip label="Decimal comma" clickable />
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block" }}
        >
          These toggles can be wired to Intl formatting later
          (number/date/time).
        </Typography>
      </Box>
    </Stack>
  );
}
