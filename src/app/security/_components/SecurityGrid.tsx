/**
 * @file /security/_components/SecurityGrid.tsx
 * @description Responsive grid that avoids fixed row heights (prevents clipped content)
 */

"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import SecurityScoreTile from "./tiles/SecurityScoreTile";
import SecurityFeaturesTile from "../../settings/_components/tiles/SecurityFeaturesTile";
import ActiveDevicesTile from "../../settings/_components/tiles/ActiveDevicesTile";
import AuthenticationTile from "../../settings/_components/tiles/AuthenticationTile";
import LoginHistoryTile from "../../settings/_components/tiles/LoginHistoryTile";
import QuickActionsTile from "../../settings/_components/tiles/QuickActionsTile";
import SecurityStatsTile from "../../settings/_components/tiles/SecurityStatsTile";

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export default function SecurityGrid({
  focused,
  setFocused,
}: {
  focused: number | null;
  setFocused: (i: number | null) => void;
}) {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const gridTemplateColumns = isLgUp
    ? "repeat(12, 1fr)"
    : isMdUp
      ? "repeat(8, 1fr)"
      : "repeat(4, 1fr)";

  return (
    <Box
      component={motion.div}
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      sx={{
        display: "grid",
        gridTemplateColumns,
        gridAutoRows: "minmax(180px, auto)",
        gap: 3,
        position: "relative",
        zIndex: 100,
      }}
    >
      <SecurityScoreTile
        index={0}
        area={isLgUp ? "auto / span 6" : "auto / span 4"}
        focused={focused}
        setFocused={setFocused}
        heavy
      />
      <SecurityFeaturesTile
        index={1}
        area={
          isLgUp ? "auto / span 6" : isMdUp ? "auto / span 4" : "auto / span 4"
        }
        focused={focused}
        setFocused={setFocused}
      />

      <ActiveDevicesTile
        index={2}
        area={
          isLgUp ? "auto / span 6" : isMdUp ? "auto / span 4" : "auto / span 4"
        }
        focused={focused}
        setFocused={setFocused}
      />
      <LoginHistoryTile
        index={3}
        area={
          isLgUp ? "auto / span 6" : isMdUp ? "auto / span 4" : "auto / span 4"
        }
        focused={focused}
        setFocused={setFocused}
      />

      <AuthenticationTile
        index={4}
        area={isLgUp ? "auto / span 6" : "auto / span 4"}
        focused={focused}
        setFocused={setFocused}
        heavy
      />
      <QuickActionsTile
        index={5}
        area={isLgUp ? "auto / span 6" : "auto / span 4"}
        focused={focused}
        setFocused={setFocused}
      />

      <SecurityStatsTile
        index={6}
        area="auto / span 12"
        focused={focused}
        setFocused={setFocused}
      />
    </Box>
  );
}
