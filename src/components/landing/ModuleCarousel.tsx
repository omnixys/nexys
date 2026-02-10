"use client";

import { Box, Typography } from "@mui/material";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";

import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

interface ModuleItem {
  title: string;
  subtitle?: string;
  image?: string;
}

interface Props {
  modules: ModuleItem[];
}

export default function ModuleCarousel({ modules }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);


  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: { perView: 3, spacing: 20 },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1.2, spacing: 14 },
      },
    },
    created(s) {
      const perView = Number(s.options.slides?.perView ?? 1);
      const centerOffset = Math.floor(perView / 2);
      s.moveToIdx(centerOffset, true, { duration: 0 });
      setActive(centerOffset);
    },
    slideChanged(s) {
      const idx = s.track.details.slides[s.track.details.rel].abs;
      setActive(idx % modules.length);
    },
  });

useEffect(() => {
  if (!slider.current || paused) return;

  const interval = setInterval(() => {
    slider.current?.next();
  }, 2200);

  return () => clearInterval(interval);
}, [slider, paused]);


  return (
    <Box
      sx={{ position: "relative" }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#fff",
          fontWeight: 700,
          textAlign: "center",
          mb: 2,
          letterSpacing: 0.5,
        }}
      >
        Core Nexys Modules
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          mb: 6,
          maxWidth: 720,
          mx: "auto",
        }}
      >
        Modular business domains that can be combined, scaled and operated
        independently.
      </Typography>

      <Box ref={sliderRef} className="keen-slider" sx={{ mt: 6 }}>
        {modules.map((m, i) => {
          const isHighlighted = hovered !== null ? hovered === i : i === active;

          return (
            <Box key={i} className="keen-slider__slide">
              <Box
                onPointerEnter={() => {
                  console.log("HOVER", i);
                  setHovered(i);
                  setPaused(true);
                }}
                onPointerLeave={() => {
                  setHovered(null);
                  setPaused(false);
                }}
                sx={{
                  height: "100%",
                  pointerEvents: "auto",
                }}
              >
                <motion.div
                  animate={
                    isHighlighted
                      ? { scale: 1.08, y: -12 }
                      : { scale: 0.94, y: 0 }
                  }
                  transition={{ type: "spring", stiffness: 240, damping: 26 }}
                >
                  <ProjectCard
                    src={m.image}
                    title={m.title}
                    description={m.subtitle}
                  />
                </motion.div>

                {/* ✨ Center / Hover Glow */}
                {isHighlighted && (
                  <Box
                    sx={{
                      pointerEvents: "none",
                      position: "absolute",
                      inset: -12,
                      borderRadius: 4,
                      background:
                        "radial-gradient(circle at top, rgba(168,62,180,0.25), transparent 70%)",
                    }}
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
      {/* Background Video */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <Box
          top={550}
          sx={{
            width: "100%",
            height: "50%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="video"
            src="/landing/cards-video.webm"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.3,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
