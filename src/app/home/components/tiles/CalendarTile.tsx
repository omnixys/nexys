/**
 * @file CalendarTile.tsx
 * @description Calendar Tile with skeleton + staggered agenda
 */

"use client";

import { Box, Typography, Stack, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { JSX, useEffect, useState } from "react";
import { CALENDAR } from "../../mock/liveData";
import TileSkeleton from "./TileSkeleton";
import { useTranslations, useFormatter } from "next-intl";

export default function CalendarTile(): JSX.Element {
  const t = useTranslations("calendar");
  const format = useFormatter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <TileSkeleton lines={4} />;

  return (
    <Box p={2}>
      {/* TITLE */}
      <Typography
        component="div"
        variant="subtitle2"
        sx={{ opacity: 0.8, color: "text.primary" }}
      >
        {t("title")}
      </Typography>

      <Stack spacing={1.2} mt={1.5}>
        {CALENDAR.map((item, i) => {
          const start = new Date(item.start);

          const time = format.dateTime(start, {
            hour: "numeric",
            minute: "2-digit",
          });

          const weekday = format.dateTime(start, {
            weekday: "short",
          });

          return (
            <motion.div
              key={item.start}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.1,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* TIME + WEEKDAY */}
              <Typography
                component="div"
                variant="caption"
                sx={{ opacity: 0.6, color: "text.secondary" }}
              >
                {weekday} · {time}
              </Typography>

              {/* TITLE */}
              <Typography
                component="div"
                variant="body2"
                sx={{ color: "text.primary" }}
              >
                {t(`events.${item.titleKey}`)}
              </Typography>

              <Divider sx={{ mt: 1, opacity: 0.1 }} />
            </motion.div>
          );
        })}
      </Stack>
    </Box>
  );
}
