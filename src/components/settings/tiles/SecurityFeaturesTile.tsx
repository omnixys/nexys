/**
 * @file /security/_components/tiles/SecurityFeaturesTile.tsx
 * @description Security features tile (summary) - opens modal
 */

"use client";

import { Box, Chip, Typography, alpha } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/navigation";
import BentoTile from "./BentoTile";
import { useSecurity } from "@/components/security/SecurityContext";

export default function SecurityFeaturesTile({
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
  const { state } = useSecurity();

  return (
    <BentoTile
      index={index}
      area={area}
      focused={focused}
      setFocused={setFocused}
      onClick={() => router.push("/security/features")}
    >
      <Box sx={{ width: "100%", height: "100%", p: 3 }}>
        <Typography variant="h6" fontWeight={900} sx={{ mb: 3 }}>
          Security Features
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {state.features.map((feature) => (
            <Box
              key={feature.id}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="body2" fontWeight={800} sx={{ mb: 0.5 }}>
                  {feature.name}
                </Typography>

                <Chip
                  label={feature.priority}
                  size="small"
                  sx={{
                    bgcolor:
                      feature.priority === "high"
                        ? alpha("#FF5252", 0.2)
                        : feature.priority === "medium"
                          ? alpha("#FF9800", 0.2)
                          : alpha("#9E9E9E", 0.2),
                    color:
                      feature.priority === "high"
                        ? "#FF5252"
                        : feature.priority === "medium"
                          ? "#FF9800"
                          : "#9E9E9E",
                    fontWeight: 900,
                    fontSize: "0.7rem",
                  }}
                />
              </Box>

              {feature.enabled ? (
                <CheckCircleIcon sx={{ color: "#4CAF50" }} />
              ) : (
                <CancelIcon sx={{ color: "#FF5252" }} />
              )}
            </Box>
          ))}
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 2, display: "block" }}
        >
          Open to enable/disable and view recommendations.
        </Typography>
      </Box>
    </BentoTile>
  );
}
