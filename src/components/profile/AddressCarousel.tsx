"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { alpha, Box, IconButton, Stack, useTheme } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import AddressCard from "@/components/profile/AddressCard";
import type { GetUserAddressesByUserIdQuery } from "@/generated/graphql";

type Address = GetUserAddressesByUserIdQuery["getUserAddressesByUserId"][number];

type Props = {
  addresses: Address[];
};

export default function AddressCarousel({ addresses }: Props) {
  const theme = useTheme();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const count = addresses.length;

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!playing || count <= 1 || !emblaApi) return;

    const id = setInterval(() => emblaApi.scrollNext(), 4000);

    return () => clearInterval(id);
  }, [playing, emblaApi, count]);

  return (
    <Box
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
        py: 2,
      }}
    >
      {/* Controls */}

      <Stack direction="row" justifyContent="flex-end" spacing={1} px={10} pt={1}>
        <IconButton size="small" onClick={() => setPlaying((p) => !p)}>
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>

        <IconButton size="small" onClick={scrollPrev}>
          <ArrowBackIcon />
        </IconButton>

        <IconButton size="small" onClick={scrollNext}>
          <ArrowForwardIcon />
        </IconButton>
      </Stack>

      {/* Carousel */}

      <Box ref={emblaRef} sx={{ overflow: "hidden" }}>
        <Box display="flex">
          {addresses.map((addr) => (
            <AddressCard key={addr.id} address={addr} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
