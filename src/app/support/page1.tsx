/**
 * @file /support/page.tsx
 * @description Support Center – Bento Grid layout
 */

"use client";

import { Box, Container, Typography, Button, Stack, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { JSX, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import LayoutShell from "@/components/home/layout/LayoutShell";
import DepthBlurLayer from "@/components/home/DepthBlurLayer";
import BentoTile from "@/components/home/BentoTile";
import { useAuth } from "@/providers/AuthProvider";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ChatIcon from "@mui/icons-material/Chat";
import BugReportIcon from "@mui/icons-material/BugReport";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import FeedbackIcon from "@mui/icons-material/Feedback";

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

export default function SupportPage(): JSX.Element {
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
            Support & help
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Get help, report issues or give feedback — all in one place.
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
          {/* SUPPORT OVERVIEW – HERO */}
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
                Support center
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                We’re here to help you move forward.
              </Typography>

              <Stack direction="row" spacing={2}>
                <Chip label="All systems operational" color="success" />
                <Chip label="Response time: ~2h" />
              </Stack>
            </Box>
          </BentoTile>

          {/* ============================== */}
          {/* HELP ARTICLES */}
          {/* ============================== */}
          <BentoTile
            index={1}
            area="2 / 1 / span 1 / span 4"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ p: 3 }}>
              <HelpOutlineIcon color="primary" />
              <Typography fontWeight={700} sx={{ mt: 1 }}>
                Help articles
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Guides, FAQs and troubleshooting
              </Typography>

              <Button sx={{ mt: 2 }} variant="outlined">
                Browse knowledge base
              </Button>
            </Box>
          </BentoTile>

          {/* ============================== */}
          {/* CONTACT SUPPORT */}
          {/* ============================== */}
          <BentoTile
            index={2}
            area="2 / 5 / span 1 / span 4"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ p: 3 }}>
              <ChatIcon color="secondary" />
              <Typography fontWeight={700} sx={{ mt: 1 }}>
                Contact support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Reach out to our support team
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Button variant="contained">Start chat</Button>
                <Button variant="outlined">Send request</Button>
              </Stack>
            </Box>
          </BentoTile>

          {/* ============================== */}
          {/* SYSTEM STATUS */}
          {/* ============================== */}
          <BentoTile
            index={3}
            area="2 / 9 / span 1 / span 4"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ p: 3 }}>
              <CloudDoneIcon color="success" />
              <Typography fontWeight={700} sx={{ mt: 1 }}>
                System status
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Live service availability
              </Typography>

              <Typography variant="body2" sx={{ mt: 2 }}>
                ✔ Nexys operational ✔ Finanxys operational ✔ Journeyxys
                operational
              </Typography>
            </Box>
          </BentoTile>

          {/* ============================== */}
          {/* RECENT REQUESTS */}
          {/* ============================== */}
          <BentoTile
            index={4}
            area="3 / 1 / span 1 / span 8"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ p: 3 }}>
              <Typography fontWeight={700}>Your recent requests</Typography>
              <Typography variant="body2" color="text.secondary">
                Track open or resolved tickets
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  ✔ Password reset issue — Resolved
                </Typography>
                <Typography variant="body2">
                  ⏳ Billing question — In progress
                </Typography>
              </Box>
            </Box>
          </BentoTile>

          {/* ============================== */}
          {/* FEEDBACK */}
          {/* ============================== */}
          <BentoTile
            index={5}
            area="3 / 9 / span 1 / span 4"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ p: 3 }}>
              <FeedbackIcon color="primary" />
              <Typography fontWeight={700} sx={{ mt: 1 }}>
                Give feedback
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Help us improve Omnixys
              </Typography>

              <Button sx={{ mt: 2 }} variant="outlined">
                Share feedback
              </Button>
            </Box>
          </BentoTile>
        </Box>
      </Container>
    </LayoutShell>
  );
}
