"use client";

import { Box, Container, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const MotionBox = motion(Box);

export default function OmnixysSecurityPage() {
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
            Sicherheit & Vertrauen
          </Typography>

          <Typography
            sx={{
              fontSize: 20,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 900,
            }}
          >
            Sicherheit ist bei Omnixys kein Zusatzmodul. Sie ist ein
            grundlegender Bestandteil jeder Architekturentscheidung.
          </Typography>
        </MotionBox>

        {/* ================= SECURITY PHILOSOPHY ================= */}
        <GlassCard sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Sicherheitsverständnis
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Omnixys verfolgt einen klaren Grundsatz:
            <br />
            <br />
            <strong>Never trust. Always verify.</strong>
            <br />
            <br />
            Jede Anfrage, jeder Service und jede Identität wird geprüft –
            unabhängig davon, ob sie intern oder extern erfolgt.
          </Typography>
        </GlassCard>

        {/* ================= ZERO TRUST ================= */}
        <Typography variant="h4" fontWeight={700} sx={{ mb: 4, color: "#fff" }}>
          Zero-Trust-Architektur
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
              title: "Explizite Authentifizierung",
              text: "Jede Anfrage wird authentifiziert – es existieren keine impliziten Vertrauenszonen.",
            },
            {
              title: "Minimale Berechtigungen",
              text: "Services und Nutzer erhalten ausschließlich die Rechte, die sie tatsächlich benötigen.",
            },
            {
              title: "Service-to-Service Security",
              text: "Auch interne Kommunikation erfolgt authentifiziert und autorisiert.",
            },
            {
              title: "Isolation auf allen Ebenen",
              text: "Services, Datenbanken und Deployments sind strikt voneinander getrennt.",
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

        {/* ================= IDENTITY & ACCESS ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Identity & Access Management
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Identitäten werden zentral verwaltet und systemübergreifend
            durchgesetzt:
            <br />
            <br />• Zentrales IAM (Keycloak-basiert) • Rollen- & Tier-Modell
            (BASIC, ELITE, SUPREME, EMPLOYEE, ADMIN) • Token-basierte
            Authentifizierung (JWT) • Fine-grained Authorization pro Service •
            Trennung von Benutzer- und Service-Identitäten
          </Typography>
        </GlassCard>

        {/* ================= DATA PROTECTION ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Datenschutz & Compliance
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Datenschutz ist integraler Bestandteil der Plattform:
            <br />
            <br />• Datenminimierung & Zweckbindung • Mandantentrennung auf
            Service-Ebene • Zugriffsbeschränkungen auf Datenbank-Ebene •
            Audit-Logs für sicherheitsrelevante Aktionen • DSGVO-konforme
            Prozesse
          </Typography>
        </GlassCard>

        {/* ================= TRANSPORT SECURITY ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Transport- & Kommunikationssicherheit
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Jede Kommunikation ist abgesichert:
            <br />
            <br />• TLS-Verschlüsselung für alle Schnittstellen • Strikte
            Trennung interner & externer Netzwerke • Keine ungesicherten
            Service-Ports • Sichere Secret-Verwaltung
          </Typography>
        </GlassCard>

        <Divider sx={{ my: 10, borderColor: "rgba(255,255,255,0.12)" }} />

        {/* ================= FAZIT ================= */}
        <Typography
          align="center"
          sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 760, mx: "auto" }}
        >
          Omnixys betrachtet Sicherheit nicht als Hindernis, sondern als
          Voraussetzung für Vertrauen, Skalierung und Stabilität.
        </Typography>
      </Container>
    </Box>
  );
}
