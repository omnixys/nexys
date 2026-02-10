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
            Die Geschichte von Omnixys
          </Typography>

          <Typography
            sx={{
              fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
              color: "rgba(255,255,255,0.75)",
              maxWidth: 900,
              lineHeight: 1.6,
            }}
          >
            Omnixys entstand nicht aus einem Startup-Hype, sondern aus
            wiederholter Erfahrung mit komplexen, gewachsenen
            Softwarelandschaften und deren strukturellen Grenzen.
          </Typography>
        </MotionBox>

        {/* ================= URSPRUNG ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Der Ursprung
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            Die Idee zu Omnixys entstand aus immer wiederkehrenden Problemen,
            die in vielen Unternehmen zu beobachten sind:
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
            <li>monolithische Systeme mit geringer Evolvierbarkeit</li>
            <li>enge Kopplung zwischen fachlichen Domänen</li>
            <li>technologische Entscheidungen, die Innovation bremsen</li>
            <li>unklare Verantwortlichkeiten und fehlende Ownership</li>
          </Box>

          <Typography sx={{ mt: 3, color: "rgba(255,255,255,0.75)" }}>
            Omnixys wurde als Antwort auf diese strukturellen Defizite
            konzipiert – nicht als einzelnes Produkt, sondern als
            Plattformgedanke.
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

          <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
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

        {/* ================= HEUTE ================= */}
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

        {/* ================= FAZIT ================= */}
        <Typography
          align="center"
          sx={{
            color: "rgba(255,255,255,0.6)",
            maxWidth: 820,
            mx: "auto",
            lineHeight: 1.6,
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
