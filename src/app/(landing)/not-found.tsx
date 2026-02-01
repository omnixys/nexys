"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100svh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        background: "linear-gradient(180deg, #06010F 0%, #05010C 100%)",
      }}
    >
      {/* Background Video */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        sx={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
          opacity: 0.55,
          filter: "saturate(1.1) brightness(0.85)",
        }}
      >
        <source src="/landing/blackhole.webm" type="video/webm" />
      </Box>

      {/* Foreground */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ zIndex: 1300 }}
      >
        <Stack
          spacing={3}
          sx={{
            maxWidth: 460,
            textAlign: "center",
            backdropFilter: "blur(26px)",
            background: "rgba(10, 6, 22, 0.72)",
            borderRadius: 4,
            p: { xs: 4, sm: 5 },
            boxShadow:
              "0 30px 90px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          {/* Status */}
          <Typography
            variant="overline"
            sx={{
              letterSpacing: 1.8,
              opacity: 0.7,
              color: "#9B8CFF",
            }}
          >
            Restricted Access
          </Typography>

          {/* Title */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              letterSpacing: -0.4,
              color: "#FFFFFF",
            }}
          >
            Zugriff nicht verfügbar
          </Typography>

          {/* Context */}
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.6,
            }}
          >
            Dieser Bereich ist für dein Profil derzeit nicht freigeschaltet.
          </Typography>

          {/* Action */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <Button
              size="large"
              variant="contained"
              sx={{
                mt: 1,
                px: 4,
                py: 1.3,
                borderRadius: 3,
                fontWeight: 500,
                fontSize: 14,
                background: "linear-gradient(135deg, #7C6AFF 0%, #A855F7 100%)",
                boxShadow: "0 10px 30px rgba(124,106,255,0.45)",
                "&:hover": {
                  boxShadow: "0 14px 42px rgba(124,106,255,0.65)",
                },
              }}
            >
              Zur Startseite
            </Button>
          </Link>
        </Stack>
      </motion.div>
    </Box>
  );
}
