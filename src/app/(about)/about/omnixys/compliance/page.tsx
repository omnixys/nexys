"use client";

import { Box, Container, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const MotionBox = motion(Box);

export default function OmnixysCompliancePage() {
  return (
    <Box component="main" sx={{ minHeight: "100vh", py: { xs: 8, md: 14 } }}>
      <Container maxWidth="lg">
        {/* ================= HERO ================= */}
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ mb: 10 }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{ color: "#fff", mb: 3 }}
          >
            Compliance & Governance
          </Typography>

          <Typography
            sx={{
              fontSize: 20,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 900,
            }}
          >
            Omnixys wurde nicht nachträglich „compliance-fähig“ gemacht –
            regulatorische Anforderungen sind ein integraler Bestandteil der
            Architektur.
          </Typography>
        </MotionBox>

        {/* ================= PRINCIPLES ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Compliance by Design
          </Typography>

          <Typography sx={{ fontSize: 17, color: "rgba(255,255,255,0.8)" }}>
            Omnixys folgt dem Prinzip „Compliance by Design“.
            <br />
            <br />
            Das bedeutet:
            <br />
            <br />• Trennung von Verantwortlichkeiten auf Service-Ebene •
            Nachvollziehbarkeit aller geschäftskritischen Vorgänge • Keine
            impliziten Abhängigkeiten oder versteckten Datenflüsse • Technische
            Durchsetzbarkeit organisatorischer Regeln
          </Typography>
        </GlassCard>

        {/* ================= REGULATORY ================= */}
        <Typography variant="h4" fontWeight={700} sx={{ mb: 4, color: "#fff" }}>
          Regulatorische Grundlagen
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            mb: 10,
          }}
        >
          {[
            {
              title: "DSGVO / GDPR",
              text: "Datenminimierung, Zweckbindung, Löschkonzepte und klare Verantwortlichkeiten pro Service.",
            },
            {
              title: "Audit & Revisionssicherheit",
              text: "Geschäftskritische Ereignisse sind nachvollziehbar, versioniert und zeitlich eindeutig zuordenbar.",
            },
            {
              title: "Rollen & Berechtigungen",
              text: "Zentrales IAM mit fein granularen Rollen, getrennt nach Fach- und Systemrechten.",
            },
            {
              title: "Trennung von Daten",
              text: "Keine Cross-Service-Datenbankzugriffe. Jeder Service kontrolliert seine Daten vollständig.",
            },
          ].map((item, i) => (
            <GlassCard key={i} density="compact">
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                {item.title}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.75)" }}>
                {item.text}
              </Typography>
            </GlassCard>
          ))}
        </Box>

        {/* ================= GOVERNANCE ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Governance & Kontrolle
          </Typography>

          <Typography sx={{ fontSize: 17, color: "rgba(255,255,255,0.8)" }}>
            Omnixys unterstützt klare Governance-Modelle:
            <br />
            <br />• Trennung von User-, Employee- und Admin-Sichten • Zentrale
            Policy-Durchsetzung • Audit-Logs auf Service-Ebene •
            Nachvollziehbare Änderungen an sicherheitsrelevanten Konfigurationen
          </Typography>
        </GlassCard>

        <Divider sx={{ my: 10, borderColor: "rgba(255,255,255,0.12)" }} />

        {/* ================= CLOSING ================= */}
        <Typography
          align="center"
          sx={{
            maxWidth: 820,
            mx: "auto",
            color: "rgba(255,255,255,0.6)",
            fontSize: 16,
          }}
        >
          Omnixys ist darauf ausgelegt, regulatorische Anforderungen nicht als
          Einschränkung, sondern als architektonische Leitplanke zu nutzen.
        </Typography>
      </Container>
    </Box>
  );
}
