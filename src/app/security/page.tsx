/**
 * @file /security/page.tsx
 * @description Security dashboard – Bento Grid layout
 */

"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { JSX, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import LayoutShell from "@/components/home/layout/LayoutShell";
import DepthBlurLayer from "@/components/home/DepthBlurLayer";
import BentoTile from "@/components/home/BentoTile";
import { useAuth } from "@/providers/AuthProvider";

/* =====================================================
   STAGGER CONFIG
===================================================== */

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

export default function SecurityPage(): JSX.Element {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const [focused, setFocused] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey((k) => k + 1);
    setFocused(null);
  }, [pathname]);

  return (
    <LayoutShell user={user} loading={loading}>
      <Container
        maxWidth={false}
        sx={{ maxWidth: 1440, mx: "auto", px: 4, py: 4 }}
      >
        {/* ============================== */}
        {/* HEADLINE */}
        {/* ============================== */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" fontWeight={800}>
            Account security & access
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Control how your account is protected and accessed.
          </Typography>
        </Box>

        <DepthBlurLayer active={focused !== null} />

        {/* ============================== */}
        {/* BENTO GRID */}
        {/* ============================== */}
        <Box
          key={animationKey}
          component={motion.div}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "180px 220px 220px",
            gap: 3,
            position: "relative",
            zIndex: 1300,
          }}
        >
          {/* ============================== */}
          {/* SECURITY OVERVIEW – HERO */}
          {/* ============================== */}
          <BentoTile
            index={0}
            area="1 / 1 / span 1 / span 12"
            focused={focused}
            setFocused={setFocused}
            heavy
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight={700}>
                Security status
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Overall protection level of your account
              </Typography>

              <Typography variant="h2" fontWeight={800} color="success.main">
                98 / 100
              </Typography>

              <Typography variant="body2" color="text.secondary">
                No critical issues detected
              </Typography>
            </Box>
          </BentoTile>

          {/* ============================== */}
          {/* AUTHENTICATION */}
          {/* ============================== */}
          <BentoTile
            index={1}
            area="2 / 1 / span 1 / span 4"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ p: 3 }}>
              <Typography fontWeight={700}>Authentication</Typography>
              <Typography variant="body2" color="text.secondary">
                Password, passkeys & MFA
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">✔ Password set</Typography>
                <Typography variant="body2">✔ Passkey enabled</Typography>
                <Typography variant="body2">✔ MFA active</Typography>
              </Box>

              <Button sx={{ mt: 2 }} variant="outlined">
                Manage MFA
              </Button>

              <Button sx={{ mt: 2 }} variant="contained">
                Create passkey
              </Button>
            </Box>
          </BentoTile>

          {/* ============================== */}
          {/* SESSIONS */}
          {/* ============================== */}
          <BentoTile
            index={2}
            area="2 / 5 / span 1 / span 4"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ p: 3 }}>
              <Typography fontWeight={700}>Active sessions</Typography>
              <Typography variant="body2" color="text.secondary">
                Currently signed-in devices
              </Typography>

              <Typography variant="h4" fontWeight={700} sx={{ mt: 2 }}>
                2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last activity: 5 minutes ago
              </Typography>
            </Box>
          </BentoTile>

          {/* ============================== */}
          {/* DEVICES */}
          {/* ============================== */}
          <BentoTile
            index={3}
            area="2 / 9 / span 1 / span 4"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ p: 3 }}>
              <Typography fontWeight={700}>Trusted devices</Typography>
              <Typography variant="body2" color="text.secondary">
                Devices you approved
              </Typography>

              <Typography variant="h4" fontWeight={700} sx={{ mt: 2 }}>
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last added: MacBook Pro
              </Typography>
            </Box>
          </BentoTile>

          {/* ============================== */}
          {/* AUDIT / LOGIN HISTORY */}
          {/* ============================== */}
          <BentoTile
            index={4}
            area="3 / 1 / span 1 / span 8"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ p: 3 }}>
              <Typography fontWeight={700}>Security activity</Typography>

              <AuditRow
                severity="INFO"
                label="Login successful"
                meta="Germany · Chrome · Today"
              />
              <AuditRow
                severity="WARNING"
                label="Failed login attempt"
                meta="Unknown location"
              />

              <Typography fontWeight={700}>Login history</Typography>
              <Typography variant="body2" color="text.secondary">
                Recent access events
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  ✔ Germany · Chrome · Today
                </Typography>
                <Typography variant="body2">
                  ✔ Germany · Safari · Yesterday
                </Typography>
                <Typography variant="body2">
                  ✔ iOS · App · 2 days ago
                </Typography>
              </Box>
            </Box>
          </BentoTile>

          {/* ============================== */}
          {/* RECOVERY */}
          {/* ============================== */}
          <BentoTile
            index={5}
            area="3 / 9 / span 1 / span 4"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ p: 3 }}>
              <Typography fontWeight={700}>Recovery</Typography>
              <Typography variant="body2" color="text.secondary">
                Regain access if something goes wrong
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">✔ Recovery email set</Typography>
                <Typography variant="body2">
                  ✔ Backup codes generated
                </Typography>
              </Box>
            </Box>
          </BentoTile>
        </Box>
      </Container>
    </LayoutShell>
  );
}

function AuditRow({
  severity,
  label,
  meta,
}: {
  severity: "INFO" | "WARNING" | "CRITICAL";
  label: string;
  meta: string;
}) {
  const color =
    severity === "CRITICAL"
      ? "error.main"
      : severity === "WARNING"
        ? "warning.main"
        : "text.secondary";

  return (
    <Box sx={{ mt: 1 }}>
      <Typography fontWeight={600} color={color}>
        {label}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {meta}
      </Typography>
    </Box>
  );
}


function calculateSecurityScore(user: User): number {
  let score = 100;

  if (!user.mfaEnabled) score -= 30;
  if (!user.passkeyEnabled) score -= 10;
  if (user.hasUnknownDevices) score -= 10;
  if (user.weakPassword) score -= 20;
  if (user.suspiciousActivity) score -= 30;

  return Math.max(score, 0);
}
