"use client";

import { Box, Container, Typography, Button, Stack } from "@mui/material";
import BentoTile from "@/components/home/BentoTile";

export default function SessionsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" fontWeight={800} sx={{ mb: 3 }}>
        Active sessions
      </Typography>

      <BentoTile index={0} focused={null} setFocused={() => {}}>
        <Box sx={{ p: 3 }}>
          <Stack spacing={2}>
            <SessionItem
              device="MacBook Pro · Chrome"
              location="Germany"
              lastActive="5 minutes ago"
              current
            />
            <SessionItem
              device="iPhone · App"
              location="Germany"
              lastActive="Yesterday"
            />

            <Button color="error" variant="outlined">
              Log out of all sessions
            </Button>
          </Stack>
        </Box>
      </BentoTile>
    </Container>
  );
}

function SessionItem({
  device,
  location,
  lastActive,
  current,
}: {
  device: string;
  location: string;
  lastActive: string;
  current?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography fontWeight={600}>
          {device} {current && "(This device)"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location} · {lastActive}
        </Typography>
      </Box>
      <Button size="small" color="error">
        Terminate
      </Button>
    </Box>
  );
}
