/**
 * @file /support/chat/page.tsx
 * @description Support chat UI
 */

"use client";

import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "@/providers/AuthProvider";
import LayoutShell from "@/components/layout/navbar/home/LayoutShell";

export default function SupportChatPage() {
  const { user, loading } = useAuth();

  return (
    <LayoutShell user={user} loading={loading}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>
          Support chat
        </Typography>

        <Box
          sx={{
            height: 420,
            borderRadius: 3,
            bgcolor: "background.paper",
            p: 3,
            mb: 2,
            overflowY: "auto",
          }}
        >
          <Typography color="text.secondary">
            👋 Hi! How can we help you today?
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField placeholder="Type your message…" fullWidth />
          <IconButton color="primary">
            <SendIcon />
          </IconButton>
        </Box>
      </Container>
    </LayoutShell>
  );
}
