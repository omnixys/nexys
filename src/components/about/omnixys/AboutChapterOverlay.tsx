"use client";

import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutChapterOverlay({
  title,
}: {
  title: string | null;
}) {
  return (
    <AnimatePresence>
      {title && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            backdropFilter: "blur(12px)",
            background: "rgba(10,6,24,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box textAlign="center">
            <Typography
              sx={{
                fontSize: 14,
                letterSpacing: 2,
                textTransform: "uppercase",
                opacity: 0.6,
                mb: 2,
              }}
            >
              Kapitel
            </Typography>

            <Typography
              sx={{
                fontSize: 42,
                fontWeight: 700,
                background: "linear-gradient(90deg, #a855f7, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title}
            </Typography>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
