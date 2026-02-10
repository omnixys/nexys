"use client";

import { Box, Container, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const MotionBox = motion(Box);

export default function ArchitecturePage() {
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
            Architektur
          </Typography>

          <Typography
            sx={{
              fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
              color: "rgba(255,255,255,0.75)",
              maxWidth: 900,
              lineHeight: 1.6,
            }}
          >
            Nexys folgt einer konsequent modularen, domänengetriebenen und
            event-orientierten Architektur. Ziel ist es, komplexe
            Geschäftsplattformen langfristig beherrschbar, skalierbar und
            evolvierbar zu halten.
          </Typography>
        </MotionBox>

        {/* ================= ÜBERBLICK ================= */}
        <GlassCard sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Architektonischer Überblick
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            Die Nexys-Plattform ist als verteiltes System aus klar abgegrenzten
            Domänen konzipiert. Jede Domäne bildet einen eigenständigen
            Microservice mit:
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
            <li>eigener Codebasis</li>
            <li>eigener Datenhaltung</li>
            <li>eigenem Deployment-Lifecycle</li>
            <li>klar definierten Schnittstellen</li>
          </Box>

          <Typography sx={{ mt: 3, color: "rgba(255,255,255,0.75)" }}>
            Dadurch kann jede Domäne unabhängig weiterentwickelt, skaliert und
            betrieben werden.
          </Typography>
        </GlassCard>

        {/* ================= GRUNDPRINZIPIEN ================= */}
        <Typography variant="h4" fontWeight={700} sx={{ mb: 4, color: "#fff" }}>
          Architektonische Grundprinzipien
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
              title: "Microservice-First",
              text: "Jede Fachdomäne ist ein eigenständiger Service. Es existieren keine geteilten Datenbanken oder versteckten Abhängigkeiten.",
            },
            {
              title: "API- & GraphQL-Driven",
              text: "Alle Interaktionen erfolgen über explizite, versionierte APIs. GraphQL dient als zentrales Vertrags- und Integrationsmodell.",
            },
            {
              title: "Event-Driven Communication",
              text: "Asynchrone Prozesse und Zustandsänderungen werden über Kafka propagiert, um lose Kopplung und Skalierbarkeit zu gewährleisten.",
            },
            {
              title: "Zero-Trust-Security",
              text: "Kein Service vertraut implizit einem anderen. Authentifizierung, Autorisierung und Kontextprüfung sind obligatorisch.",
            },
            {
              title: "Cloud- & Container-Native",
              text: "Alle Services sind containerisiert und für den Betrieb in orchestrierten Umgebungen wie Kubernetes ausgelegt.",
            },
            {
              title: "Evolution statt Redesign",
              text: "Die Architektur ist darauf ausgelegt, neue Domänen und Anforderungen ohne grundlegenden Plattformumbau zu integrieren.",
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

        {/* ================= INTEGRATION ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Integration & Kommunikation
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
            Die Integration zwischen Domänen folgt klaren Regeln:
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
            <li>Synchrone Kommunikation ausschließlich über APIs</li>
            <li>Asynchrone Prozesse über Events</li>
            <li>Keine direkten Datenbankzugriffe zwischen Services</li>
            <li>Explizite Ownership für jede Domäne</li>
          </Box>

          <Typography sx={{ mt: 3, color: "rgba(255,255,255,0.75)" }}>
            Dieses Modell verhindert implizite Kopplung und ermöglicht
            kontrollierte Evolution.
          </Typography>
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
          Die Architektur von Nexys ist kein statisches Konstrukt, sondern ein
          belastbares Fundament für kontinuierliches Wachstum – ohne
          Kontrollverlust.
        </Typography>
      </Container>
    </Box>
  );
}
