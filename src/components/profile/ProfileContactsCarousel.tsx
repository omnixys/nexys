/**
 * @file ProfileContactsCarousel.tsx
 * @description Omnixys Contacts Carousel (snap cards + category filter + i18n)
 */

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  alpha,
  Box,
  Chip,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import type { User } from "@/types/user/user.type";
import { RelationshipType } from "@/types/user/user-enum-type";

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { INTEREST_I18N_KEY, RELATIONSHIP_I18N_KEY } from "../../types/user/enum-translations";
import { formatEnum } from "../../utils/format-enum";

type Props = {
  user: User;
};

type Contact = User["contacts"][number];

const CARD_W = 320;
const CARD_GAP = 14;

type FilterKey = "ALL" | RelationshipType;

export default function ProfileContactsCarousel({ user }: Props) {
  const theme = useTheme();
  const tUser = useTranslations('user');

  const contacts: Contact[] = user?.contacts ?? [];

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<FilterKey>("ALL");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const availableFilters = useMemo<FilterKey[]>(() => {
    const rels = new Set<RelationshipType>();
    for (const c of contacts) rels.add(c.relationship);
    return ["ALL", ...Array.from(rels)];
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    if (filter === "ALL") return contacts;
    return contacts.filter((c) => c.relationship === filter);
  }, [contacts, filter]);

  const selected = useMemo(() => {
    if (!filteredContacts.length) return null;
    return (
      filteredContacts.find((c) => c.id === selectedId) ??
      filteredContacts[0] ??
      null
    );
  }, [filteredContacts, selectedId]);

  // Keep selected item valid when filter changes
  useEffect(() => {
    if (!filteredContacts.length) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !filteredContacts.some((c) => c.id === selectedId)) {
      setSelectedId(filteredContacts[0]!.id);
    }
  }, [filteredContacts, selectedId]);

  const totalLimit = useMemo(
    () =>
      filteredContacts.reduce(
        (sum, c) => sum + Number(c.withdrawalLimit ?? 0),
        0,
      ),
    [filteredContacts],
  );

  const formatterEUR = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [],
  );

  function scrollByCards(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (CARD_W + CARD_GAP), behavior: "smooth" });
  }

  function onWheel(e: React.WheelEvent) {
    const el = scrollerRef.current;
    if (!el) return;

    // Convert vertical wheel to horizontal scroll
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  }

  if (!contacts.length) {
    return (
      <Box
        sx={{
          height: "100%",
          borderRadius: 4,
          p: 3,
          display: "grid",
          placeItems: "center",
          bgcolor: alpha(theme.palette.background.paper, 0.65),
          border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
          backdropFilter: "blur(10px)",
        }}
      >
        <Stack spacing={1.2} alignItems="center">
          <Typography fontWeight={800}>
            {tUser("customer.contacts.emptyTitle")}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {tUser("customer.contacts.emptySubtitle")}
          </Typography>
        </Stack>
      </Box>
    );
  }

  const hasFiltered = filter !== "ALL";

  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: 4,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: alpha(theme.palette.background.paper, 0.72),
        border: `1px solid ${alpha(theme.palette.divider, 0.85)}`,
        backdropFilter: "blur(12px)",
        boxShadow: `0 10px 40px ${alpha(theme.palette.common.black, 0.18)}`,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        gap={2}
      >
        <Box>
          <Typography variant="h6" fontWeight={800}>
            {tUser("labels.contacts")}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            flexWrap="wrap"
          >
            <Typography variant="caption" color="text.secondary">
              {tUser("customer.contacts.count", {
                count: filteredContacts.length,
              })}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              •
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {tUser("customer.contacts.totalLimit")}{" "}
              {formatterEUR.format(totalLimit)}
            </Typography>

            {hasFiltered && (
              <Chip
                size="small"
                icon={<FilterAltRoundedIcon />}
                label={tUser("customer.contacts.filtered")}
                sx={{
                  ml: 0.5,
                  bgcolor: alpha(theme.palette.primary.main, 0.12),
                  color: theme.palette.primary.main,
                  fontWeight: 800,
                }}
              />
            )}
          </Stack>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          {/* Relationship filter */}
          <Select
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterKey)}
            sx={{
              minWidth: 190,
              borderRadius: 999,
              bgcolor: alpha(theme.palette.background.default, 0.35),
              "& .MuiSelect-select": { py: 0.9 },
            }}
          >
            {availableFilters.map((f) => (
              <MenuItem key={String(f)} value={f}>
                {f === "ALL"
                  ? tUser("customer.contacts.filters.all")
                  : formatEnum(tUser, RELATIONSHIP_I18N_KEY, f)}
              </MenuItem>
            ))}
          </Select>

          <IconButton size="small" onClick={() => scrollByCards(-1)}>
            <ChevronLeftRoundedIcon />
          </IconButton>
          <IconButton size="small" onClick={() => scrollByCards(1)}>
            <ChevronRightRoundedIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* Empty after filtering */}
      {!filteredContacts.length ? (
        <Box
          sx={{
            flex: 1,
            borderRadius: 3.5,
            p: 3,
            display: "grid",
            placeItems: "center",
            bgcolor: alpha(theme.palette.background.default, 0.4),
            border: `1px dashed ${alpha(theme.palette.divider, 0.9)}`,
          }}
        >
          <Stack spacing={0.75} alignItems="center">
            <Typography fontWeight={800}>
              {tUser("customer.contacts.noResultsTitle")}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              {tUser("customer.contacts.noResultsSubtitle")}
            </Typography>
            <Chip
              size="small"
              label={tUser("customer.contacts.resetFilter")}
              onClick={() => setFilter("ALL")}
              sx={{
                mt: 0.5,
                bgcolor: alpha(theme.palette.primary.main, 0.12),
                color: theme.palette.primary.main,
                fontWeight: 800,
                cursor: "pointer",
              }}
            />
          </Stack>
        </Box>
      ) : (
        <>
          {/* Carousel */}
          <Box sx={{ position: "relative" }}>
            <Box
              ref={scrollerRef}
              onWheel={onWheel}
              sx={{
                display: "flex",
                gap: `${CARD_GAP}px`,
                overflowX: "auto",
                pb: 1,
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                pr: 2,

                "&::-webkit-scrollbar": { height: 10 },
                "&::-webkit-scrollbar-thumb": {
                  background: alpha(theme.palette.text.primary, 0.12),
                  borderRadius: 999,
                },
                "&::-webkit-scrollbar-track": { background: "transparent" },
              }}
            >
              {filteredContacts.map((c) => {
                const isSelected = c.id === selected?.id;

                return (
                  <motion.div
                    key={c.id}
                    layout
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.18 }}
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <Box
                      onClick={() => setSelectedId(c.id)}
                      sx={{
                        width: CARD_W,
                        minWidth: CARD_W,
                        borderRadius: 3.5,
                        p: 2.25,
                        cursor: "pointer",
                        position: "relative",
                        overflow: "hidden",

                        bgcolor: isSelected
                          ? alpha(theme.palette.primary.main, 0.12)
                          : alpha(theme.palette.background.default, 0.55),

                        border: isSelected
                          ? `1px solid ${alpha(theme.palette.primary.main, 0.35)}`
                          : `1px solid ${alpha(theme.palette.divider, 0.85)}`,

                        boxShadow: isSelected
                          ? `0 12px 30px ${alpha(theme.palette.primary.main, 0.15)}`
                          : "none",

                        transition:
                          "border-color 180ms ease, background 180ms ease",
                      }}
                    >
                      {/* subtle gradient flare */}
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          pointerEvents: "none",
                          background: `radial-gradient(900px 200px at 25% 0%, ${alpha(
                            theme.palette.primary.main,
                            isSelected ? 0.2 : 0.12,
                          )} 0%, transparent 60%)`,
                        }}
                      />

                      <Stack
                        spacing={1.2}
                        sx={{ position: "relative", zIndex: 1 }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Chip
                            size="small"
                            label={formatEnum(
                              tUser,
                           RELATIONSHIP_I18N_KEY,
                              c.relationship,
                            )}
                            sx={{
                              bgcolor: alpha(theme.palette.text.primary, 0.07),
                              color: theme.palette.text.primary,
                              fontWeight: 700,
                            }}
                          />

                          {c.emergency && (
                            <Chip
                              size="small"
                              icon={<BoltRoundedIcon />}
                              label={tUser("customer.contacts.emergency")}
                              sx={{
                                bgcolor: alpha(theme.palette.error.main, 0.14),
                                color: theme.palette.error.main,
                                fontWeight: 800,
                              }}
                            />
                          )}
                        </Stack>

                        <Divider sx={{ my: 0.5, opacity: 0.35 }} />

                        <RowStat
                          icon={
                            <PaymentsRoundedIcon
                              fontSize="small"
                              color="disabled"
                            />
                          }
                          label={tUser("customer.contacts.labels.limit")}
                          value={formatterEUR.format(
                            Number(c.withdrawalLimit ?? 0),
                          )}
                        />

                        <RowStat
                          icon={
                            <CalendarMonthRoundedIcon
                              fontSize="small"
                              color="disabled"
                            />
                          }
                          label={tUser("customer.contacts.labels.start")}
                          value={formatMonthYear(c.startDate)}
                        />

                        <RowStat
                          icon={
                            <CalendarMonthRoundedIcon
                              fontSize="small"
                              color="disabled"
                            />
                          }
                          label={tUser("customer.contacts.labels.end")}
                          value={formatMonthYear(c.endDate) ?? "—"}
                          valueTone={c.endDate ? "default" : "muted"}
                        />
                      </Stack>
                    </Box>
                  </motion.div>
                );
              })}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

/* ------------------------------------------------------------ */
/* Small UI helper                                               */
/* ------------------------------------------------------------ */

function RowStat({
  icon,
  label,
  value,
  valueTone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueTone?: "default" | "muted";
}) {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {icon}
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Stack>

      <Typography
        variant="body2"
        fontWeight={800}
        color={valueTone === "muted" ? "text.secondary" : "text.primary"}
      >
        {value}
      </Typography>
    </Stack>
  );
}


/* ------------------------------------------------------------ */
/* Date helper                                                   */
/* ------------------------------------------------------------ */

function formatMonthYear(d?: Date | string | null): string | null {
  if (!d) return null;
  const dt = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dt.getTime())) return null;

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
  }).format(dt);
}
