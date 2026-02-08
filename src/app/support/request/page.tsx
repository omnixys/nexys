/**
 * @file /support/request/page.tsx
 * @description Create a support request
 */

"use client";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { useState } from "react";
import LayoutShell from "@/components/home/layout/LayoutShell";
import { useAuth } from "@/providers/AuthProvider";

const severities = [
  { key: "low", label: "Low", color: "default" },
  { key: "medium", label: "Medium", color: "warning" },
  { key: "high", label: "High", color: "error" },
];

export default function SupportRequestPage() {
  const { user, loading } = useAuth();
  const [severity, setSeverity] = useState("medium");

  return (
    <LayoutShell user={user} loading={loading}>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>
          Create support request
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Tell us what’s wrong — we’ll take it from here.
        </Typography>

        <Stack spacing={3}>
          <TextField label="Subject" fullWidth />
          <TextField label="Describe the issue" fullWidth multiline rows={4} />

          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Severity
            </Typography>
            <Stack direction="row" spacing={1}>
              {severities.map((s) => (
                <Chip
                  key={s.key}
                  label={s.label}
                  color={severity === s.key ? (s.color as any) : "default"}
                  onClick={() => setSeverity(s.key)}
                  clickable
                />
              ))}
            </Stack>
          </Box>

          <Button variant="contained" size="large">
            Submit request
          </Button>
        </Stack>
      </Container>
    </LayoutShell>
  );
}
