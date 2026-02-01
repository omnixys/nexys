"use client";

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import GlassCard from "@/components/ui/GlassCard";

const KPIS = [
  { label: "Deployments", value: 1, suffix: "+", emoji: "🚀" },
  // { label: "Mitarbeiter", value: 14, suffix: "", emoji: "👥" },
  { label: "Microservices", value: 6, suffix: "", emoji: "🧱" },
  // { label: "Aktive Länder", value: 1, suffix: "", emoji: "🌍" },
  { label: "Aktive Nutzer", value: 2, suffix: "", emoji: "🧑‍💻" },
  { label: "Module", value: 1, suffix: "", emoji: "🧩" },
];

// const KPIS = [
//   { label: "Uptime", value: 99.99, suffix: "%", emoji: "🛡️" },
//   { label: "Deployments / Monat", value: 42, suffix: "", emoji: "🚀" },
//   { label: "Kafka Events / Min", value: 128000, suffix: "", emoji: "🔄" },
//   { label: "Ø Response Time", value: 120, suffix: " ms", emoji: "⚡" },
//   { label: "Microservices", value: 18, suffix: "", emoji: "🧱" },
//   { label: "Module", value: 12, suffix: "", emoji: "🧩" },
//   { label: "Error Rate", value: 0.02, suffix: "%", emoji: "🐞" },
//   { label: "Aktive Länder", value: 6, suffix: "", emoji: "🌍" },
// ];



export default function KPISection() {
  return (
    <Box sx={{ py: 10 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: 4,
          maxWidth: 1000,
          mx: "auto",
          px: 2,
        }}
      >
        {KPIS.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <GlassCard
              variant="soft"
              density="compact"
              whileHover={{
                y: -4,
                boxShadow: "0 0 28px rgba(168,62,180,0.45)",
              }}
              sx={{
                textAlign: "center",
                height: "100%",
              }}
            >
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{ color: "#fff", mb: 0.5 }}
              >
                <span style={{ marginRight: 6 }}>{kpi.emoji}</span>
                <CountUp
                  end={kpi.value}
                  duration={2}
                  decimals={kpi.value % 1 !== 0 ? 2 : 0}
                  suffix={kpi.suffix}
                />
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.75)" }}
              >
                {kpi.label}
              </Typography>
            </GlassCard>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
