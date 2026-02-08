/**
 * @file /security/_components/tiles/LoginHistoryTile.tsx
 * @description Login history tile (scroll list summary) - opens modal
 */

"use client";

import { Box, Chip, IconButton, Typography } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import RefreshIcon from "@mui/icons-material/Refresh";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WarningIcon from "@mui/icons-material/Warning";
import { useRouter } from "next/navigation";

import BentoTile from "./BentoTile";
import { useSecurity } from "../../../security/_components/SecurityContext";

export default function LoginHistoryTile({
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
      onClick={() => router.push("/security/history")}
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
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <HistoryIcon sx={{ color: "#2196F3" }} />
            <Typography variant="h6" fontWeight={900}>
              Login History
            </Typography>
          </Box>

          <IconButton
            size="small"
            onClick={(e) => e.stopPropagation()}
            aria-label="Refresh"
          >
            <RefreshIcon />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
          {state.loginHistory.map((login) => (
            <Box
              key={login.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                mb: 1,
                borderRadius: 2,
                bgcolor:
                  login.status === "blocked"
                    ? "rgba(255,82,82,0.10)"
                    : "rgba(255,255,255,0.05)",
                border: "1px solid",
                borderColor:
                  login.status === "blocked"
                    ? "rgba(255,82,82,0.30)"
                    : "rgba(255,255,255,0.10)",
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
                  <Typography variant="body2" fontWeight={800}>
                    {login.device}
                  </Typography>
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
        </Box>
      </Box>
    </BentoTile>
  );
}
