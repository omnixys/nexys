/**
 * @file /security/_components/panels/SecurityFeaturesPanel.tsx
 * @description Full Security Features panel with toggles
 */

"use client";

import {
  Box,
  Divider,
  Stack,
  Switch,
  Typography,
  Chip,
  alpha,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSecurity } from "../../security/SecurityContext";

export default function SecurityFeaturesPanel() {
  const { state, setFeatureEnabled } = useSecurity();

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <SecurityIcon sx={{ color: "#2196F3" }} />
        <Box>
          <Typography variant="h6" fontWeight={900}>
            Security Features
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enable/disable protections and see priority-driven suggestions.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.10)" }} />

      <Stack spacing={1.5}>
        {state.features.map((feature) => (
          <Box
            key={feature.id}
            sx={{
              p: 2,
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.12)",
              bgcolor: "rgba(255,255,255,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {feature.enabled ? (
                <CheckCircleIcon sx={{ color: "#4CAF50" }} />
              ) : (
                <CancelIcon sx={{ color: "#FF5252" }} />
              )}

              <Box>
                <Typography fontWeight={900}>{feature.name}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    mt: 0.5,
                    flexWrap: "wrap",
                  }}
                >
                  <Chip
                    label={feature.priority.toUpperCase()}
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
                  <Typography variant="caption" color="text.secondary">
                    {feature.enabled ? "Active" : "Inactive"}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Switch
              checked={feature.enabled}
              onChange={(e) => setFeatureEnabled(feature.id, e.target.checked)}
            />
          </Box>
        ))}
      </Stack>

      <Box
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.12)",
          bgcolor: "rgba(255,255,255,0.04)",
        }}
      >
        <Typography fontWeight={900} sx={{ mb: 0.5 }}>
          Recommendation
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enable “Session Timeout” and “Device Approval” to reduce account
          takeover risk.
        </Typography>
      </Box>
    </Stack>
  );
}
