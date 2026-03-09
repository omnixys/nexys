/**
 * @file CustomerInterestSpectrum.tsx
 * @description Interest Spectrum with auto-rotation, category filter, and i18n
 */

"use client";

import { Box, MenuItem, Select, Stack, Typography, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import type { GetMeQuery, InterestCategoryEnum, InterestEnum } from "@/generated/graphql";
import { useInterestCategory } from "@/hooks/useInterest";
import { formatEnum } from "@/i18n/format-enum";

type Props = {
  interests?: NonNullable<NonNullable<GetMeQuery["me"]["customer"]>["customerInterest"]>;
};

export default function CustomerInterestSpectrum({ interests }: Props) {
  const theme = useTheme();
  const tUser = useTranslations("user");
  const tEnum = useTranslations("enums");

  const { data } = useInterestCategory();

  const categories = data?.getAllInterestCategories ?? [];

  const userInterestKeys = useMemo(() => {
    return interests?.map((i) => i.interest?.key).filter(Boolean) as InterestEnum[];
  }, [interests]);

  const categorized = useMemo(() => {
    const result: Record<InterestCategoryEnum, InterestEnum[]> = {} as Record<
      InterestCategoryEnum,
      InterestEnum[]
    >;

    categories.forEach((cat) => {
      const matches =
        cat.interests?.map((i) => i.key).filter((k) => userInterestKeys.includes(k)) ?? [];

      if (matches.length) {
        result[cat.key] = matches;
      }
    });

    return result;
  }, [categories, userInterestKeys]);

  const categoryKeys = useMemo(
    () => Object.keys(categorized) as InterestCategoryEnum[],
    [categorized],
  );

  /* ---------------------- density */

  const maxCount = Math.max(...Object.values(categorized).map((v) => v.length), 1);

  const density = (cat: InterestCategoryEnum) => (categorized[cat]?.length ?? 0) / maxCount;

  /* ---------------------- state */

  const [category, setCategory] = useState<InterestCategoryEnum | "">("");

  useEffect(() => {
    if (!category && categoryKeys.length) {
      setCategory(categoryKeys[0]);
    }
  }, [categoryKeys, category]);

  const list = category ? (categorized[category] ?? []) : [];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, []);

  useEffect(() => {
    if (!list.length) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % list.length);
    }, 3200);

    return () => window.clearInterval(id);
  }, [list]);

  /* ---------------------- guard */

  if (!interests?.length) {
    return (
      <Typography variant="caption" color="text.secondary">
        {tUser("customer.labels.noInterests")}
      </Typography>
    );
  }

  const current = list[index];

  const currentLabel = current ? formatEnum(tEnum, "interest", current) : "—";

  /* ---------------------- render */

  return (
    <Stack spacing={2}>
      <Stack direction="column" spacing={2} alignItems="center" sx={{ width: "100%" }}>
        <Select
          size="small"
          value={category}
          onChange={(e) => setCategory(e.target.value as InterestCategoryEnum)}
          sx={{ minWidth: 180, borderRadius: 999 }}
        >
          {categoryKeys.map((cat) => (
            <MenuItem key={cat} value={cat}>
              <Stack spacing={0.5} width="100%">
                <Typography variant="caption" fontWeight={600}>
                  {formatEnum(tEnum, "interestCategory", cat)}
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

        {/* rotating interest */}

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
            <AnimatePresence mode="wait">
              <motion.span
                key={currentLabel}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                {currentLabel}
              </motion.span>
            </AnimatePresence>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
}
