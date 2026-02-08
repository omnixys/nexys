/**
 * @file ProfileAddressStack.tsx
 * @description Omnixys Address Carousel (Embla loop + autoplay) with Next.js @modal details
 */

"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  alpha,
  Box,
  Chip,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import useEmblaCarousel from "embla-carousel-react";

import type { Address, User } from "@/types/user/user.type";
import { useTranslations } from "next-intl";

type Props = {
  user: User;
};

/**
 * Routing contract (example):
 * - Clicking an address pushes: /profile?address=<id>
 * - Your @modal route reads the query and opens a dialog.
 *
 * If you prefer path-based:
 * - push(`/profile/addresses/${id}`) and create @modal/(...) segment route.
 */
function buildAddressModalUrl(addressId: string): string {
  return `/profile?address=${encodeURIComponent(addressId)}`;
}

export default function ProfileAddressStack({ user }: Props) {
  const theme = useTheme();
  const router = useRouter();
  const t = useTranslations("profile.addresses");

  const addresses = user?.addresses ?? [];

  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const count = addresses.length;

  const canScrollPrev = useMemo(() => count > 1, [count]);
  const canScrollNext = useMemo(() => count > 1, [count]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  // Autoplay (simple interval; stays predictable and testable)
  useEffect(() => {
    if (!isPlaying) return;
    if (!emblaApi) return;
    if (count <= 1) return;

    const id = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 4200);

    return () => window.clearInterval(id);
  }, [isPlaying, emblaApi, count]);

  const toggleFavorite = useCallback((addressId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(addressId)) next.delete(addressId);
      else next.add(addressId);
      return next;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (count <= 1) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
      if (e.key.toLowerCase() === "p") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [count, scrollPrev, scrollNext]);

  if (!addresses.length) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "grid",
          placeItems: "center",
          border: `1px solid ${alpha(theme.palette.divider, 0.85)}`,
          backdropFilter: "blur(12px)",
        }}
      >
        <Stack spacing={1.1} alignItems="center" sx={{ maxWidth: 320 }}>
          <Box
            sx={{
              width: 58,
              height: 58,
              borderRadius: 999,
              display: "grid",
              placeItems: "center",
            }}
          >
            <LocationOnIcon sx={{ color: theme.palette.primary.main }} />
          </Box>

          <Typography fontWeight={800}>{t("emptyTitle")}</Typography>

          <Typography variant="body2" color="text.secondary" textAlign="center">
            {t("emptySubtitle")}
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: 4,
        px: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: alpha(theme.palette.background.paper, 0.72),
        border: `1px solid ${alpha(theme.palette.divider, 0.85)}`,
        backdropFilter: "blur(12px)",
        boxShadow: `0 10px 40px ${alpha(theme.palette.common.black, 0.18)}`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background glow */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(900px 240px at 20% 0%, ${alpha(
            theme.palette.primary.main,
            0.16,
          )} 0%, transparent 60%)`,
          opacity: 0.85,
        }}
      />

      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ position: "relative", zIndex: 1, px: 9 }}
      >
        <Box>
          <Typography variant="h6" fontWeight={800}>
            {t("title")}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {t("counter", { current: selectedIndex + 1, total: count })} •{" "}
            {t("favorited", { count: favorites.size })}
          </Typography>
        </Box>

        {/* Dots */}
        {count > 1 && (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ position: "relative", zIndex: 1 }}
          >
            {addresses.map((_, i) => {
              const active = i === selectedIndex;
              return (
                <Box
                  key={i}
                  onClick={() => scrollTo(i)}
                  role="button"
                  tabIndex={0}
                  sx={{
                    height: 8,
                    width: active ? 24 : 8,
                    borderRadius: 999,
                    cursor: "pointer",
                    bgcolor: active
                      ? theme.palette.primary.main
                      : alpha(theme.palette.text.primary, 0.18),
                    transition: "width 220ms ease, background 220ms ease",
                    "&:hover": {
                      bgcolor: active
                        ? theme.palette.primary.dark
                        : alpha(theme.palette.text.primary, 0.26),
                    },
                  }}
                />
              );
            })}
          </Stack>
        )}

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            size="small"
            onClick={() => setIsPlaying((p) => !p)}
            sx={{
              bgcolor: alpha(theme.palette.text.primary, 0.06),
              border: `1px solid ${alpha(theme.palette.divider, 0.75)}`,
              "&:hover": { bgcolor: alpha(theme.palette.text.primary, 0.1) },
            }}
            aria-label={isPlaying ? t("actions.pause") : t("actions.play")}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>

          <IconButton
            size="small"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            sx={{
              bgcolor: alpha(theme.palette.text.primary, 0.06),
              border: `1px solid ${alpha(theme.palette.divider, 0.75)}`,
              "&:hover": { bgcolor: alpha(theme.palette.text.primary, 0.1) },
            }}
            aria-label={t("actions.prev")}
          >
            <ArrowBackIcon />
          </IconButton>

          <IconButton
            size="small"
            onClick={scrollNext}
            disabled={!canScrollNext}
            sx={{
              bgcolor: alpha(theme.palette.text.primary, 0.06),
              border: `1px solid ${alpha(theme.palette.divider, 0.75)}`,
              "&:hover": { bgcolor: alpha(theme.palette.text.primary, 0.1) },
            }}
            aria-label={t("actions.next")}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* Carousel */}
      <Box
        ref={emblaRef}
        sx={{
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 6,
            // Embla requires a flex container; the viewport is the parent
            touchAction: "pan-y",
            cursor: "grab",
            "&:active": { cursor: "grabbing" },
          }}
        >
          {addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              isFavorite={favorites.has(addr.id)}
              onToggleFavorite={() => toggleFavorite(addr.id)}
              onOpen={() => router.push(buildAddressModalUrl(addr.id))}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------ */
/* Subcomponents                                                */
/* ------------------------------------------------------------ */

function AddressCard({
  address,
  isFavorite,
  onToggleFavorite,
  onOpen,
}: {
  address: Address;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpen: () => void;
}) {
  const theme = useTheme();
  const t = useTranslations("profile.addresses");

  return (
    <Box
      sx={{
        flex: "0 0 100%", // ✅ one slide per view
        minWidth: 0,
        height: "100%",
      }}
    >
      <Box
        onClick={onOpen}
        sx={{
          width: "100%", // ✅ fill slide
          height: "100%",
          minHeight: 230,
          borderRadius: 3,
          p: 2.25,
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          bgcolor: alpha(theme.palette.background.default, 0.55),
          border: `1px solid ${alpha(theme.palette.divider, 0.85)}`,
          transition: "transform 160ms ease, border-color 160ms ease",
          "&:hover": {
            transform: "translateY(-2px)",
            borderColor: alpha(theme.palette.primary.main, 0.45),
            boxShadow: `0 10px 26px ${alpha(theme.palette.primary.main, 0.12)}`,
          },
        }}
      >
        {/* flare */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(800px 240px at 20% 0%, ${alpha(
              theme.palette.primary.main,
              0.14,
            )} 0%, transparent 60%)`,
          }}
        />

        <Stack spacing={1.4} sx={{ position: "relative", zIndex: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1.2} alignItems="center">
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: alpha(theme.palette.primary.main, 0.12),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
                }}
              >
                <LocationOnIcon sx={{ color: theme.palette.primary.main }} />
              </Box>

              <Box>
                <Typography fontWeight={800} noWrap>
                  {address.street} {address.houseNumber}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {address.city}, {address.country}
                </Typography>
              </Box>
            </Stack>

            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              sx={{
                bgcolor: alpha(theme.palette.text.primary, 0.06),
                border: `1px solid ${alpha(theme.palette.divider, 0.75)}`,
                "&:hover": { bgcolor: alpha(theme.palette.text.primary, 0.1) },
              }}
              aria-label={
                isFavorite ? t("actions.unfavorite") : t("actions.favorite")
              }
            >
              {isFavorite ? (
                <FavoriteIcon sx={{ color: theme.palette.error.main }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip
              size="small"
              label={`${t("labels.postalCode")}: ${address.zipCode}`}
              sx={{
                bgcolor: alpha(theme.palette.text.primary, 0.07),
                fontWeight: 700,
              }}
            />
            <Chip
              size="small"
              label={`${t("labels.city")}: ${address.city}`}
              sx={{
                bgcolor: alpha(theme.palette.text.primary, 0.07),
                fontWeight: 700,
              }}
            />
          </Stack>

          {address.additionalInfo ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {address.additionalInfo}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {t("noAdditionalInfo")}
            </Typography>
          )}

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: "auto" }}
          >
            {t("openHint")}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
