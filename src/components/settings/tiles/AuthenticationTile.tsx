/**
 * @file /security/_components/tiles/AuthenticationTile.tsx
 * @description Authentication methods tile (summary cards) - opens modal
 */

"use client";

import { Box, Chip, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { useRouter } from "next/navigation";

import BentoTile from "./BentoTile";

export default function AuthenticationTile({
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

  return (
    <BentoTile
      index={index}
      area={area}
      focused={focused}
      setFocused={setFocused}
      heavy={heavy}
      onClick={() => router.push("/security/auth")}
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
        <Typography variant="h6" fontWeight={900} sx={{ mb: 3 }}>
          Authentication Methods
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 3,
            flex: 1,
          }}
        >
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
              minHeight: 180,
            }}
          >
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    bgcolor: "rgba(33,150,243,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LockIcon sx={{ color: "#2196F3" }} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={900}>
                    2FA
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Two-Factor Authentication
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" sx={{ mb: 2 }}>
                Add an extra layer of security to your account.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Chip
                label="Enabled"
                sx={{
                  bgcolor: "rgba(76,175,80,0.2)",
                  color: "#4CAF50",
                  fontWeight: 900,
                }}
              />
              <Typography variant="caption" color="text.secondary">
                via Authenticator
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(156,39,176,0.15) 0%, rgba(233,30,99,0.10) 100%)",
              border: "1px solid rgba(156,39,176,0.30)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 180,
            }}
          >
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    bgcolor: "rgba(156,39,176,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FingerprintIcon sx={{ color: "#9C27B0" }} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={900}>
                    Biometric
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Face ID / Touch ID
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" sx={{ mb: 2 }}>
                Fast and secure login with biometrics.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Chip
                label="Enabled"
                sx={{
                  bgcolor: "rgba(76,175,80,0.2)",
                  color: "#4CAF50",
                  fontWeight: 900,
                }}
              />
              <Typography variant="caption" color="text.secondary">
                Face ID active
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </BentoTile>
  );
}
