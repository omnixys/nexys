/**
 * @file /settings/_components/tiles/SettingsStatsTile.tsx
 * @description Bottom stats bar tile
 */

"use client";

import { Box } from "@mui/material";
import BentoTile from "./BentoTile";
import StatItem from "./StatItem";

export default function SettingsStatsTile({
  index,
  area,
  focused,
  setFocused,
}: {
  index: number;
  area?: string;
  focused: number | null;
  setFocused: (i: number | null) => void;
}) {
  return (
    <BentoTile
      index={index}
      area={area}
      focused={focused}
      setFocused={setFocused}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          overflowX: "auto",
        }}
      >
        <StatItem
          label="Active Settings"
          value="28"
          change="+3"
          color="#9C27B0"
        />
        <StatItem
          label="Customizations"
          value="12"
          change="+2"
          color="#2196F3"
        />
        <StatItem
          label="Data Stored"
          value="2.8 GB"
          change="+450 MB"
          color="#4CAF50"
        />
        <StatItem
          label="Notifications"
          value="236"
          change="+42"
          color="#FF9800"
        />
        <StatItem label="Last Updated" value="Now" color="#00BCD4" />
      </Box>
    </BentoTile>
  );
}
