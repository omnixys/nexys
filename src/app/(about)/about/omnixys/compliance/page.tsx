"use client";

import { Box, Container, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const MotionBox = motion(Box);

export default function OmnixysCompliancePage() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100dvh",
        py: { xs: 8, md: 14 },
      }}
    >
      <Container maxWidth="lg">
        {/* ================= HERO ================= */}
        <MotionBox
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          sx={{ mb: 10 }}
        >
          <Typography
            component="h1"
            sx={{
              fontWeight: 700,
              color: "#fff",
              mb: 3,
              fontSize: "clamp(2.2rem, 4.5vw, 3.25rem)",
            }}
          >
            Compliance & Governance
          </Typography>

          <Typography
            sx={{
              fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
              color: "rgba(255,255,255,0.75)",
              maxWidth: 900,
              lineHeight: 1.6,
            }}
          >
            Omnixys wurde nicht nachträglich compliance-fähig gemacht.
            Regulatorische Anforderungen sind von Beginn an integraler
            Bestandteil der Architektur.
          </Typography>
        </MotionBox>

        {/* ================= COMPLIANCE BY DESIGN ================= */}
        <GlassCard sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Compliance by Design
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.7,
              fontSize: "1rem",
            }}
          >
            Omnixys folgt dem Prinzip <strong>Compliance by Design</strong>.
            Regeln, Zuständigkeiten und regulatorische Anforderungen sind
            technisch durchsetzbar – nicht dokumentationsabhängig.
          </Typography>

          <Typography sx={{ mt: 3, color: "rgba(255,255,255,0.75)" }}>
            Compliance entsteht nicht durch Prozesse allein, sondern durch eine
            Architektur, die Fehlverhalten strukturell verhindert.
          </Typography>
        </GlassCard>

        {/* ================= REGULATORISCHE BASIS ================= */}
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
              text: "Datenminimierung, Zweckbindung, Löschkonzepte und klare Verantwortlichkeiten pro Domäne.",
            },
            {
              title: "Audit- & Revisionssicherheit",
              text: "Geschäftskritische Ereignisse sind nachvollziehbar, versioniert und zeitlich eindeutig zuordenbar.",
            },
            {
              title: "Rollen & Berechtigungen",
              text: "Zentrales Identity & Access Management mit klarer Trennung von Fach- und Systemrechten.",
            },
            {
              title: "Datenhoheit pro Service",
              text: "Jeder Service besitzt vollständige Kontrolle über seine Daten – ohne Cross-Service-Zugriffe.",
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

          <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
            Omnixys unterstützt klare, durchsetzbare Governance-Modelle:
          </Typography>

          <Box
            component="ul"
            sx={{
              mt: 2,
              pl: 3,
              color: "rgba(255,255,255,0.85)",
              "& li": { mb: 0.5 },
            }}
          >
            <li>Trennung von User-, Employee- und Admin-Sichten</li>
            <li>Zentrale Policy-Durchsetzung</li>
            <li>Audit-Logs auf Service- & Ereignisebene</li>
            <li>
              Nachvollziehbare Änderungen an sicherheitsrelevanten
              Konfigurationen
            </li>
          </Box>

          <Typography sx={{ mt: 3, color: "rgba(255,255,255,0.75)" }}>
            Governance wird nicht manuell kontrolliert, sondern technisch
            erzwungen.
          </Typography>
        </GlassCard>

        {/* ================= ORGANISATORISCHE WIRKUNG ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Organisatorische Wirkung
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
            Die Architektur von Omnixys ermöglicht:
            <br />
            <br />• klare Verantwortlichkeiten pro Domäne • reduzierte
            Prüfaufwände • reproduzierbare Audits • geringere regulatorische
            Risiken • skalierbare Compliance auch bei wachsender Organisation
          </Typography>
        </GlassCard>

        <Divider sx={{ my: 10, borderColor: "rgba(255,255,255,0.12)" }} />

        {/* ================= FAZIT ================= */}
        <Typography
          align="center"
          sx={{
            maxWidth: 820,
            mx: "auto",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.6,
          }}
        >
          Omnixys versteht Compliance nicht als Einschränkung, sondern als
          architektonische Leitplanke für nachhaltige, vertrauenswürdige
          Systeme.
        </Typography>
      </Container>
    </Box>
  );
}
