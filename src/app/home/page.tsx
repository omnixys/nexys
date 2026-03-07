/**
 * @file page.tsx
 * @description Nexys Home Page – User View
 */

"use client";

import { Box, CssBaseline } from "@mui/material";
import { JSX } from "react";
import BentoGrid from "@/components/home/BentoGrid";
import { useAuth } from "@/providers/AuthProvider";
import LayoutShell from "@/components/layout/navbar/home/LayoutShell";
// import CommandPalette from "@/components/home/CommandPalette";
import CommandPalette from "@/components/commands/CommandPalette";

export default function NexysHomePage(): JSX.Element {
  const { user, loading } = useAuth()
  
  return (
    <LayoutShell user={user} loading={loading}>
      <Box sx={{ position: "relative" }}>
        <CommandPalette />
        <BentoGrid user={user} />
      </Box>
    </LayoutShell>
  );
}
