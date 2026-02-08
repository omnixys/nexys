/**
 * @file page.tsx
 * @description Nexys Home Page – User View
 */

"use client";

import { Box, CssBaseline } from "@mui/material";
import LayoutShell from "@/components/home/layout/LayoutShell";
import { JSX } from "react";
import CommandPalette from "@/components/home/CommandPalette";
import BentoGrid from "@/components/home/BentoGrid";
import { useAuth } from "@/providers/AuthProvider";

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
