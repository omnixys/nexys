/**
 * @file /settings/_components/tiles/AppearanceTile.tsx
 * @description Appearance tile summary - opens modal on click
 */

"use client";

import {
  Box,
  Chip,
  IconButton,
  Slider,
  Typography,
  alpha,
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { useRouter } from "next/navigation";

import BentoTile from "./BentoTile";
import { useSettings } from "../SettingsContext";

export default function AppearanceTile({
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

  return (
    <BentoTile
      index={index}
      area={area}
      focused={focused}
      setFocused={setFocused}
      onClick={() => router.push("/settings/appearance")}
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
            <PaletteIcon sx={{ color: "#9C27B0" }} />
            <Typography variant="h6" fontWeight={700}>
              Appearance
            </Typography>
          </Box>

          <IconButton size="small" onClick={(e) => e.stopPropagation()}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
            Theme
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              bgcolor: "rgba(255,255,255,0.05)",
              borderRadius: 2,
              p: 1,
            }}
          >
            <Box
              onClick={(e) => {
                e.stopPropagation();
                setState({ darkMode: false });
              }}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 2,
                bgcolor: !state.darkMode
                  ? alpha("#2196F3", 0.2)
                  : "transparent",
                border: `1px solid ${!state.darkMode ? "#2196F3" : "rgba(255,255,255,0.1)"}`,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <Typography variant="caption" fontWeight={500}>
                Light
              </Typography>
            </Box>

            <Box
              onClick={(e) => {
                e.stopPropagation();
                setState({ darkMode: true });
              }}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 2,
                bgcolor: state.darkMode ? alpha("#9C27B0", 0.2) : "transparent",
                border: `1px solid ${state.darkMode ? "#9C27B0" : "rgba(255,255,255,0.1)"}`,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <Typography variant="caption" fontWeight={500}>
                Dark
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography variant="body2" fontWeight={500}>
              Font Size
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {state.fontSize}px
            </Typography>
          </Box>

          <Slider
            value={state.fontSize}
            onChange={(_, v) => setState({ fontSize: v as number })}
            min={12}
            max={24}
            step={1}
            onClick={(e) => e.stopPropagation()}
            sx={{
              color: "#9C27B0",
              "& .MuiSlider-track": { bgcolor: "#9C27B0" },
              "& .MuiSlider-thumb": { bgcolor: "#9C27B0" },
            }}
          />
        </Box>

        <Box sx={{ mt: "auto" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography variant="body2" fontWeight={500}>
              Interface Zoom
            </Typography>
            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
              <ZoomInIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {[100, 110, 125, 150].map((percent) => (
              <Chip
                key={percent}
                label={`${percent}%`}
                size="small"
                onClick={(e) => e.stopPropagation()}
                sx={{
                  bgcolor:
                    percent === 100
                      ? alpha("#9C27B0", 0.2)
                      : "rgba(255,255,255,0.05)",
                  color: percent === 100 ? "#9C27B0" : "text.secondary",
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </BentoTile>
  );
}
