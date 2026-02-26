/**
 * @file /security/_components/panels/ActiveDevicesPanel.tsx
 * @description Full Active Devices panel (session review + revoke placeholders)
 */

"use client";

import { Box, Divider, Stack, Typography, Chip, Button } from "@mui/material";
import DevicesIcon from "@mui/icons-material/Devices";
import { useSecurity } from "../../security/SecurityContext";


export default function ActiveDevicesPanel() {
  const { state, setState } = useSecurity();

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <DevicesIcon sx={{ color: "#2196F3" }} />
        <Box>
          <Typography variant="h6" fontWeight={900}>
            Active Devices
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Review device sessions and revoke access.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.10)" }} />

      <Stack spacing={1.2}>
        {state.devices.map((device) => (
          <Box
            key={device.id}
            sx={{
              p: 2,
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.12)",
              bgcolor: device.active
                ? "rgba(33,150,243,0.08)"
                : "rgba(255,255,255,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography fontWeight={900}>{device.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {device.type} • {device.location} • last active{" "}
                {device.lastActive}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Chip
                label={device.active ? "Active" : "Inactive"}
                size="small"
                sx={{
                  bgcolor: device.active
                    ? "rgba(76,175,80,0.2)"
                    : "rgba(255,82,82,0.2)",
                  color: device.active ? "#4CAF50" : "#FF5252",
                  fontWeight: 900,
                }}
              />

              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  // Simulate revoke by marking inactive
                  setState({
                    devices: state.devices.map((d) =>
                      d.id === device.id
                        ? { ...d, active: false, lastActive: "just now" }
                        : d,
                    ),
                  });
                }}
                sx={{ borderColor: "rgba(255,255,255,0.22)" }}
              >
                Revoke
              </Button>
            </Box>
          </Box>
        ))}
      </Stack>

      <Typography variant="caption" color="text.secondary">
        Next step: wire revoke to backend session/token invalidation.
      </Typography>
    </Stack>
  );
}
