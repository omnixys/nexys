/**
 * @file /settings/_components/panels/NotificationsPanel.tsx
 * @description Full Notifications settings panel
 */

"use client";

import {
  Box,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { type: "Email", count: 124, color: "#FF9800" },
  { type: "Push", count: 89, color: "#9C27B0" },
  { type: "SMS", count: 23, color: "#00BCD4" },
];

export default function NotificationsPanel() {
  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <NotificationsIcon sx={{ color: "#FF9800" }} />
        <Box>
          <Typography variant="h6" fontWeight={900}>
            Notifications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage channels, preferences and quiet hours.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.10)" }} />

      <Box sx={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
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

      <Box>
        <Typography fontWeight={900} sx={{ mb: 1 }}>
          Channels
        </Typography>

        <Stack spacing={1}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Email notifications"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Push notifications"
          />
          <FormControlLabel control={<Switch />} label="SMS notifications" />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Marketing updates"
          />
        </Stack>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block" }}
        >
          Quiet hours + per-category notification routing can be added next.
        </Typography>
      </Box>
    </Stack>
  );
}
