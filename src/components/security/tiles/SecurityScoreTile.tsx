/**
 * @file /security/_components/tiles/SecurityScoreTile.tsx
 * @description Security score tile (chart summary) - opens modal
 */

"use client";

import { Box, Chip, Typography, alpha } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import BentoTile from "./BentoTile";
import { useSecurity } from "../SecurityContext";

const securityData = [
  { month: "Jan", score: 75, threats: 3 },
  { month: "Feb", score: 82, threats: 2 },
  { month: "Mar", score: 88, threats: 1 },
  { month: "Apr", score: 85, threats: 2 },
  { month: "May", score: 91, threats: 0 },
  { month: "Jun", score: 94, threats: 0 },
];

export default function SecurityScoreTile({
  index,
  area,
  focused,
  setFocused,
  heavy,
}: {
  index: number;
  area?: string;
  focused: number | null;
  setFocused: (i: number | null) => void;
  heavy?: boolean;
}) {
  const router = useRouter();
  const { state } = useSecurity();

  return (
    <BentoTile
      index={index}
      area={area}
      focused={focused}
      setFocused={setFocused}
      heavy={heavy}
      onClick={() => router.push("/security/score")}
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SecurityIcon sx={{ fontSize: 28, color: "#fff" }} />
            </Box>

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 800, letterSpacing: 0.6 }}
              >
                SECURITY SCORE
              </Typography>

              <Typography
                variant="h2"
                fontWeight={900}
                sx={{
                  background:
                    "linear-gradient(90deg, #2196F3 0%, #00BCD4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: -0.8,
                  lineHeight: 1.05,
                }}
              >
                {state.securityScore}/100
              </Typography>
            </Box>
          </Box>

          <Chip
            label={
              state.securityScore >= 90
                ? "Excellent"
                : state.securityScore >= 75
                  ? "Good"
                  : "Needs attention"
            }
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

        <Box sx={{ flex: 1, minHeight: 140 }}>
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
      </Box>
    </BentoTile>
  );
}
