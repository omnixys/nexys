"use client";

import { Box, useMediaQuery, useTheme, IconButton } from "@mui/material";
import GlobalNavbar from "./GlobalNavbar";
import { JSX, useState } from "react";
import { User } from "@/types/user/user.type";
import UserSidebar from "../../layout/sidebar/UserSidebar";
import MobileSidebarSheet from "./MobileSidebarSheet";
import MenuIcon from "@mui/icons-material/Menu";

const SIDEBAR_WIDTH = 260;

export default function LayoutShell({
  children,
  loading,
  user,
}: {
  children: React.ReactNode;
  loading: boolean;
  user?: User;
}): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0B0B12" }}>
      <GlobalNavbar user={user} loading={loading} />

      {/* Desktop Sidebar */}
      {!isMobile && <UserSidebar width={SIDEBAR_WIDTH} />}

      {/* Mobile Bottom Sheet */}
      {isMobile && (
        <MobileSidebarSheet
          open={sheetOpen}
          onOpen={() => setSheetOpen(true)}
          onClose={() => setSheetOpen(false)}
        />
      )}

      {/* Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 8,
          px: isMobile ? 2 : 4,
          py: 4,
        }}
      >
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            onClick={() => setSheetOpen(true)}
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              zIndex: 1500,
              bgcolor: "rgba(20,12,40,0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 0 24px rgba(168,62,180,0.6)",
              "&:hover": {
                boxShadow: "0 0 36px rgba(168,62,180,0.9)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {children}
      </Box>
    </Box>
  );
}
