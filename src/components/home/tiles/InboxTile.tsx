/**
 * @file InboxTile.tsx
 * @description Live Inbox Tile with skeleton + animation
 */

"use client";

import { Box, Typography, Stack, useTheme, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { JSX, useEffect, useState } from "react";
import { INBOX } from "../../mock/liveData";
import TileSkeleton from "./TileSkeleton";
import { useFormatter, useTranslations } from "next-intl";

export default function InboxTile(): JSX.Element {
  const theme = useTheme();
  const t = useTranslations("inbox");
    const format = useFormatter();
  
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

      {/* MESSAGES */}
      <Stack spacing={1} mt={1}>
        {INBOX.map((m, i) => {
           const createdAt = new Date(m.createdAt);
           const relativeTime = format.relativeTime(createdAt, {
             numeric: "auto",
           });
          
            const isUnread = m.status === "unread";

          return (
            <motion.div
              key={`${m.from}-${m.subject}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.08,
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  bgcolor: isUnread ? "action.hover" : "transparent",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    component="div"
                    variant="body2"
                    sx={{ opacity: 0.8, color: "text.primary" }}
                  >
                    <strong>{t("from")}:</strong> {m.from}
                  </Typography>
                  <Chip
                    size="small"
                    label={t(`status.${m.status}`)}
                    color={isUnread ? "primary" : "default"}
                    variant={isUnread ? "filled" : "outlined"}
                  />
                </Stack>

                <Typography
                  component="div"
                  variant="body2"
                  sx={{ opacity: 0.7, color: "text.secondary" }}
                >
                  <strong>{t("subject")}:</strong> {m.subject}
                </Typography>

                <Typography
                  component="div"
                  variant="caption"
                  sx={{ opacity: 0.6, color: "text.secondary" }}
                >
                  {t("ago", { time: relativeTime })}
                </Typography>
              </Box>
            </motion.div>
          );
        })}
      </Stack>
    </Box>
  );
}
