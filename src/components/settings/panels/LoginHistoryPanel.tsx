/**
 * @file /security/_components/panels/LoginHistoryPanel.tsx
 * @description Full Login History panel (audit list + filters placeholders)
 */

"use client";

import { Box, Divider, Stack, Typography, Chip } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WarningIcon from "@mui/icons-material/Warning";
import { useSecurity } from "../../../security/_components/SecurityContext";

export default function LoginHistoryPanel() {
  const { state } = useSecurity();

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <HistoryIcon sx={{ color: "#2196F3" }} />
        <Box>
          <Typography variant="h6" fontWeight={900}>
            Login History
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Audit access and investigate suspicious activity.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.10)" }} />

      <Stack spacing={1.2}>
        {state.loginHistory.map((login) => (
          <Box
            key={login.id}
            sx={{
              p: 2,
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.12)",
              bgcolor:
                login.status === "blocked"
                  ? "rgba(255,82,82,0.08)"
                  : "rgba(255,255,255,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor:
                    login.status === "success"
                      ? "rgba(76,175,80,0.2)"
                      : "rgba(255,82,82,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {login.status === "success" ? (
                  <VerifiedUserIcon sx={{ fontSize: 20, color: "#4CAF50" }} />
                ) : (
                  <WarningIcon sx={{ fontSize: 20, color: "#FF5252" }} />
                )}
              </Box>

              <Box>
                <Typography fontWeight={900}>{login.device}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {login.time} • {login.location}
                </Typography>
              </Box>
            </Box>

            <Chip
              label={login.status === "success" ? "Success" : "Blocked"}
              size="small"
              sx={{
                bgcolor:
                  login.status === "success"
                    ? "rgba(76,175,80,0.2)"
                    : "rgba(255,82,82,0.2)",
                color: login.status === "success" ? "#4CAF50" : "#FF5252",
                fontWeight: 900,
              }}
            />
          </Box>
        ))}
      </Stack>

      <Typography variant="caption" color="text.secondary">
        Next step: add filters (date range, location, device) + export audit
        log.
      </Typography>
    </Stack>
  );
}
