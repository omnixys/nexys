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
            Arbeiten bei Omnixys
          </Typography>

          <Typography
            sx={{
              fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
              color: "rgba(255,255,255,0.75)",
              maxWidth: 900,
              lineHeight: 1.6,
            }}
          >
            Omnixys ist kein klassisches Softwareunternehmen. Wir bauen
            Plattformen, die langfristig Bestand haben – und suchen Menschen,
            die Verantwortung übernehmen wollen, statt nur Features umzusetzen.
          </Typography>
        </MotionBox>

        {/* ================= KULTUR ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Unsere Engineering-Kultur
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            Bei Omnixys steht Architektur über Geschwindigkeit und
            Nachhaltigkeit über kurzfristigen Erfolg.
          </Typography>

          <Typography sx={{ mt: 3, color: "rgba(255,255,255,0.75)" }}>
            Wir glauben an:
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
            <li>klare Verantwortlichkeiten pro Service</li>
            <li>saubere Schnittstellen statt impliziter Abhängigkeiten</li>
            <li>dokumentierte Entscheidungen (ADR)</li>
            <li>Ownership statt Ticket-Abarbeitung</li>
            <li>Qualität als Standard, nicht als Ausnahme</li>
          </Box>
        </GlassCard>

        {/* ================= WEN WIR SUCHEN ================= */}
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

        {/* ================= ARBEITSWEISE ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Wie wir arbeiten
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
            Unsere Arbeitsweise ist bewusst strukturiert:
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
            <li>kleine, autonome Teams</li>
            <li>klare Domänenverantwortung</li>
            <li>asynchrone Kommunikation</li>
            <li>technische Entscheidungen mit Begründung</li>
            <li>Fokus auf langfristige Wartbarkeit</li>
          </Box>

          <Typography sx={{ mt: 3, color: "rgba(255,255,255,0.75)" }}>
            Wir optimieren nicht für Velocity-Charts, sondern für stabile
            Systeme im produktiven Betrieb.
          </Typography>
        </GlassCard>

        {/* ================= WAS WIR BIETEN ================= */}
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
            "Technologische Vielfalt ohne Dogmen",
            "Hoher Gestaltungsspielraum",
            "Transparente, nachvollziehbare Entscheidungen",
          ].map((benefit, i) => (
            <GlassCard key={i} density="compact">
              <Typography sx={{ color: "rgba(255,255,255,0.85)" }}>
                {benefit}
              </Typography>
            </GlassCard>
          ))}
        </Box>

        <Divider sx={{ my: 10, borderColor: "rgba(255,255,255,0.12)" }} />

        {/* ================= FAZIT ================= */}
        <Typography
          align="center"
          sx={{
            color: "rgba(255,255,255,0.6)",
            maxWidth: 780,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Omnixys sucht keine reinen Implementierer. Wir suchen Menschen, die
          Systeme bauen wollen, die länger halten als der nächste Trend.
        </Typography>
      </Container>
    </Box>
  );
}
