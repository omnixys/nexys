/**
 * @file /settings/page.tsx
 * @description User settings – Bento Grid layout
 */

"use client";

import { Box, Container, Typography, Switch, Stack } from "@mui/material";
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

export default function SettingsPage(): JSX.Element {
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
            Settings & preferences
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Customize how Omnixys looks, feels and behaves for you.
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
          {/* OVERVIEW – HERO */}
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
                Personal configuration
              </Typography>
              <Typography color="text.secondary">
                Your preferences apply across all Omnixys platforms.
              </Typography>

              <Typography sx={{ mt: 2 }} variant="body2">
                Active profile: <strong>{user?.username}</strong>
              </Typography>
            </Box>
          </BentoTile>

          {/* ============================== */}
          {/* APPEARANCE */}
          {/* ============================== */}
          <BentoTile
            index={1}
            area="2 / 1 / span 1 / span 4"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ p: 3 }}>
              <Typography fontWeight={700}>Appearance</Typography>
              <Typography variant="body2" color="text.secondary">
                Theme, colors and motion
              </Typography>

              <SettingToggle label="Dark mode" />
              <SettingToggle label="Reduced motion" />
              <SettingToggle label="High contrast" />
            </Box>
          </BentoTile>

          {/* ============================== */}
          {/* NOTIFICATIONS */}
          {/* ============================== */}
          <BentoTile
            index={2}
            area="2 / 5 / span 1 / span 4"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ p: 3 }}>
              <Typography fontWeight={700}>Notifications</Typography>
              <Typography variant="body2" color="text.secondary">
                When and how Omnixys notifies you
              </Typography>

              <SettingToggle label="In-app notifications" />
              <SettingToggle label="Email notifications" />
              <SettingToggle label="Critical alerts only" />
            </Box>
          </BentoTile>

          {/* ============================== */}
          {/* IDENTITY & PREFERENCES */}
          {/* ============================== */}
          <BentoTile
            index={3}
            area="2 / 9 / span 1 / span 4"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ p: 3 }}>
              <Typography fontWeight={700}>Identity</Typography>
              <Typography variant="body2" color="text.secondary">
                Language, region and behavior
              </Typography>

              <Typography variant="body2" sx={{ mt: 2 }}>
                Language: English
              </Typography>
              <Typography variant="body2">Timezone: Europe/Berlin</Typography>
            </Box>
          </BentoTile>

          {/* ============================== */}
          {/* CONNECTED SYSTEMS */}
          {/* ============================== */}
          <BentoTile
            index={4}
            area="3 / 1 / span 1 / span 8"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ p: 3 }}>
              <Typography fontWeight={700}>Connected systems</Typography>
              <Typography variant="body2" color="text.secondary">
                Platforms using your profile
              </Typography>

              <Typography variant="body2" sx={{ mt: 2 }}>
                ✔ Nexys
              </Typography>
              <Typography variant="body2">✔ Finanxys</Typography>
              <Typography variant="body2">✔ Journeyxys</Typography>
            </Box>
          </BentoTile>

          {/* ============================== */}
          {/* PERSONALIZATION */}
          {/* ============================== */}
          <BentoTile
            index={5}
            area="3 / 9 / span 1 / span 4"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ p: 3 }}>
              <Typography fontWeight={700}>Personalization</Typography>
              <Typography variant="body2" color="text.secondary">
                Adaptive behavior and recommendations
              </Typography>

              <SettingToggle label="Adaptive suggestions" />
              <SettingToggle label="Explain recommendations" />
            </Box>
          </BentoTile>
        </Box>
      </Container>
    </LayoutShell>
  );
}

/* =====================================================
   SMALL HELPER
===================================================== */

function SettingToggle({ label }: { label: string }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mt: 2 }}
    >
      <Typography variant="body2">{label}</Typography>
      <Switch />
    </Stack>
  );
}
