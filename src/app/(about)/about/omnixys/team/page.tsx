"use client";

import { Box, Container, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const MotionBox = motion(Box);

export default function OmnixysTeamPage() {
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
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          sx={{ mb: 10 }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{ color: "#fff", mb: 3 }}
          >
            Das Team hinter Omnixys
          </Typography>

          <Typography
            sx={{
              fontSize: 20,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 900,
            }}
          >
            Omnixys wird von Ingenieurinnen und Ingenieuren entwickelt, die
            Plattformen nicht als Projekte, sondern als langfristige Systeme
            verstehen.
          </Typography>
        </MotionBox>

        {/* ================= ENGINEERING CULTURE ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Engineering-Kultur
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Bei Omnixys steht die technische Exzellenz im Mittelpunkt:
            <br />
            <br />• Architekturentscheidungen werden bewusst und dokumentiert
            getroffen • Qualität hat Vorrang vor Geschwindigkeit • Stabilität
            ist wichtiger als kurzfristige Feature-Gewinne • Wartbarkeit wird
            als Produktmerkmal verstanden
          </Typography>
        </GlassCard>

        {/* ================= TEAM PRINCIPLES ================= */}
        <Typography variant="h4" fontWeight={700} sx={{ mb: 4, color: "#fff" }}>
          Unsere Prinzipien
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
              title: "Ownership statt Übergabe",
              text: "Teams tragen Verantwortung über den gesamten Lebenszyklus eines Services – von Design bis Betrieb.",
            },
            {
              title: "Systemdenken",
              text: "Änderungen werden immer im Kontext des Gesamtsystems betrachtet, nicht isoliert.",
            },
            {
              title: "Explizite Kommunikation",
              text: "Entscheidungen, Annahmen und Risiken werden transparent dokumentiert.",
            },
            {
              title: "Automatisierung als Standard",
              text: "Builds, Tests, Deployments und Monitoring sind vollständig automatisiert.",
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

        {/* ================= ROLES ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Rollen & Verantwortlichkeiten
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Omnixys setzt auf klar definierte Verantwortungsbereiche:
            <br />
            <br />• Plattform-Architekten – Gesamtarchitektur & Governance •
            Backend-Engineers – Domänen- & Service-Implementierung •
            Frontend-Engineers – UX-nahe, performante Oberflächen • DevOps /
            Platform Engineers – CI/CD, Observability, Reliability • Security &
            Compliance – Identität, Zugriff, Audits
          </Typography>
        </GlassCard>

        {/* ================= WORKING STYLE ================= */}
        <GlassCard sx={{ mb: 10 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Arbeitsweise
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}>
            Die Zusammenarbeit basiert auf:
            <br />
            <br />• Asynchroner Kommunikation • Klarem Issue- & Review-Workflow
            • Code-Reviews als Qualitätsinstrument • Dokumentation als Teil der
            Definition of Done
          </Typography>
        </GlassCard>

        <Divider sx={{ my: 10, borderColor: "rgba(255,255,255,0.12)" }} />

        {/* ================= STATEMENT ================= */}
        <Typography
          align="center"
          sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 760, mx: "auto" }}
        >
          Omnixys wird nicht von Hierarchien getragen, sondern von
          Verantwortung, Expertise und einem gemeinsamen Qualitätsanspruch.
        </Typography>
      </Container>
    </Box>
  );
}
