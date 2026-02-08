/**
 * @file InboxTile.tsx
 * @description Live Inbox Tile with skeleton + animation
 */

"use client";

import { Box, Typography, Stack, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { JSX, useEffect, useState } from "react";
import { INBOX } from "@/mock/liveData";
import TileSkeleton from "./TileSkeleton";
import { useTranslations } from "next-intl";

export default function InboxTile(): JSX.Element {
  const theme = useTheme();
  const t = useTranslations("inbox");
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <TileSkeleton lines={3} />;

  return (
    <Box p={2}>
      <Typography
        color={theme.palette.text.primary}
        variant="subtitle2"
        sx={{ opacity: 0.8 }}
      >
        {t("title")}
      </Typography>

      {/* EMPTY STATE */}
      {INBOX.length === 0 && (
        <Typography
          component="div"
          variant="body2"
          sx={{ mt: 1.5, opacity: 0.6, fontStyle: "italic" }}
        >
          {t("empty")}
        </Typography>
      )}

      <Stack spacing={1} mt={1}>
        {INBOX.map((m, i) => (
          <motion.div
            key={m.subject}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.08,
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Typography
              color={theme.palette.text.primary}
              variant="body2"
              sx={{ opacity: 0.75 }}
            >
              {m.from} — {m.subject}
            </Typography>
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
}
