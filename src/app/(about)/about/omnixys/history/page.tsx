"use client";

import { Box, Container, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const MotionBox = motion(Box);

export default function OmnixysHistoryPage() {
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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          sx={{ mb: 10 }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{ color: "#fff", mb: 3 }}
          >
            Die Geschichte von Omnixys
          </Typography>

          <Typography
            sx={{
              fontSize: 20,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 900,
            }}
          >
            Omnixys entstand nicht aus einem Startup-Hype, sondern aus der
            praktischen Erfahrung mit komplexen Software- und
            Systemlandschaften.
          </Typography>
        </MotionBox>

        {/* ================= ORIGIN ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Der Ursprung
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Die Idee zu Omnixys entstand aus wiederkehrenden Problemen, die in
            vielen Unternehmen zu beobachten sind:
            <br />
            <br />
            • monolithische Systeme, die kaum noch erweiterbar sind • enge
            Kopplung zwischen fachlichen Domänen • technologische
            Entscheidungen, die Innovation bremsen • fehlende Trennung von
            Verantwortung und Ownership
            <br />
            <br />
            Omnixys wurde als Antwort auf diese strukturellen Defizite
            konzipiert – nicht als Produkt, sondern als Plattform.
          </Typography>
        </GlassCard>

        {/* ================= EVOLUTION ================= */}
        <Typography variant="h4" fontWeight={700} sx={{ mb: 4, color: "#fff" }}>
          Evolution statt Rebuild
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
              title: "Von Anfang an modular",
              text: "Omnixys wurde von Beginn an als modulares System entworfen. Jede Domäne ist eigenständig, ersetzbar und unabhängig deploybar.",
            },
            {
              title: "Architektur vor Features",
              text: "Neue Funktionen entstehen nur, wenn sie sich sauber in die bestehende Architektur einfügen. Stabilität geht vor Geschwindigkeit.",
            },
            {
              title: "Bewusste Technologievielfalt",
              text: "Unterschiedliche Domänen erfordern unterschiedliche Technologien. Omnixys erzwingt keine Einheitslösung.",
            },
            {
              title: "Produktionsrealität als Maßstab",
              text: "Entscheidungen werden nicht theoretisch, sondern anhand realer Betriebsanforderungen getroffen.",
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
            Von Omnixys zu Nexys
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Nexys ist die konsequente Weiterentwicklung der Omnixys-Idee.
            <br />
            <br />
            Während Omnixys die organisatorische und architektonische Grundlage
            bildet, ist Nexys die konkrete, produktive
            Plattform-Implementierung.
            <br />
            <br />
            Nexys vereint Commerce, Banking, Finance, Travel, Analytics und
            Identity in einer gemeinsamen, aber strikt modularen
            Systemlandschaft.
          </Typography>
        </GlassCard>

        {/* ================= TODAY ================= */}
        <Typography variant="h4" fontWeight={700} sx={{ mb: 4, color: "#fff" }}>
          Omnixys heute
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
            "Enterprise-orientierte Plattformarchitektur",
            "Fokus auf Stabilität, Sicherheit und Wartbarkeit",
            "Klare Trennung von Domänen und Verantwortlichkeiten",
            "Technologie als Mittel, nicht als Selbstzweck",
          ].map((point, i) => (
            <GlassCard key={i} density="compact">
              <Typography sx={{ color: "rgba(255,255,255,0.85)" }}>
                {point}
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
            maxWidth: 820,
            mx: "auto",
            fontSize: 16,
          }}
        >
          Omnixys ist kein kurzfristiges Projekt. Es ist das Ergebnis bewusster
          Entscheidungen, technischer Erfahrung und dem Anspruch, Systeme zu
          bauen, die langfristig bestehen.
        </Typography>
      </Container>
    </Box>
  );
}
