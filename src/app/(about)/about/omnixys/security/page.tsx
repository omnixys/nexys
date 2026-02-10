"use client";

import { Box, Container, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const MotionBox = motion(Box);

export default function OmnixysSecurityPage() {
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
          initial={{ opacity: 0, y: 32 }}
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
            Sicherheit & Vertrauen
          </Typography>

          <Typography
            sx={{
              fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
              color: "rgba(255,255,255,0.75)",
              maxWidth: 900,
              lineHeight: 1.6,
            }}
          >
            Sicherheit ist bei Omnixys kein nachträgliches Feature. Sie ist ein
            fundamentales Gestaltungsprinzip – von der ersten
            Architekturentscheidung bis zum operativen Betrieb.
          </Typography>
        </MotionBox>

        {/* ================= PHILOSOPHIE ================= */}
        <GlassCard sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Sicherheitsverständnis
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            Omnixys folgt einem klaren, kompromisslosen Grundsatz:
          </Typography>

          <Typography
            sx={{
              mt: 2,
              fontWeight: 600,
              fontSize: "1.1rem",
              color: "#fff",
            }}
          >
            Never trust. Always verify.
          </Typography>

          <Typography sx={{ mt: 3, color: "rgba(255,255,255,0.75)" }}>
            Jede Identität, jede Anfrage und jeder Service wird überprüft –
            unabhängig davon, ob sie intern oder extern erfolgt. Vertrauen wird
            niemals implizit angenommen, sondern explizit hergestellt.
          </Typography>
        </GlassCard>

        {/* ================= ZERO TRUST ================= */}
        <Typography variant="h4" fontWeight={700} sx={{ mb: 4, color: "#fff" }}>
          Zero-Trust-Architektur
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
              title: "Explizite Authentifizierung",
              text: "Jede Anfrage wird eindeutig authentifiziert. Es existieren keine internen Vertrauenszonen oder impliziten Freigaben.",
            },
            {
              title: "Minimal Privilege",
              text: "Nutzer, Services und Prozesse erhalten ausschließlich die Berechtigungen, die sie zur Ausführung ihrer Aufgabe benötigen.",
            },
            {
              title: "Service-to-Service Security",
              text: "Auch interne Kommunikation unterliegt strikter Authentifizierung und Autorisierung.",
            },
            {
              title: "Isolation auf allen Ebenen",
              text: "Services, Deployments, Datenbanken und Laufzeitumgebungen sind strikt voneinander getrennt.",
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

        {/* ================= IAM ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Identity & Access Management
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
            Identitäten werden zentral verwaltet und konsequent durchgesetzt:
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
            <li>Zentrales Identity Management (Keycloak)</li>
            <li>Rollen- & Tier-Modell (z. B. BASIC, ELITE, ADMIN)</li>
            <li>Token-basierte Authentifizierung (JWT)</li>
            <li>Feingranulare Autorisierung pro Service</li>
            <li>Trennung von Benutzer- und Service-Identitäten</li>
          </Box>
        </GlassCard>

        {/* ================= DATA PROTECTION ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Datenschutz & Compliance
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
            Datenschutz ist integraler Bestandteil der Plattformarchitektur:
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
            <li>Datenminimierung & Zweckbindung</li>
            <li>Mandantentrennung auf Service-Ebene</li>
            <li>Zugriffsbeschränkungen auf Datenbank-Ebene</li>
            <li>Audit-Trails für sicherheitsrelevante Aktionen</li>
            <li>DSGVO-konforme Prozesse</li>
          </Box>
        </GlassCard>

        {/* ================= TRANSPORT ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Transport- & Kommunikationssicherheit
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
            Jede Kommunikation innerhalb und außerhalb der Plattform ist
            abgesichert:
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
            <li>Durchgehende TLS-Verschlüsselung</li>
            <li>Strikte Trennung interner & externer Netzwerke</li>
            <li>Keine ungesicherten Service-Ports</li>
            <li>Zentrale, sichere Secret-Verwaltung</li>
          </Box>
        </GlassCard>

        <Divider sx={{ my: 10, borderColor: "rgba(255,255,255,0.12)" }} />

        {/* ================= FAZIT ================= */}
        <Typography
          align="center"
          sx={{
            color: "rgba(255,255,255,0.6)",
            maxWidth: 760,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Omnixys betrachtet Sicherheit nicht als Bremse, sondern als Grundlage
          für Vertrauen, Stabilität und nachhaltige Skalierung.
        </Typography>
      </Container>
    </Box>
  );
}
