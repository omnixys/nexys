/**
 * @file page.tsx
 * @description Nexys Home Page – User View
 */

"use client";

import { Box, CssBaseline } from "@mui/material";
import type { JSX } from "react";
// import CommandPalette from "@/components/home/CommandPalette";
import CommandPalette from "@/components/commands/CommandPalette";
import BentoGrid from "@/components/home/BentoGrid";
import LayoutShell from "@/components/layout/navbar/home/LayoutShell";
import { useAuth } from "@/providers/AuthProvider";

export default function NexysHomePage(): JSX.Element {
  const { user, loading } = useAuth();

  return (
    <LayoutShell user={user} loading={loading}>
      <Box sx={{ position: "relative" }}>
        <CommandPalette />
        <BentoGrid user={user} />
      </Box>
    </LayoutShell>
  );
}
