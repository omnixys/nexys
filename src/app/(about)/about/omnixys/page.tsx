"use client";

import { Box, Container, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const MotionBox = motion(Box);

export default function AboutOmnixysPage() {
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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ mb: 10, textAlign: "center" }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: "#fff",
              mb: 3,
            }}
          >
            Omnixys
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "rgba(255,255,255,0.75)",
              maxWidth: 820,
              mx: "auto",
            }}
          >
            Wir entwickeln modulare, sichere und skalierbare digitale
            Plattformen für Unternehmen, die Komplexität nicht akzeptieren –
            sondern beherrschen wollen.
          </Typography>
        </MotionBox>

        {/* ================= MISSION ================= */}
        <GlassCard sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Unsere Mission
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 18 }}>
            Omnixys verfolgt ein klares Ziel:
            <strong> Komplexe Geschäftsprozesse radikal vereinfachen</strong>,
            ohne dabei Flexibilität, Sicherheit oder Zukunftsfähigkeit zu
            opfern.
            <br />
            <br />
            Wir bauen keine Einzellösungen. Wir bauen{" "}
            <strong>digitale Ökosysteme</strong>, die mit Unternehmen wachsen.
          </Typography>
        </GlassCard>

        {/* ================= PRINZIPIEN ================= */}
        <Typography variant="h4" fontWeight={700} sx={{ mb: 4, color: "#fff" }}>
          Wofür Omnixys steht
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
              title: "Plattformdenken statt Einzellösungen",
              text:
                "Wir entwickeln modulare Plattformen statt isolierter Anwendungen. " +
                "Jedes Modul ist eigenständig nutzbar und dennoch Teil eines konsistenten Gesamtsystems.",
            },
            {
              title: "Domain-Driven Engineering",
              text:
                "Fachliche Domänen bestimmen Architektur, Datenhaltung und Technologie. " +
                "Nicht umgekehrt.",
            },
            {
              title: "API- & Event-First",
              text:
                "GraphQL als Vertragsbasis, Events als Rückgrat. " +
                "Lose Kopplung und klare Schnittstellen sind keine Option – sie sind Pflicht.",
            },
            {
              title: "Security & Compliance by Design",
              text:
                "Zero-Trust, rollenbasierte Zugriffe, Audit-Trails und Nachvollziehbarkeit " +
                "sind integraler Bestandteil jeder Lösung.",
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

        {/* ================= NEXYS ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Nexys – die Omnixys Plattform
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Nexys ist die modulare Digitalplattform von Omnixys. Sie vereint
            zentrale Geschäftsdomänen wie Commerce, Banking, Identity, Analytics
            und Messaging in einer hochskalierbaren, serviceorientierten
            Architektur.
            <br />
            <br />
            Jeder Service ist:
          </Typography>

          <Box component="ul" sx={{ mt: 2, pl: 3, color: "#fff" }}>
            <li>eigenständig deploybar</li>
            <li>technologisch unabhängig</li>
            <li>klar fachlich abgegrenzt</li>
            <li>über APIs & Events integriert</li>
          </Box>
        </GlassCard>

        {/* ================= HALTUNG ================= */}
        <Typography variant="h4" fontWeight={700} sx={{ mb: 4, color: "#fff" }}>
          Unsere Haltung
        </Typography>

        <GlassCard>
          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Omnixys glaubt an langfristige Qualität statt kurzfristiger
            Geschwindigkeit.
            <br />
            <br />
            Wir entwickeln Software mit:
            <br />
            • klaren Verantwortlichkeiten • wartbaren Architekturen • bewusst
            gewählten Technologien • und dem Anspruch, auch in fünf Jahren noch
            tragfähig zu sein
            <br />
            <br />
            Technologie ist für uns kein Selbstzweck – sondern ein Werkzeug,
            Verantwortung zu übernehmen.
          </Typography>
        </GlassCard>

        <Divider sx={{ my: 10, borderColor: "rgba(255,255,255,0.12)" }} />

        {/* ================= FOOTER ================= */}
        <Typography align="center" sx={{ color: "rgba(255,255,255,0.6)" }}>
          © {new Date().getFullYear()} Omnixys — Modular gedacht. Innovativ
          verbunden.
        </Typography>
      </Container>
    </Box>
  );
}
