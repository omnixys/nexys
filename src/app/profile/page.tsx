/**
 * @file page.tsx
 * @description Nexys Home Page – User View
 */

"use client";

import { Box } from "@mui/material";
import LayoutShell from "@/components/home/layout/LayoutShell";
import { JSX } from "react";
import { useAuth } from "@/providers/AuthProvider";
import ProfilePage from "./ProfilePage";
import ProfilePageSkeleton from "./ProfilePageSkeleton";

export default function NexysProfilePage(): JSX.Element {
  const { user, loading, isAdmin } = useAuth()
    const showLoading = loading || !user;
  return (
    <LayoutShell user={user} loading={loading}>
      <Box sx={{ position: "relative" }}>
        {showLoading ? (
          <ProfilePageSkeleton />
        ) : (
          <ProfilePage user={user} isAdmin={isAdmin} />
        )}
      </Box>
    </LayoutShell>
  );
}
