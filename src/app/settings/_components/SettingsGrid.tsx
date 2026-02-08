/**
 * @file /settings/_components/SettingsGrid.tsx
 * @description Responsive grid that avoids fixed row heights (prevents clipped content)
 */

"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";

import SettingsOverviewTile from "./tiles/SettingsOverviewTile";
import QuickSettingsTile from "./tiles/QuickSettingsTile";
import AppearanceTile from "./tiles/AppearanceTile";
import LanguageTile from "./tiles/LanguageTile";
import NotificationsTile from "./tiles/NotificationsTile";
import DataManagementTile from "./tiles/DataManagementTile";
import AdvancedSettingsTile from "./tiles/AdvancedSettingsTile";
import SettingsStatsTile from "./tiles/SettingsStatsTile";

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export default function SettingsGrid({
  focused,
  setFocused,
}: {
  focused: number | null;
  setFocused: (i: number | null) => void;
}) {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // Grid strategy:
  // - Use auto rows instead of fixed row template.
  // - Provide “areas” only for large screens.
  // - On smaller screens, stack tiles naturally with full width.
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
        zIndex: 1300,
      }}
    >
      {/* Large-screen area layout */}
      <SettingsOverviewTile
        index={0}
        area={isLgUp ? "auto / span 6" : "auto / span 4"}
        focused={focused}
        setFocused={setFocused}
      />
      <QuickSettingsTile
        index={1}
        area={
          isLgUp ? "auto / span 6" : isMdUp ? "auto / span 4" : "auto / span 4"
        }
        focused={focused}
        setFocused={setFocused}
      />

      <AppearanceTile
        index={2}
        area={
          isLgUp ? "auto / span 4" : isMdUp ? "auto / span 4" : "auto / span 4"
        }
        focused={focused}
        setFocused={setFocused}
      />
      <LanguageTile
        index={3}
        area={
          isLgUp ? "auto / span 4" : isMdUp ? "auto / span 4" : "auto / span 4"
        }
        focused={focused}
        setFocused={setFocused}
      />
      <NotificationsTile
        index={4}
        area={
          isLgUp ? "auto / span 4" : isMdUp ? "auto / span 8" : "auto / span 4"
        }
        focused={focused}
        setFocused={setFocused}
      />

      <DataManagementTile
        index={5}
        area={isLgUp ? "auto / span 6" : "auto / span 4"}
        focused={focused}
        setFocused={setFocused}
        heavy
      />
      <AdvancedSettingsTile
        index={6}
        area={isLgUp ? "auto / span 6" : "auto / span 4"}
        focused={focused}
        setFocused={setFocused}
      />

      <SettingsStatsTile
        index={7}
        area="auto / span 12"
        focused={focused}
        setFocused={setFocused}
      />
    </Box>
  );
}
