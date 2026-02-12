/**
 * @file /settings/_components/tiles/LanguageTile.tsx
 * @description Language & Region tile (summary) - opens modal
 */

"use client";

import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LanguageIcon from "@mui/icons-material/Language";
import { useRouter } from "next/navigation";

import BentoTile from "./BentoTile";
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

export default function LanguageTile({
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
  const { state, setState } = useSettings();
    const tSettings = useTranslations("settings");
  

  return (
    <BentoTile
      index={index}
      area={area}
      focused={focused}
      setFocused={setFocused}
      onClick={() => router.push("/settings/language")}
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <LanguageIcon sx={{ color: "#2196F3" }} />
            <Typography variant="h6" fontWeight={900}>
              {tSettings("tiles.language")}
            </Typography>
          </Box>

          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" fontWeight={800} sx={{ mb: 1 }}>
            {tSettings("labels.language")}
          </Typography>

          <FormControl
            fullWidth
            size="small"
            onClick={(e) => e.stopPropagation()}
          >
            <Select
              value={state.language}
              onChange={(e) => setState({ language: e.target.value })}
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
                "& .MuiSelect-select": {
                  py: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                },
              }}
            >
              {languages.map((l) => (
                <MenuItem key={l.code} value={l.code}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                    <Typography variant="body1">{l.flag}</Typography>
                    <Typography variant="body2" fontWeight={700}>
                      {l.name}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" fontWeight={800} sx={{ mb: 1 }}>
            {tSettings("labels.currency")}
          </Typography>

          <FormControl
            fullWidth
            size="small"
            onClick={(e) => e.stopPropagation()}
          >
            <Select
              value={state.currency}
              onChange={(e) => setState({ currency: e.target.value })}
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
                "& .MuiSelect-select": { py: 1 },
              }}
            >
              {currencies.map((c) => (
                <MenuItem key={c} value={c}>
                  <Typography variant="body2" fontWeight={800}>
                    {c}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mt: "auto" }}>
          <Typography variant="caption" color="text.secondary">
            {tSettings("labels.regionFormat")}
          </Typography>
        </Box>
      </Box>
    </BentoTile>
  );
}
