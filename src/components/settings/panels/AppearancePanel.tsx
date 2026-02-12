/**
 * @file /settings/_components/panels/AppearancePanel.tsx
 * @description Full Appearance settings panel (used by modal and fallback route)
 */

"use client";

import {
  Box,
  Chip,
  Divider,
  FormControlLabel,
  Slider,
  Stack,
  Switch,
  Typography,
  alpha,
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import { useSettings } from "../SettingsContext";

export default function AppearancePanel() {
  const { state, setState } = useSettings();

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <PaletteIcon sx={{ color: "#9C27B0" }} />
        <Box>
          <Typography variant="h6" fontWeight={800}>
            Appearance
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Theme, typography and UI density.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.10)" }} />

      <Box>
        <Typography fontWeight={700} sx={{ mb: 1 }}>
          Theme
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            label="Light"
            clickable
            onClick={() => setState({ darkMode: false })}
            sx={{
              bgcolor: !state.darkMode
                ? alpha("#2196F3", 0.22)
                : "rgba(255,255,255,0.06)",
              border: `1px solid ${!state.darkMode ? alpha("#2196F3", 0.6) : "rgba(255,255,255,0.12)"}`,
            }}
          />
          <Chip
            label="Dark"
            clickable
            onClick={() => setState({ darkMode: true })}
            sx={{
              bgcolor: state.darkMode
                ? alpha("#9C27B0", 0.22)
                : "rgba(255,255,255,0.06)",
              border: `1px solid ${state.darkMode ? alpha("#9C27B0", 0.6) : "rgba(255,255,255,0.12)"}`,
            }}
          />
          <Chip
            label="System (coming soon)"
            disabled
            sx={{ bgcolor: "rgba(255,255,255,0.04)" }}
          />
        </Box>
      </Box>

      <Box>
        <Typography fontWeight={700} sx={{ mb: 1 }}>
          Font Size
        </Typography>

        <Box sx={{ px: 1 }}>
          <Slider
            value={state.fontSize}
            onChange={(_, v) => setState({ fontSize: v as number })}
            min={12}
            max={28}
            step={1}
          />
          <Typography variant="caption" color="text.secondary">
            Current: {state.fontSize}px
          </Typography>
        </Box>
      </Box>

      <Box>
        <Typography fontWeight={700} sx={{ mb: 1 }}>
          UI Preferences
        </Typography>

        <Stack spacing={1.5}>
          <FormControlLabel
            control={<Switch checked={true} onChange={() => {}} />}
            label="Reduce motion (coming soon)"
          />

          <FormControlLabel
            control={<Switch checked={true} onChange={() => {}} />}
            label="High contrast (coming soon)"
          />

          <FormControlLabel
            control={<Switch checked={false} onChange={() => {}} />}
            label="Compact density (coming soon)"
          />
        </Stack>
      </Box>
    </Stack>
  );
}
