"use client";

import React, { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";

import type { User } from "@/types/user/user.type";

export default function ProfileStatsTile({ user }: { user: User }) {
  const t = useTranslations("profile.stats");
  const locale = useLocale();

  const createdDate = useMemo(() => {
    const dt = user?.createdAt ? new Date(user.createdAt) : null;
    if (!dt || Number.isNaN(dt.getTime())) return "—";
    return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(dt);
  }, [user?.createdAt, locale]);

  // Optional: "Today" (simple). If you want "Yesterday / X days ago", sag kurz Bescheid.
  const lastUpdatedLabel = t("values.today");

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
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}
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

      <Stack sx={{ textAlign: "right" }}>
        <Typography variant="caption" color="text.secondary">
          {t("labels.profileId")}: {user?.id?.slice(0, 8)?.toUpperCase()}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {t("labels.since")} {createdDate}
        </Typography>
      </Stack>
    </Box>
  );
}

/* StatItem bleibt wie bei dir – nur label/value kommen jetzt aus i18n */
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