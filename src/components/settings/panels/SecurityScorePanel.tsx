/**
 * @file /security/_components/panels/SecurityScorePanel.tsx
 * @description Full Security Score panel (used by modal and fallback route)
 */

"use client";

import { Box, Divider, Stack, Typography, Chip, alpha } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSecurity } from "../../security/SecurityContext";

const securityData = [
  { month: "Jan", score: 75, threats: 3 },
  { month: "Feb", score: 82, threats: 2 },
  { month: "Mar", score: 88, threats: 1 },
  { month: "Apr", score: 85, threats: 2 },
  { month: "May", score: 91, threats: 0 },
  { month: "Jun", score: 94, threats: 0 },
];

export default function SecurityScorePanel() {
  const { state } = useSecurity();

  const grade =
    state.securityScore >= 90
      ? "Excellent"
      : state.securityScore >= 75
        ? "Good"
        : "Needs attention";

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <SecurityIcon sx={{ color: "#2196F3" }} />
        <Box>
          <Typography variant="h6" fontWeight={900}>
            Security Score
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Trend, threat signals and improvement recommendations.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.10)" }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h3" fontWeight={950} sx={{ letterSpacing: -0.8 }}>
          {state.securityScore}/100
        </Typography>

        <Chip
          label={grade}
          sx={{
            bgcolor: alpha(
              state.securityScore >= 90 ? "#4CAF50" : "#FF9800",
              0.2,
            ),
            color: state.securityScore >= 90 ? "#4CAF50" : "#FF9800",
            fontWeight: 900,
          }}
        />
      </Box>

      <Box sx={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={securityData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="month"
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
            />
            <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 8,
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#2196F3"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 2,
        }}
      >
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.12)",
            bgcolor: "rgba(255,255,255,0.04)",
          }}
        >
          <Typography fontWeight={900} sx={{ mb: 0.5 }}>
            Key Risks
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Recent blocked attempt from unfamiliar location, review devices and
            enable device approval.
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.12)",
            bgcolor: "rgba(255,255,255,0.04)",
          }}
        >
          <Typography fontWeight={900} sx={{ mb: 0.5 }}>
            Recommended Next Steps
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enable session timeout and device approval, then review recovery
            options.
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}
