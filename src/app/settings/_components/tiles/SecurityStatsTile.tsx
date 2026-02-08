/**
 * @file /security/_components/tiles/SecurityStatsTile.tsx
 * @description Bottom security stats tile
 */

"use client";

import { Box } from "@mui/material";
import BentoTile from "./BentoTile";
import StatItem from "./StatItem";

export default function SecurityStatsTile({
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
          label="Total Logins"
          value="1,247"
          change="+12%"
          color="#2196F3"
        />
        <StatItem
          label="Blocked Attempts"
          value="3"
          change="-75%"
          color="#FF5252"
        />
        <StatItem label="Devices" value="4" change="+1" color="#4CAF50" />
        <StatItem label="Alerts" value="2" change="0" color="#FF9800" />
        <StatItem label="Last Audit" value="Today" color="#9C27B0" />
      </Box>
    </BentoTile>
  );
}
