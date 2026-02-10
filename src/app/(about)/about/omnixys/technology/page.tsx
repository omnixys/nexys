"use client";

import { Box, Container, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const MotionBox = motion(Box);

export default function OmnixysTechnologyPage() {
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
            Technologie & Architektur
          </Typography>

          <Typography
            sx={{
              fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
              color: "rgba(255,255,255,0.75)",
              maxWidth: 900,
              lineHeight: 1.6,
            }}
          >
            Technologie ist für Omnixys kein Selbstzweck. Sie ist ein Werkzeug,
            um stabile, skalierbare und langfristig wartbare Systeme zu bauen.
          </Typography>
        </MotionBox>

        {/* ================= PHILOSOPHIE ================= */}
        <GlassCard sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Unsere Technologie-Philosophie
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            Omnixys folgt einem klaren Grundsatz:
          </Typography>

          <Typography
            sx={{
              mt: 2,
              fontWeight: 600,
              color: "#fff",
              fontSize: "1.05rem",
            }}
          >
            Technologie folgt der Domäne.
          </Typography>

          <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.75)" }}>
            Entscheidungen entstehen nicht aus Trends, sondern aus fachlichen,
            organisatorischen und betrieblichen Anforderungen.
          </Typography>
        </GlassCard>

        {/* ================= PRINZIPIEN ================= */}
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
              title: "Microservice-Isolation",
              text: "Jede Domäne ist ein eigenständiger Service mit eigener Datenbank, eigenem Deployment und klaren Verantwortlichkeiten.",
            },
            {
              title: "API- & GraphQL-First",
              text: "Stabile, typisierte Schnittstellen sind der einzige erlaubte Integrationsweg zwischen Systemen.",
            },
            {
              title: "Event-Driven Communication",
              text: "Asynchrone Prozesse werden über Kafka realisiert, um lose Kopplung und horizontale Skalierung sicherzustellen.",
            },
            {
              title: "Technologische Freiheit",
              text: "Jede Domäne wählt Sprache, Framework und Datenbank selbst – solange die Architekturregeln eingehalten werden.",
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

        {/* ================= STACK ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Technologie-Stack
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
            Nexys setzt bewusst auf einen heterogenen, domänengetriebenen Stack:
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
            <li>Java & Spring Boot für Kern- und Finanzdomänen</li>
            <li>TypeScript & NestJS für Gateways und Business-Services</li>
            <li>Python & FastAPI für Analytics, Events und KI</li>
            <li>GraphQL als zentrales Integrationsprotokoll</li>
            <li>Kafka für asynchrone Kommunikation</li>
            <li>PostgreSQL, MySQL, MongoDB und Redis je nach Anforderung</li>
          </Box>

          <Typography sx={{ mt: 3, color: "rgba(255,255,255,0.75)" }}>
            Keine Technologie ist global vorgeschrieben.
          </Typography>
        </GlassCard>

        {/* ================= QUALITÄT ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Qualität & Betrieb
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
            Technische Exzellenz endet nicht beim Code:
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
            <li>CI/CD-Pipelines pro Service</li>
            <li>versionierte Builds und Artefakte</li>
            <li>strukturierte Logs und Metriken</li>
            <li>Observability mit Prometheus & Grafana</li>
            <li>reproduzierbare Deployments</li>
          </Box>

          <Typography sx={{ mt: 3, color: "rgba(255,255,255,0.75)" }}>
            Betrieb ist integraler Bestandteil der Architektur – nicht ein
            nachgelagerter Schritt.
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
          Omnixys baut keine Technologie-Stacks. Omnixys baut Systeme, die
          wachsen, sich verändern und Bestand haben.
        </Typography>
      </Container>
    </Box>
  );
}
