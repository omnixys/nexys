/**
 * @file /security/page.tsx
 * @description Security Center - responsive Bento Grid with modal drill-down
 */

"use client";

import { Container } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import DepthBlurLayer from "../../components/home/DepthBlurLayer";
import LayoutShell from "../../components/home/layout/LayoutShell";
import { useAuth } from "../../providers/AuthProvider";
import SecurityHeader from "./_components/SecurityHeader";
import SecurityGrid from "./_components/SecurityGrid";

export default function SecurityPage() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const [focused, setFocused] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey((k) => k + 1);
    setFocused(null);
  }, [pathname]);

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

        <SecurityHeader />

        <SecurityGrid
          key={animationKey}
          focused={focused}
          setFocused={setFocused}
        />
      </Container>
    </LayoutShell>
  );
}
