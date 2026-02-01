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
            Unsere Vision
          </Typography>

          <Typography
            sx={{
              fontSize: 20,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 820,
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

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Viele Unternehmen kämpfen nicht mit fehlender Digitalisierung,
            sondern mit deren Folgen:
            <br />
            <br />
            • unübersichtliche Systemlandschaften • gewachsene Monolithen • enge
            Kopplung von Fachlichkeit und Technik • schwer wartbare
            Integrationen • fehlende Skalierbarkeit
            <br />
            <br />
            Software wird zum Risiko – statt zum Wettbewerbsvorteil.
          </Typography>
        </GlassCard>

        {/* ================= ANTWORT ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Die Antwort von Omnixys
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Unsere Vision ist eine Plattformwelt, in der:
            <br />
            <br />
            • jede Domäne klar abgegrenzt ist • Systeme unabhängig evolvieren
            können • Integration über stabile Verträge erfolgt • technologische
            Entscheidungen reversibel bleiben • Wachstum nicht zu Komplexität
            führt
            <br />
            <br />
            Wir glauben an **strukturierte Freiheit** statt zentraler Kontrolle.
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
              text:
                "Technische Entscheidungen bestimmen langfristig Organisation, " +
                "Kosten, Geschwindigkeit und Innovationsfähigkeit.",
            },
            {
              title: "Domänen vor Technologien",
              text:
                "Technologie folgt der Fachlichkeit – nicht umgekehrt. " +
                "Jede Domäne verdient ihre optimale Umsetzung.",
            },
            {
              title: "Lose Kopplung ist kein Nice-to-have",
              text:
                "Entkopplung ist die Voraussetzung für Skalierung, Resilienz " +
                "und unabhängige Weiterentwicklung.",
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

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Omnixys entwickelt sich kontinuierlich weiter:
            <br />
            <br />
            • neue Domänen ohne Architekturbruch • stärkere Automatisierung •
            KI-gestützte Entscheidungsmodelle • noch höhere Beobachtbarkeit •
            maximale Transparenz
            <br />
            <br />
            Unsere Vision endet nicht bei Software – sie beginnt dort.
          </Typography>
        </GlassCard>

        <Divider sx={{ my: 10, borderColor: "rgba(255,255,255,0.12)" }} />

        {/* ================= FOOTER ================= */}
        <Typography align="center" sx={{ color: "rgba(255,255,255,0.6)" }}>
          Omnixys Vision — Software, die wächst, ohne zu zerbrechen.
        </Typography>
      </Container>
    </Box>
  );
}
