/**
 * @file LayoutShell.tsx
 * @description App shell: Navbar + Sidebar + Main content
 */

"use client";

import { Box, useTheme } from "@mui/material";
import GlobalNavbar from "./GlobalNavbar";
import UserSidebar from "./UserSidebar";
import { JSX } from "react";
import { User } from "@/types/user/user.type";

const SIDEBAR_WIDTH = 260;

export default function LayoutShell({
  children,
  loading,
  user,
}: {
    children: React.ReactNode;
    loading: boolean,
  user?: User,
  }): JSX.Element {
  
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0B0B12" }}>
      <GlobalNavbar user={user} loading={loading} />
      <UserSidebar width={SIDEBAR_WIDTH} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 8,
          px: 4,
          py: 4,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
