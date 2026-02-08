/**
 * @file /settings/_components/tiles/DataManagementTile.tsx
 * @description Data management tile (storage + backup summary) - opens modal
 */

"use client";

import { Box, Chip, IconButton, Typography, alpha } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/navigation";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import BentoTile from "./BentoTile";
import { useSettings } from "../SettingsContext";

const storageData = [
  { name: "Used", value: 65, color: "#2196F3" },
  { name: "Available", value: 35, color: "#4CAF50" },
];

export default function DataManagementTile({
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
  const { state, setState } = useSettings();

  return (
    <BentoTile
      index={index}
      area={area}
      focused={focused}
      setFocused={setFocused}
      heavy={heavy}
      onClick={() => router.push("/settings/data")}
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
            <StorageIcon sx={{ color: "#4CAF50" }} />
            <Typography variant="h6" fontWeight={900}>
              Data Management
            </Typography>
          </Box>

          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <CloudIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 3,
            flex: 1,
          }}
        >
          {/* Storage */}
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(33,150,243,0.15) 0%, rgba(0,188,212,0.10) 100%)",
              border: "1px solid rgba(33,150,243,0.30)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 200,
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>
                Storage
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                2.8 GB of 4.3 GB used
              </Typography>

              <Box sx={{ width: 110, height: 110, mb: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={storageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={34}
                      outerRadius={50}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {storageData.map((entry, i) => (
                        <Cell key={`cell-${i}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Box>

            <Chip
              label="65% used"
              size="small"
              sx={{ bgcolor: "rgba(255,255,255,0.10)", fontWeight: 800 }}
            />
          </Box>

          {/* Backup */}
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(76,175,80,0.15) 0%, rgba(139,195,74,0.10) 100%)",
              border: "1px solid rgba(76,175,80,0.30)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 200,
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>
                Backup
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Last backup: 2 hours ago
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 800 }}
              >
                Frequency
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
                <Chip
                  label="Daily"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setState({ autoBackup: true });
                  }}
                  sx={{
                    bgcolor: state.autoBackup
                      ? alpha("#4CAF50", 0.2)
                      : "rgba(255,255,255,0.05)",
                    color: state.autoBackup ? "#4CAF50" : "text.secondary",
                    cursor: "pointer",
                    fontWeight: 800,
                  }}
                />
                <Chip
                  label="Weekly"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setState({ autoBackup: false });
                  }}
                  sx={{
                    bgcolor: !state.autoBackup
                      ? alpha("#4CAF50", 0.2)
                      : "rgba(255,255,255,0.05)",
                    color: !state.autoBackup ? "#4CAF50" : "text.secondary",
                    cursor: "pointer",
                    fontWeight: 800,
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Chip
                icon={<CheckCircleIcon />}
                label="Encrypted"
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.10)", fontWeight: 800 }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 800 }}
              >
                Cloud sync
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </BentoTile>
  );
}
