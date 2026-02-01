"use client";

import { Box, Typography } from "@mui/material";

export default function ArchitecturePage() {
  return (
    <Box sx={{ maxWidth: 900 }}>
      <Typography variant="h3" fontWeight={700} sx={{ mb: 3 }}>
        Architektur
      </Typography>

      <Typography sx={{ opacity: 0.8, mb: 4 }}>
        Nexys folgt einer konsequent modularen, event-getriebenen Architektur.
        Jede Domäne ist isoliert, unabhängig deploybar und besitzt ihre eigene
        Datenhaltung.
      </Typography>

      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Grundprinzipien
      </Typography>

      <ul style={{ opacity: 0.75 }}>
        <li>Microservice-First</li>
        <li>API- & GraphQL-Driven</li>
        <li>Event-Driven Communication (Kafka)</li>
        <li>Zero-Trust-Security</li>
        <li>Cloud- & Container-Native</li>
      </ul>

      <Typography sx={{ mt: 4, opacity: 0.75 }}>
        Diese Architektur ermöglicht es Omnixys, neue Geschäftsdomänen ohne
        Re-Design der Plattform zu integrieren.
      </Typography>
    </Box>
  );
}
