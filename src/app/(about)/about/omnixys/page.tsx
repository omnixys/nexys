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
        minHeight: "100dvh",
        py: { xs: 8, md: 14 },
      }}
    >
      <Container maxWidth="lg">
        {/* ================= HERO ================= */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          sx={{ mb: 10, textAlign: "center" }}
        >
          <Typography
            component="h1"
            sx={{
              fontWeight: 700,
              color: "#fff",
              mb: 3,
              fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
            }}
          >
            Omnixys
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.75)",
              maxWidth: 820,
              mx: "auto",
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
              lineHeight: 1.6,
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

          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
            }}
          >
            Omnixys verfolgt ein klares Ziel:&nbsp;
            <Typography component="span" fontWeight={600}>
              Komplexe Geschäftsprozesse radikal vereinfachen
            </Typography>
            , ohne dabei Flexibilität, Sicherheit oder Zukunftsfähigkeit zu
            opfern.
            <br />
            <br />
            Wir bauen keine Einzellösungen. Wir bauen{" "}
            <Typography component="span" fontWeight={600}>
              digitale Ökosysteme
            </Typography>
            , die mit Unternehmen wachsen.
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
              text: "Fachliche Domänen bestimmen Architektur, Datenhaltung und Technologie – nicht umgekehrt.",
            },
            {
              title: "API- & Event-First",
              text:
                "GraphQL als Vertragsbasis, Events als Rückgrat. " +
                "Lose Kopplung und klare Schnittstellen sind Pflicht, keine Option.",
            },
            {
              title: "Security & Compliance by Design",
              text:
                "Zero-Trust, rollenbasierte Zugriffe, Audit-Trails und Nachvollziehbarkeit " +
                "sind integraler Bestandteil jeder Lösung.",
            },
          ].map((item, i) => (
            <GlassCard key={i} density="compact" sx={{ position: "relative" }}>
              {/* Index */}
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  fontSize: 12,
                  opacity: 0.35,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </Box>

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

          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            Nexys ist die modulare Digitalplattform von Omnixys. Sie vereint
            zentrale Geschäftsdomänen wie Commerce, Banking, Identity, Analytics
            und Messaging in einer hochskalierbaren, serviceorientierten
            Architektur.
            <br />
            <br />
            Jeder Service ist:
          </Typography>

          <Box
            component="ul"
            sx={{
              mt: 2,
              pl: 3,
              color: "rgba(255,255,255,0.85)",
              "& li": {
                mb: 0.5,
                fontSize: "0.95rem",
              },
            }}
          >
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
          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            Omnixys glaubt an langfristige Qualität statt kurzfristiger
            Geschwindigkeit.
            <br />
            <br />
            Wir entwickeln Software mit:
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
            <li>klaren Verantwortlichkeiten</li>
            <li>wartbaren Architekturen</li>
            <li>bewusst gewählten Technologien</li>
            <li>langfristiger Tragfähigkeit</li>
          </Box>

          <Typography
            sx={{
              mt: 3,
              color: "rgba(255,255,255,0.75)",
              fontSize: "0.95rem",
            }}
          >
            Technologie ist für uns kein Selbstzweck – sondern ein Werkzeug, um
            Verantwortung zu übernehmen.
          </Typography>
        </GlassCard>

        <Divider sx={{ my: 10, borderColor: "rgba(255,255,255,0.12)" }} />

        {/* ================= SECTION END ================= */}
        <Typography
          variant="caption"
          align="center"
          sx={{ color: "rgba(255,255,255,0.6)", display: "block" }}
        >
          © {new Date().getFullYear()} Omnixys — Modular gedacht. Innovativ
          verbunden.
        </Typography>
      </Container>
    </Box>
  );
}
