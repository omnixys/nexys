/**
 * @file WeatherTile.tsx
 * @description Live Weather Tile with skeleton + subtle animation
 */

"use client";

import { Box, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { JSX, useEffect, useState } from "react";
import TileSkeleton from "./TileSkeleton";
import { useTranslations, useLocale } from "next-intl";
import { WEATHER } from "@/mock/liveData";

function toFahrenheit(c: number) {
  return Math.round((c * 9) / 5 + 32);
}

export default function WeatherTile(): JSX.Element {
  const t = useTranslations("weather");
  const locale = useLocale();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tmr = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(tmr);
  }, []);

  if (loading) return <TileSkeleton lines={2} />;

  const isImperial = locale.startsWith("en");
  const temperature = isImperial
    ? `${toFahrenheit(WEATHER.tempC)}°F`
    : `${WEATHER.tempC}°C`;

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

      <Stack spacing={0.5} mt={1}>
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <Typography
            component="div"
            variant="h4"
            fontWeight={600}
            sx={{ color: "text.primary" }}
          >
            {temperature}
          </Typography>
        </motion.div>

        {/* CONDITION */}
        <Typography
          component="div"
          variant="body2"
          sx={{ opacity: 0.7, color: "text.primary" }}
        >
          {t(`conditions.${WEATHER.condition}`)}
        </Typography>

        {/* LOCATION */}
        <Typography
          component="div"
          variant="caption"
          sx={{ opacity: 0.5, color: "text.secondary" }}
        >
          {WEATHER.location}
        </Typography>
      </Stack>
    </Box>
  );
}
