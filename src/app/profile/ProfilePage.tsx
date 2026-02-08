/**
 * @file /profile/page.tsx
 * @description Profile page – Bento Grid layout with focus effects
 */

"use client";

import { Box, Stack, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import DepthBlurLayer from "../../components/home/DepthBlurLayer";
import ProfilePersonalInfo from "../../components/profile/PersonalInfoCard";
import ProfileAddressStack from "../../components/profile/ProfileAddressStack";
import ProfileContactsCarousel from "../../components/profile/ProfileContactsCarousel";
import ProfileRoleData from "../../components/profile/ProfileRoleData";
import ProfileStatusStrip from "../../components/profile/ProfileStatusStrip";
import { User } from "@/types/user/user.type";
import RotatingProfileHeadline from "../../components/profile/RotatingProfileHeadline";
import BentoTile from "../../components/home/BentoTile";
import ProfileRoleSpecificInfo from "../../components/profile/ProfileRoleSpecificInfo";
import ProfileStatsTile from "../../components/profile/ProfileStatsTile";

/* =====================================================
   STAGGER CONFIG
===================================================== */

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export default function ProfilePage({ user, isAdmin }: { user: User, isAdmin: boolean }): JSX.Element {
  const pathname = usePathname();
  const [focused, setFocused] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey((k) => k + 1);
    setFocused(null);
  }, [pathname]);

  
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: 1440,
        mx: "auto",
        px: 4,
        py: 4,
      }}
    >
      <RotatingProfileHeadline user={user} />

      <DepthBlurLayer active={focused !== null} />

      <Box
        key={animationKey}
        component={motion.div}
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "80px 220px 320px",
          gap: 3,
          position: "relative",
          zIndex: 1300,
        }}
      >
        {/* ==================================== */}
        {/* TOP BAR – STATUS STRIP (Span 12)     */}
        {/* ==================================== */}
        <BentoTile
          index={0}
          area="1 / 1 / span 1 / span 12"
          focused={focused}
          setFocused={setFocused}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              px: 3,
            }}
          >
            <ProfileStatusStrip completeness={92} user={user} secure />
          </Box>
        </BentoTile>

        {/* ==================================== */}
        {/* ROLE DATA (Span 3)                  */}
        {/* ==================================== */}
        <BentoTile
          index={2}
          area="2 / 1 / span 1 / span 3"
          focused={focused}
          setFocused={setFocused}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <ProfileRoleData user={user} isAdmin={isAdmin} />
          </Box>
        </BentoTile>

        {/* ==================================== */}
        {/* PERSONAL INFO (Span 6) - Doppelt breit */}
        {/* ==================================== */}
        <BentoTile
          index={3}
          area="2 / 4 / span 1 / span 6"
          focused={focused}
          setFocused={setFocused}
          heavy
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              p: 3,
            }}
          >
            <ProfilePersonalInfo user={user} isAdmin={isAdmin} />
          </Box>
        </BentoTile>

        {/* ==================================== */}
        {/* CUSTOMER DETAILS (Span 9) - Großes Main Tile */}
        {/* ==================================== */}
        {user?.customer && (
          <BentoTile
            index={4}
            area="2 / 10 / span 1 / span 3"
            focused={focused}
            setFocused={setFocused}
            heavy
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <ProfileRoleSpecificInfo
                  user={user}
                  // isFocused={focused === 4}
                />
              </Box>
            </Box>
          </BentoTile>
        )}

        {/* ==================================== */}
        {/* ADDRESSES (Span 3) - Rechte Spalte oben */}
        {/* ==================================== */}
        <BentoTile
          index={5}
          area={ "3 / 7 / span 1 / span 6"}
          focused={focused}
          setFocused={setFocused}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <ProfileAddressStack user={user} />
          </Box>
        </BentoTile>

        {/* ==================================== */}
        {/* CONTACTS (Span 3) - Rechte Spalte unten */}
        {/* ==================================== */}
        <BentoTile
          index={6}
          area={"3 / 1 / span 1 / span 6"}
          focused={focused}
          setFocused={setFocused}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <ProfileContactsCarousel user={user} />
          </Box>
        </BentoTile>

        {/* ==================================== */}
        {/* FOOTER STATS (Span 12) - Unten */}
        {/* ==================================== */}
        <BentoTile
          index={7}
          area="4 / 1 / span 1 / span 12"
          focused={focused}
          setFocused={setFocused}
        >
          <ProfileStatsTile user={user} />
        </BentoTile>
      </Box>
    </Container>
  );
}
