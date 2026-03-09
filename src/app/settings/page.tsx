/**
 * @file /settings/page.tsx
 * @description Settings Dashboard - responsive Bento Grid with modal drill-down
 */

"use client";

import { Container } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DepthBlurLayer from "@/components/home/DepthBlurLayer";
import LayoutShell from "@/components/layout/navbar/home/LayoutShell";
import SettingsDashboardHeader from "@/components/settings/SettingsDashboardHeader";
import SettingsGrid from "@/components/settings/SettingsGrid";
import { useAuth } from "@/providers/AuthProvider";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const [focused, setFocused] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey((k) => k + 1);
    setFocused(null);
  }, []);

  return (
    <LayoutShell user={user} loading={loading}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1440,
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: { xs: 2, md: 4 },
        }}
      >
        <DepthBlurLayer active={focused !== null} />

        <SettingsDashboardHeader />

        <SettingsGrid key={animationKey} focused={focused} setFocused={setFocused} />
      </Container>
    </LayoutShell>
  );
}
