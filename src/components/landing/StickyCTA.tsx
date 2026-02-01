// components/common/StickyCTA.jsx
"use client";

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";

export default function StickyCTA() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 1300,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Box
          sx={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: { xs: 3, md: 4 },
            py: 1.5,
            borderRadius: 999,
            backdropFilter: "blur(14px)",
            background:
              "linear-gradient(135deg, rgba(20,12,40,0.85), rgba(30,20,60,0.85))",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 0 32px rgba(168,62,180,0.45)",
            transition: "all 0.25s ease",
            "&:hover": {
              transform: "translateY(-2px) scale(1.03)",
              boxShadow: "0 0 48px rgba(168,62,180,0.7)",
            },
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 600,
              fontSize: { xs: 14, md: 16 },
              whiteSpace: "nowrap",
            }}
          >
            Jetzt Teil von Omnixys werden
          </Typography>

          <Link href="/login" passHref>
            <Button
              size="small"
              sx={{
                fontWeight: 600,
                px: 2.5,
                borderRadius: 999,
                background:
                  "linear-gradient(90deg, rgba(168,62,180,1), rgba(112,66,248,1))",
                color: "#fff",
                boxShadow: "0 0 16px rgba(168,62,180,0.6)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, rgba(168,62,180,1), rgba(112,66,248,1))",
                  boxShadow: "0 0 24px rgba(168,62,180,0.9)",
                },
              }}
            >
              Jetzt starten
            </Button>
          </Link>
        </Box>
      </motion.div>
    </Box>
  );
}
