/**
 * @file /settings/_components/tiles/NotificationsTile.tsx
 * @description Notifications tile (chart summary) - opens modal
 */

"use client";

import { Box, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";

import BentoTile from "./BentoTile";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { type: "Email", count: 124, color: "#FF9800" },
  { type: "Push", count: 89, color: "#9C27B0" },
  { type: "SMS", count: 23, color: "#00BCD4" },
];

export default function NotificationsTile({
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
  const router = useRouter();

  return (
    <BentoTile
      index={index}
      area={area}
      focused={focused}
      setFocused={setFocused}
      onClick={() => router.push("/settings/notifications")}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <NotificationsIcon sx={{ color: "#FF9800" }} />
            <Typography variant="h6" fontWeight={900}>
              Notifications
            </Typography>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 800 }}
          >
            236 total
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minHeight: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={56}
                outerRadius={78}
                paddingAngle={5}
                dataKey="count"
              >
                {data.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 1 }}>
          {data.map((t) => (
            <Box key={t.type} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: t.color,
                  mb: 0.5,
                  mx: "auto",
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {t.type}
              </Typography>
              <Typography variant="body2" fontWeight={900}>
                {t.count}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </BentoTile>
  );
}
