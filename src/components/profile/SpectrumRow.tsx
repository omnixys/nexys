/**
 * @file CustomerInterestSpectrum.tsx
 * @description Interest Spectrum with auto-rotation, category filter, and i18n
 */

"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import TextTransition, { presets } from "react-text-transition";
import { useTranslations } from "next-intl";

import { InterestType } from "@/types/user/user-enum-type";
import type { InterestCategory } from "@/types/user/user.type";
import {
  CATEGORY_I18N_KEY,
  INTEREST_I18N_KEY,
} from "@/types/user/enum-translations";
import { formatEnum } from "@/utils/format-enum";

/* ------------------------------------------------------------ */
/* Category mapping (InterestType -> InterestCategory)           */
/* ------------------------------------------------------------ */

const INTEREST_CATEGORY_MAP: Partial<Record<InterestType, InterestCategory>> = {
  CREDIT_AND_DEBT: "banking",
  SAVING_AND_FINANCE: "banking",
  BANK_PRODUCTS_AND_SERVICES: "banking",

  TECHNOLOGY: "technology",
  TECHNOLOGY_AND_INNOVATION: "technology",

  REAL_ESTATE: "realEstate",
  INSURANCE: "insurance",
  INVESTMENTS: "investments",

  SPORTS: "lifestyle",
  MUSIC: "lifestyle",
  TRAVEL: "lifestyle",
  SUSTAINABLE_FINANCE: "banking",
};

type Props = {
  interests: InterestType[];
};

export default function CustomerInterestSpectrum({ interests }: Props) {
  const theme = useTheme();

  // Root translator so keys like "interest.sports" work, regardless of namespace file splitting
  const tUser = useTranslations("user");

  /* ---------------------- guard */

  if (!interests?.length) {
    return (
      <Typography variant="caption" color="text.secondary">
        {tUser("customer.labels.noInterests")}
      </Typography>
    );
  }

  /* ---------------------- normalize & categorize */

  const categorized = useMemo(() => {
    return (interests ?? []).reduce<Record<InterestCategory, InterestType[]>>(
      (acc, interest) => {
        const cat = INTEREST_CATEGORY_MAP[interest] ?? "lifestyle";
        acc[cat] ??= [];
        acc[cat].push(interest);
        return acc;
      },
      {} as Record<InterestCategory, InterestType[]>,
    );
  }, [interests]);

  const categories = useMemo(
    () => Object.keys(categorized) as InterestCategory[],
    [categorized],
  );

  /* ---------------------- density (normalized) */

  const maxCount = Math.max(
    ...Object.values(categorized).map((v) => v.length),
    1,
  );
  const density = (cat: InterestCategory) =>
    (categorized[cat]?.length ?? 0) / maxCount;

  /* ---------------------- state */

  const [category, setCategory] = useState<InterestCategory>(
    () => categories[0] ?? "lifestyle",
  );
  const list = categorized[category] ?? [];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [category, list.length]);

  useEffect(() => {
    if (!list.length) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % list.length);
    }, 3200);

    return () => window.clearInterval(id);
  }, [category, list.length]);

  const current = list[index] ?? null;

  // Use formatEnum() for translation
  const currentLabel = current
    ? formatEnum(tUser, INTEREST_I18N_KEY, current)
    : "—";

  return (
    <Stack spacing={2}>
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Select
          size="small"
          value={category}
          onChange={(e) => setCategory(e.target.value as InterestCategory)}
          sx={{ minWidth: 180, borderRadius: 999 }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              <Stack spacing={0.5} width="100%">
                <Typography variant="caption" fontWeight={600}>
                  {formatEnum(tUser, CATEGORY_I18N_KEY, cat)}
                </Typography>

                <Box
                  sx={{
                    height: 4,
                    borderRadius: 999,
                    bgcolor: theme.palette.divider,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: `${density(cat) * 100}%`,
                      height: "100%",
                      bgcolor: theme.palette.primary.main,
                    }}
                  />
                </Box>
              </Stack>
            </MenuItem>
          ))}
        </Select>

        {/* Focus Wheel (under select) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 44,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              px: 2.5,
              py: 0.85,
              borderRadius: 999,
              border: `1px solid ${theme.palette.divider}`,
              fontWeight: 600,
              opacity: 0.95,
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <TextTransition springConfig={presets.gentle} inline>
              {currentLabel}
            </TextTransition>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
}
