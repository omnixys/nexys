/**
 * @file /security/_components/panels/AuthenticationPanel.tsx
 * @description Full Authentication methods panel (2FA + biometrics placeholders)
 */

"use client";

import { Box, Divider, Stack, Typography, Chip, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

export default function AuthenticationPanel() {
  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <LockIcon sx={{ color: "#2196F3" }} />
        <Box>
          <Typography variant="h6" fontWeight={900}>
            Authentication Methods
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage 2FA, biometrics and recovery options.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.10)" }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 2,
        }}
      >
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.12)",
            bgcolor: "rgba(255,255,255,0.04)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <LockIcon sx={{ color: "#2196F3" }} />
              <Typography fontWeight={900}>
                Two-Factor Authentication
              </Typography>
            </Box>
            <Chip
              label="Enabled"
              size="small"
              sx={{
                bgcolor: "rgba(76,175,80,0.2)",
                color: "#4CAF50",
                fontWeight: 900,
              }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Authenticator-based 2FA is active.
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
            <Button
              size="small"
              variant="outlined"
              sx={{ borderColor: "rgba(255,255,255,0.22)" }}
            >
              Regenerate codes
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={{ borderColor: "rgba(255,255,255,0.22)" }}
            >
              Change method
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.12)",
            bgcolor: "rgba(255,255,255,0.04)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <FingerprintIcon sx={{ color: "#9C27B0" }} />
              <Typography fontWeight={900}>Biometric Login</Typography>
            </Box>
            <Chip
              label="Enabled"
              size="small"
              sx={{
                bgcolor: "rgba(76,175,80,0.2)",
                color: "#4CAF50",
                fontWeight: 900,
              }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Face ID / Touch ID registered on supported devices.
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
            <Button
              size="small"
              variant="outlined"
              sx={{ borderColor: "rgba(255,255,255,0.22)" }}
            >
              Re-enroll
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={{ borderColor: "rgba(255,255,255,0.22)" }}
            >
              Disable
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.12)",
          bgcolor: "rgba(255,255,255,0.04)",
        }}
      >
        <Typography fontWeight={900} sx={{ mb: 0.5 }}>
          Recovery
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add backup email/phone and generate recovery codes (backend wiring
          pending).
        </Typography>
      </Box>
    </Stack>
  );
}
