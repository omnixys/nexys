/**
 * @file /support/status/page.tsx
 * @description System status overview
 */

"use client";

import { Box, Container, Typography, Chip, Stack } from "@mui/material";
import LayoutShell from "@/components/home/layout/LayoutShell";
import { useAuth } from "@/providers/AuthProvider";

const services = [
  { name: "Nexys", status: "operational" },
  { name: "Finanxys", status: "operational" },
  { name: "Journeyxys", status: "degraded" },
];

export default function StatusPage() {
  const { user, loading } = useAuth();

  return (
    <LayoutShell user={user} loading={loading}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" fontWeight={800} sx={{ mb: 3 }}>
          System status
        </Typography>

        <Stack spacing={2}>
          {services.map((s) => (
            <Box
              key={s.name}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "background.paper",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight={600}>{s.name}</Typography>
              <Chip
                label={s.status}
                color={s.status === "operational" ? "success" : "warning"}
              />
            </Box>
          ))}
        </Stack>
      </Container>
    </LayoutShell>
  );
}
