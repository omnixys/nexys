/**
 * @file /support/feedback/page.tsx
 * @description Product feedback page
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

const categories = ["Bug", "Feature request", "UX", "Performance", "Other"];

export default function FeedbackPage() {
  const { user, loading } = useAuth();
  const [category, setCategory] = useState("Feature request");

  return (
    <LayoutShell user={user} loading={loading}>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>
          Product feedback
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Help us make Omnixys better.
        </Typography>

        <Stack spacing={3}>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Category
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {categories.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  clickable
                  color={category === c ? "primary" : "default"}
                  onClick={() => setCategory(c)}
                />
              ))}
            </Stack>
          </Box>

          <TextField label="Your feedback" multiline rows={4} fullWidth />

          <Button variant="contained" size="large">
            Submit feedback
          </Button>
        </Stack>
      </Container>
    </LayoutShell>
  );
}
