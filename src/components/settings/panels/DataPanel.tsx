/**
 * @file /settings/_components/panels/DataPanel.tsx
 * @description Full Data Management settings panel
 */

"use client";

import { Box, Divider, Stack, Typography, Chip, alpha } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useSettings } from "../SettingsContext";

const storageData = [
  { name: "Used", value: 65, color: "#2196F3" },
  { name: "Available", value: 35, color: "#4CAF50" },
];

export default function DataPanel() {
  const { state, setState } = useSettings();

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <StorageIcon sx={{ color: "#4CAF50" }} />
        <Box>
          <Typography variant="h6" fontWeight={900}>
            Data Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Storage usage, backup policies and data retention.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.10)" }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.12)",
            bgcolor: "rgba(255,255,255,0.04)",
          }}
        >
          <Typography fontWeight={900} sx={{ mb: 1 }}>
            Storage
          </Typography>

          <Typography variant="body2" color="text.secondary">
            2.8 GB of 4.3 GB used
          </Typography>

          <Box sx={{ width: "100%", height: 160, mt: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={storageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  dataKey="value"
                >
                  {storageData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
            <Chip label="Manage storage" clickable />
            <Chip label="Export data" clickable />
            <Chip label="Delete inactive" clickable />
          </Box>
        </Box>

        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.12)",
            bgcolor: "rgba(255,255,255,0.04)",
          }}
        >
          <Typography fontWeight={900} sx={{ mb: 1 }}>
            Backup
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Last backup: 2 hours ago
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 2, fontWeight: 900 }}
          >
            Frequency
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
            <Chip
              label="Daily"
              clickable
              onClick={() => setState({ autoBackup: true })}
              sx={{
                bgcolor: state.autoBackup
                  ? alpha("#4CAF50", 0.2)
                  : "rgba(255,255,255,0.06)",
                color: state.autoBackup ? "#4CAF50" : "text.secondary",
                fontWeight: 900,
              }}
            />
            <Chip
              label="Weekly"
              clickable
              onClick={() => setState({ autoBackup: false })}
              sx={{
                bgcolor: !state.autoBackup
                  ? alpha("#4CAF50", 0.2)
                  : "rgba(255,255,255,0.06)",
                color: !state.autoBackup ? "#4CAF50" : "text.secondary",
                fontWeight: 900,
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
            <Chip
              icon={<CheckCircleIcon />}
              label="Encrypted"
              size="small"
              sx={{ bgcolor: "rgba(255,255,255,0.10)", fontWeight: 900 }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 900 }}
            >
              Cloud sync enabled
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
            <Chip label="Run backup now" clickable />
            <Chip label="View backup history" clickable />
            <Chip label="Retention policy" clickable />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
