"use client";

import React, { useMemo, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { motion, useAnimationFrame } from "framer-motion";
import { useDevice } from "@/providers/DeviceProvider";

import type { User } from "@/types/user/user.type";

export default function ProfileStatsTile({ user }: { user: User }) {
  const t = useTranslations("profile.stats");
  const locale = useLocale();
  const { isMobile } = useDevice();
  const containerRef = useRef<HTMLDivElement>(null);

  const createdDate = useMemo(() => {
    const dt = user?.createdAt ? new Date(user.createdAt) : null;
    if (!dt || Number.isNaN(dt.getTime())) return "—";
    return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(dt);
  }, [user?.createdAt, locale]);

  const lastUpdatedLabel = t("values.today");

  /* =========================================
     AUTO LOOP SCROLL (ONLY MOBILE)
  ========================================= */

  useAnimationFrame((_, delta) => {
    if (!isMobile || !containerRef.current) return;

    containerRef.current.scrollLeft += delta * 0.04;

    if (
      containerRef.current.scrollLeft >=
      containerRef.current.scrollWidth / 2
    ) {
      containerRef.current.scrollLeft = 0;
    }
  });

  const StatsContent = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        whiteSpace: "nowrap",
      }}
    >
      <StatItem
        label={t("labels.profileCompleteness")}
        value="92%"
        color="#4CAF50"
      />
      <StatItem
        label={t("labels.securityScore")}
        value="98/100"
        color="#2196F3"
      />
      <StatItem label={t("labels.dataPoints")} value="247" color="#9C27B0" />
      <StatItem
        label={t("labels.lastUpdated")}
        value={lastUpdatedLabel}
        color="#FF9800"
      />
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT SIDE (Stats) */}
      {isMobile ? (
        <Box
          ref={containerRef}
          sx={{
            overflow: "hidden",
            display: "flex",
            flex: 1,
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {StatsContent}
          {StatsContent}
        </Box>
      ) : (
        StatsContent
      )}

      {/* RIGHT SIDE (Meta Info) */}
      {!isMobile && (
        <Stack sx={{ textAlign: "right" }}>
          <Typography variant="caption" color="text.secondary">
            {t("labels.profileId")}: {user?.id?.slice(0, 8)?.toUpperCase()}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {t("labels.since")} {createdDate}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}

/* =====================================================
   StatItem
===================================================== */

function StatItem({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6" fontWeight={700} sx={{ color }}>
        {value}
      </Typography>
    </Box>
  );
}
