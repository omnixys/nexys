/**
 * @file /security/_components/tiles/ActiveDevicesTile.tsx
 * @description Active devices tile (scroll list summary) - opens modal
 */

"use client";

import { Box, IconButton, Typography } from "@mui/material";
import DevicesIcon from "@mui/icons-material/Devices";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import BentoTile from "./BentoTile";
import { useSecurity } from "@/components/security/SecurityContext";

export default function ActiveDevicesTile({
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

  const activeCount = state.devices.filter((d) => d.active).length;

  return (
    <BentoTile
      index={index}
      area={area}
      focused={focused}
      setFocused={setFocused}
      onClick={() => router.push("/security/devices")}
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
            <DevicesIcon sx={{ color: "#2196F3" }} />
            <Typography variant="h6" fontWeight={900}>
              Active Devices
            </Typography>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 900 }}
          >
            {activeCount} active
          </Typography>
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
          {state.devices.map((device) => (
            <Box
              key={device.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                mb: 1,
                borderRadius: 2,
                bgcolor: device.active
                  ? "rgba(33,150,243,0.10)"
                  : "rgba(255,255,255,0.05)",
                border: "1px solid",
                borderColor: device.active
                  ? "rgba(33,150,243,0.30)"
                  : "rgba(255,255,255,0.10)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: device.active
                      ? "rgba(33,150,243,0.2)"
                      : "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DevicesIcon
                    sx={{
                      fontSize: 20,
                      color: device.active
                        ? "#2196F3"
                        : "rgba(255,255,255,0.5)",
                    }}
                  />
                </Box>

                <Box>
                  <Typography variant="body2" fontWeight={800}>
                    {device.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {device.type} • {device.location}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: device.active ? "#4CAF50" : "#FF5252",
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {device.lastActive}
                </Typography>
                <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                  <MoreVertIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </BentoTile>
  );
}
