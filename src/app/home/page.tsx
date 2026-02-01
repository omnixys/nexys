/**
 * @file page.tsx
 * @description Nexys Home Page – User View
 */

"use client";

import { Box, CssBaseline } from "@mui/material";
import LayoutShell from "./components/layout/LayoutShell";
import { JSX } from "react";
import CommandPalette from "./components/CommandPalette";
import BentoGrid from "./components/BentoGrid";
import { useAuth } from "@/providers/AuthProvider";

export default function NexysHomePage(): JSX.Element {
  const { user, loading } = useAuth()
  
  return (
    <>
      <CssBaseline />
      <LayoutShell user={user} loading={loading}>
        <Box sx={{ position: "relative" }}>
          <CommandPalette />
          <BentoGrid user={user} />
        </Box>
      </LayoutShell>
    </>
  );
}
