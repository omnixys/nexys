"use client";

import { Box, Container, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const MotionBox = motion(Box);

export default function OmnixysCareersPage() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        py: { xs: 8, md: 14 },
      }}
    >
      <Container maxWidth="lg">
        {/* ================= HERO ================= */}
        <MotionBox
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          sx={{ mb: 10 }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{ color: "#fff", mb: 3 }}
          >
            Arbeiten bei Omnixys
          </Typography>

          <Typography
            sx={{
              fontSize: 20,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 900,
            }}
          >
            Omnixys ist kein klassisches Softwareunternehmen. Wir bauen
            Plattformen, die langfristig Bestand haben – und suchen Menschen,
            die genauso denken.
          </Typography>
        </MotionBox>

        {/* ================= ENGINEERING CULTURE ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Unsere Engineering-Kultur
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Bei Omnixys steht Architektur über Geschwindigkeit und
            Nachhaltigkeit über kurzfristigen Erfolg.
            <br />
            <br />
            Wir glauben an:
            <br />
            <br />• klare Verantwortlichkeiten pro Service • saubere
            Schnittstellen statt impliziter Abhängigkeiten • dokumentierte
            Entscheidungen (ADR) • Ownership statt Ticket-Abarbeitung • Qualität
            als Standard, nicht als Ausnahme
          </Typography>
        </GlassCard>

        {/* ================= WHO WE LOOK FOR ================= */}
        <Typography variant="h4" fontWeight={700} sx={{ mb: 4, color: "#fff" }}>
          Wen wir suchen
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
              title: "Software Engineers",
              text: "Menschen, die Systeme verstehen wollen – nicht nur Frameworks. Erfahrung mit Microservices, Datenmodellen und verteilten Architekturen ist willkommen.",
            },
            {
              title: "Backend & Platform Engineers",
              text: "Fokus auf Skalierung, Security, Performance und Stabilität. Kafka, Datenbanken, Cloud und Observability gehören zum Alltag.",
            },
            {
              title: "Frontend Engineers",
              text: "Architektur-bewusste UI-Entwicklung mit Next.js, TypeScript und klaren API-Verträgen.",
            },
            {
              title: "Technische Generalisten",
              text: "Du denkst domänenübergreifend, verstehst Zusammenhänge und willst Verantwortung übernehmen.",
            },
          ].map((role, i) => (
            <GlassCard key={i} density="compact">
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                {role.title}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.75)" }}>
                {role.text}
              </Typography>
            </GlassCard>
          ))}
        </Box>

        {/* ================= HOW WE WORK ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Wie wir arbeiten
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            • Kleine, autonome Teams • Klare Domänenverantwortung • Asynchrone
            Kommunikation • Technische Entscheidungen mit Begründung • Fokus auf
            langfristige Wartbarkeit
            <br />
            <br />
            Wir optimieren nicht für Velocity-Charts, sondern für stabile
            Systeme im Produktivbetrieb.
          </Typography>
        </GlassCard>

        {/* ================= WHAT WE OFFER ================= */}
        <Typography variant="h4" fontWeight={700} sx={{ mb: 4, color: "#fff" }}>
          Was wir bieten
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
            "Arbeit an einer echten Enterprise-Plattform",
            "Architektur-getriebene Entwicklung",
            "Langfristige Produktvision",
            "Technologische Vielfalt",
            "Hoher Gestaltungsspielraum",
            "Transparente Entscheidungen",
          ].map((benefit, i) => (
            <GlassCard key={i} density="compact">
              <Typography sx={{ color: "rgba(255,255,255,0.85)" }}>
                {benefit}
              </Typography>
            </GlassCard>
          ))}
        </Box>

        <Divider sx={{ my: 10, borderColor: "rgba(255,255,255,0.12)" }} />

        {/* ================= CLOSING ================= */}
        <Typography
          align="center"
          sx={{
            color: "rgba(255,255,255,0.6)",
            maxWidth: 780,
            mx: "auto",
            fontSize: 16,
          }}
        >
          Omnixys sucht keine reinen Implementierer. Wir suchen Menschen, die
          Systeme bauen wollen, die länger halten als der nächste Trend.
        </Typography>
      </Container>
    </Box>
  );
}
