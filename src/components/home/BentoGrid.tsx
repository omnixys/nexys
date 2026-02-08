/**
 * @file BentoGrid.tsx
 * @description Bento Grid with staggered entry + re-animate on return
 */

"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { JSX, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import DepthBlurLayer from "./DepthBlurLayer";
import BentoTile from "./BentoTile";

import InboxTile from "./tiles/InboxTile2";
import CalendarTile from "./tiles/CalendarTile";
import WeatherTile from "./tiles/WeatherTile";
import StaticTile from "./tiles/StaticTile";
import TypingHeadline from "./TypingHeadline";
import ProductsTile from "./tiles/ProductsTile";
import { User } from "../../../types/user/user.type";
import { useTranslations } from "next-intl";

/* =====================================================
   STAGGER CONFIG
===================================================== */

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export default function BentoGrid({ user }: { user?: User }): JSX.Element {
  const t = useTranslations("home");
  const pathname = usePathname();
  const [focused, setFocused] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  /* -----------------------------------------------
     Re-animate when returning to this route
  ------------------------------------------------ */
  useEffect(() => {
    setAnimationKey((k) => k + 1);
    setFocused(null);
  }, [pathname]);

    const name =
      user?.personalInfo?.firstName ?? user?.username ?? "there";

  return (
    <>
      <TypingHeadline
        text={t("welcome", { name })}
        variant="h3"
        speed={55}
        delay={250}
      />

      <DepthBlurLayer active={focused !== null} />

      <Box
        key={animationKey}
        component={motion.div}
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "140px 220px 220px 180px",
          gap: 3,
          mt: 4,
          position: "relative",
          zIndex: 1300,
        }}
      >
        <BentoTile index={0} focused={focused} setFocused={setFocused}>
          <StaticTile title={t("news")} />
        </BentoTile>

        <BentoTile index={1} focused={focused} setFocused={setFocused}>
          <InboxTile />
        </BentoTile>

        <BentoTile index={2} focused={focused} setFocused={setFocused}>
          <WeatherTile />
        </BentoTile>

        <BentoTile
          index={3}
          area="2 / 1 / span 2 / span 2"
          focused={focused}
          setFocused={setFocused}
          heavy
        >
          <ProductsTile isFocused={focused === 3} />
        </BentoTile>

        <BentoTile index={4} focused={focused} setFocused={setFocused}>
          <StaticTile title={t("notes")} />
        </BentoTile>

        <BentoTile
          index={5}
          area="3 / 3 / span 2 / span 1"
          focused={focused}
          setFocused={setFocused}
          heavy
        >
          <CalendarTile />
        </BentoTile>

        <BentoTile
          index={6}
          area="4 / 1 / span 1 / span 2"
          focused={focused}
          setFocused={setFocused}
        >
          <StaticTile title={t("recommendation")} />
        </BentoTile>
      </Box>
    </>
  );
}
