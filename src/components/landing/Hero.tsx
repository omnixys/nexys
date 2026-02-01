"use client";

import { Box } from "@mui/material";
import { useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import HeroContent from "./HeroContent";

const getHeroScale = () => {
  if (typeof window === "undefined") return [1.4, 1.8, 1.4];

  const h = window.innerHeight;

  if (h < 800) return [1.1, 1.35, 1.1]; // kleine Laptops
  if (h < 1000) return [1.3, 1.6, 1.3]; // große Laptops
  return [1.6, 2.1, 1.6]; // Desktops
};

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      const distance = Math.sqrt(x * x + y * y);
      const max = 300;

      // 0 = nah, 1 = weit weg
      const proximity = Math.max(0, 1 - distance / max);

      mouseX.set(proximity);
      mouseY.set(proximity);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [scaleAnim, setScaleAnim] = useState<[number, number, number]>([
    1.3, 1.6, 1.3,
  ]);

  useEffect(() => {
    const update = () => setScaleAnim(getHeroScale());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scale = useTransform(mouseX, [0, 1], [1.04, 1.1]);

  const glow = useTransform(
    mouseX,
    [0, 1],
    [
      "drop-shadow(0 0 18px rgba(168,62,180,0.35))",
      "drop-shadow(0 0 42px rgba(168,62,180,0.9))",
    ],
  );

  const filter = useTransform(
    mouseX,
    [0, 1],
    ["saturate(1.05) brightness(1.05)", "saturate(1.35) brightness(1.2)"],
  );

  return (
    <Box
      id="about-me"
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100svh",
        overflow: "hidden",
      }}
    >
      {/* Background Video */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        sx={{
          position: "absolute",
          // top: "-410px",
          // transform: "rotate(180deg)",
          top: "50%",
          transform: "translateY(-97%) rotate(180deg)",
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      >
        <source src="/landing/blackhole.webm" type="video/webm" />
      </Box>

      {/* Foreground Content */}
      <Box sx={{ position: "relative", zIndex: 20 }}>
        {/* Logo */}
        {/* <Box
          left={"clamp(47.5%, 45vw, 62%)"}
          top={"clamp(24px, 6vh, 80px)"}
          sx={{ position: "relative" }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "inline-flex",
              filter,
              WebkitFilter: filter,
            }}
            animate={{ scale: scaleAnim }}
            transition={{
              duration: 1.3,
              ease: [0.4, 0.0, 0.2, 1],
              // ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <motion.div style={{ filter: glow }}>
              <Image
                src="/omnixys-original.png"
                alt="Omnixys Logo"
                width={120}
                height={120}
                style={{ marginBottom: 24 }}
              />
            </motion.div>
          </motion.div>
        </Box> */}
        <HeroContent />
      </Box>
    </Box>
  );
};

export default Hero;
