/**
 * @file page.tsx
 * @description Nexys Home Page – User View
 */

"use client";

import { Box } from "@mui/material";
import type { JSX } from "react";
import LayoutShell from "@/components/layout/navbar/home/LayoutShell";
import ProfilePage from "@/components/profile/ProfilePage";
import ProfilePageSkeleton from "@/components/profile/ProfilePageSkeleton";
import { useAuth } from "@/providers/AuthProvider";

export default function NexysProfilePage(): JSX.Element {
  const { user, loading, isAdmin } = useAuth();
  const showLoading = loading || !user;
  return (
    <LayoutShell user={user} loading={loading}>
      <Box sx={{ position: "relative" }}>
        {showLoading ? <ProfilePageSkeleton /> : <ProfilePage user={user} isAdmin={isAdmin} />}
      </Box>
    </LayoutShell>
  );
}
