"use client";

import { Box, Container, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const MotionBox = motion(Box);

export default function OmnixysVisionPage() {
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
            Unsere Vision
          </Typography>

          <Typography
            sx={{
              fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
              color: "rgba(255,255,255,0.75)",
              maxWidth: 820,
              lineHeight: 1.6,
            }}
          >
            Omnixys existiert, um digitale Systeme neu zu denken – als
            strukturierte, erweiterbare und langfristig tragfähige Plattformen.
          </Typography>
        </MotionBox>

        {/* ================= PROBLEM ================= */}
        <GlassCard sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Das Problem heutiger Software
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            Viele Unternehmen kämpfen nicht mit fehlender Digitalisierung,
            sondern mit deren Folgen:
          </Typography>

          <Box
            component="ul"
            sx={{
              mt: 2,
              pl: 3,
              color: "rgba(255,255,255,0.8)",
              "& li": { mb: 0.5 },
            }}
          >
            <li>unübersichtliche Systemlandschaften</li>
            <li>gewachsene Monolithen</li>
            <li>enge Kopplung von Fachlichkeit und Technik</li>
            <li>schwer wartbare Integrationen</li>
            <li>fehlende Skalierbarkeit</li>
          </Box>

          <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.75)" }}>
            Software wird zum Risiko – statt zum Wettbewerbsvorteil.
          </Typography>
        </GlassCard>

        {/* ================= ANTWORT ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Die Antwort von Omnixys
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            Unsere Vision ist eine Plattformwelt, in der:
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
            <li>jede Domäne klar abgegrenzt ist</li>
            <li>Systeme unabhängig evolvieren können</li>
            <li>Integration über stabile Verträge erfolgt</li>
            <li>technologische Entscheidungen reversibel bleiben</li>
            <li>Wachstum nicht zu Komplexität führt</li>
          </Box>

          <Typography sx={{ mt: 3, color: "rgba(255,255,255,0.75)" }}>
            Wir glauben an strukturierte Freiheit statt zentraler Kontrolle.
          </Typography>
        </GlassCard>

        {/* ================= LEITGEDANKEN ================= */}
        <Typography variant="h4" fontWeight={700} sx={{ mb: 4, color: "#fff" }}>
          Leitgedanken
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
              title: "Architektur ist Strategie",
              text: "Technische Entscheidungen bestimmen langfristig Organisation, Kosten, Geschwindigkeit und Innovationsfähigkeit.",
            },
            {
              title: "Domänen vor Technologien",
              text: "Technologie folgt der Fachlichkeit – nicht umgekehrt. Jede Domäne verdient ihre optimale Umsetzung.",
            },
            {
              title: "Lose Kopplung ist Voraussetzung",
              text: "Entkopplung ermöglicht Skalierung, Resilienz und unabhängige Weiterentwicklung.",
            },
            {
              title: "Langfristigkeit schlägt Geschwindigkeit",
              text: "Wir optimieren nicht für den nächsten Release, sondern für die nächsten Jahre.",
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

        {/* ================= ZUKUNFT ================= */}
        <GlassCard>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Blick nach vorne
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            Omnixys entwickelt sich kontinuierlich weiter:
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
            <li>neue Domänen ohne Architekturbruch</li>
            <li>stärkere Automatisierung</li>
            <li>KI-gestützte Entscheidungsmodelle</li>
            <li>höhere Beobachtbarkeit</li>
            <li>maximale Transparenz</li>
          </Box>

          <Typography sx={{ mt: 3, color: "rgba(255,255,255,0.75)" }}>
            Unsere Vision endet nicht bei Software – sie beginnt dort.
          </Typography>
        </GlassCard>

        <Divider sx={{ my: 10, borderColor: "rgba(255,255,255,0.12)" }} />

        {/* ================= FOOTER ================= */}
        <Typography
          align="center"
          variant="caption"
          sx={{ color: "rgba(255,255,255,0.6)" }}
        >
          Omnixys Vision — Software, die wächst, ohne zu zerbrechen.
        </Typography>
      </Container>
    </Box>
  );
}
