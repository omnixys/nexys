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
        minHeight: "100vh",
        py: { xs: 8, md: 14 },
      }}
    >
      <Container maxWidth="lg">
        {/* ================= HERO ================= */}
        <MotionBox
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ mb: 10 }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{ color: "#fff", mb: 3 }}
          >
            Technologie & Architektur
          </Typography>

          <Typography
            sx={{
              fontSize: 20,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 900,
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

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Omnixys verfolgt einen klaren Grundsatz:
            <br />
            <br />
            <strong>Technologie folgt der Domäne.</strong>
            <br />
            <br />
            Entscheidungen werden nicht aus Trends, sondern aus fachlichen,
            organisatorischen und betrieblichen Anforderungen abgeleitet.
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
              title: "Microservice-Isolation",
              text:
                "Jede Domäne ist ein eigenständiger Service mit eigener Datenbank, " +
                "eigenem Deployment und klaren Verantwortlichkeiten.",
            },
            {
              title: "API- & GraphQL-First",
              text:
                "Stabile, typisierte Schnittstellen sind der einzige erlaubte " +
                "Integrationsweg zwischen Systemen.",
            },
            {
              title: "Event-Driven Communication",
              text:
                "Asynchrone Prozesse werden über Kafka realisiert, um lose Kopplung " +
                "und Skalierbarkeit sicherzustellen.",
            },
            {
              title: "Technologische Freiheit",
              text:
                "Jede Domäne darf Sprache, Framework und Datenbank frei wählen – " +
                "solange die Architekturregeln eingehalten werden.",
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

        {/* ================= TECHNOLOGIESTACK ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Technologie-Stack
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Nexys setzt bewusst auf einen diversifizierten Stack:
            <br />
            <br />• <strong>Java / Spring Boot</strong> für kritische Kern- &
            Finanzdomänen • <strong>TypeScript / NestJS</strong> für Gateway &
            Business-Services • <strong>Python / FastAPI</strong> für Analytics,
            Events & KI • <strong>GraphQL</strong> als zentrales
            Integrationsprotokoll • <strong>Kafka</strong> für asynchrone
            Kommunikation • <strong>PostgreSQL, MySQL, MongoDB, Redis</strong>{" "}
            je nach Anforderung
            <br />
            <br />
            Keine Technologie ist global vorgeschrieben.
          </Typography>
        </GlassCard>

        {/* ================= QUALITÄT ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Qualität & Betrieb
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Technische Exzellenz endet nicht beim Code:
            <br />
            <br />
            • CI/CD-Pipelines pro Service • versionierte Builds & Artefakte •
            strukturierte Logs & Metriken • Observability via Prometheus &
            Grafana • reproduzierbare Deployments
            <br />
            <br />
            Betrieb ist integraler Bestandteil der Architektur.
          </Typography>
        </GlassCard>

        <Divider sx={{ my: 10, borderColor: "rgba(255,255,255,0.12)" }} />

        {/* ================= FAZIT ================= */}
        <Typography
          align="center"
          sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 720, mx: "auto" }}
        >
          Omnixys baut keine Technologie-Stacks. Omnixys baut Systeme, die
          wachsen, sich verändern und Bestand haben.
        </Typography>
      </Container>
    </Box>
  );
}
