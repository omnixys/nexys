/**
 * @file /security/_components/panels/ActiveDevicesPanel.tsx
 * @description Full Active Devices panel with revoke confirmation + undo snackbar
 */

"use client";

import {
  Box,
  Divider,
  Stack,
  Typography,
  Chip,
  Button,
  Snackbar,
} from "@mui/material";
import DevicesIcon from "@mui/icons-material/Devices";
import UndoIcon from "@mui/icons-material/Undo";
import { useMemo, useRef, useState } from "react";

import { useSecurity, DeviceItem } from "../SecurityContext";
import ConfirmDialog from "../modal/ConfirmDialog";

type PendingRevoke = {
  deviceId: number;
  prev: DeviceItem;
};

export default function ActiveDevicesPanel() {
  const { state, setState } = useSecurity();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

  const [snackOpen, setSnackOpen] = useState(false);
  const pendingRef = useRef<PendingRevoke | null>(null);

  const activeCount = useMemo(
    () => state.devices.filter((d) => d.active).length,
    [state.devices],
  );

  const selectedDevice = useMemo(
    () => state.devices.find((d) => d.id === selectedDeviceId) ?? null,
    [state.devices, selectedDeviceId],
  );

  function openConfirm(deviceId: number) {
    setSelectedDeviceId(deviceId);
    setConfirmOpen(true);
  }

  function closeConfirm() {
    setConfirmOpen(false);
  }

  function revokeConfirmed() {
    if (!selectedDevice) {
      setConfirmOpen(false);
      return;
    }

    // Store snapshot for undo.
    pendingRef.current = { deviceId: selectedDevice.id, prev: selectedDevice };

    // Optimistic update: mark inactive.
    setState({
      devices: state.devices.map((d) =>
        d.id === selectedDevice.id
          ? { ...d, active: false, lastActive: "just now" }
          : d,
      ),
    });

    setConfirmOpen(false);
    setSnackOpen(true);
  }

  function handleUndo() {
    const pending = pendingRef.current;
    if (!pending) return;

    setState({
      devices: state.devices.map((d) =>
        d.id === pending.deviceId ? pending.prev : d,
      ),
    });

    pendingRef.current = null;
    setSnackOpen(false);
  }

  function handleSnackClose() {
    // When snackbar closes without undo, we consider the revoke final.
    pendingRef.current = null;
    setSnackOpen(false);
  }

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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {activeCount} active session{activeCount === 1 ? "" : "s"}
        </Typography>
      </Box>

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
                disabled={!device.active}
                onClick={() => openConfirm(device.id)}
                sx={{ borderColor: "rgba(255,255,255,0.22)" }}
              >
                Revoke
              </Button>
            </Box>
          </Box>
        ))}
      </Stack>

      {/* Confirm revoke */}
      <ConfirmDialog
        open={confirmOpen}
        title="Revoke device access?"
        description={
          selectedDevice
            ? `This will invalidate sessions for "${selectedDevice.name}". You can undo for a short time after revoking.`
            : "This will invalidate sessions for the selected device."
        }
        destructive
        confirmText="Revoke"
        cancelText="Cancel"
        onCancel={closeConfirm}
        onConfirm={revokeConfirmed}
      />

      {/* Undo Snackbar */}
      <Snackbar
        open={snackOpen}
        onClose={handleSnackClose}
        autoHideDuration={5000}
        message="Device access revoked"
        action={
          <Button
            size="small"
            startIcon={<UndoIcon />}
            onClick={handleUndo}
            sx={{ color: "#fff", fontWeight: 900 }}
          >
            Undo
          </Button>
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />

      <Typography variant="caption" color="text.secondary">
        Next step: wire revoke to backend session/token invalidation.
      </Typography>
    </Stack>
  );
}
