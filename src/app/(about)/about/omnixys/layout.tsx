"use client";

import { Box } from "@mui/material";
import AboutChapterOverlay from "@/components/about/AboutChapterOverlay";
import { useScrollPageNavigation } from "@/components/about/useScrollPageNavigation";
import AboutSidebar from "@/components/about/AboutSidebar";
import AboutMobileSidebar from "@/components/about/AboutMobileSidebar";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { overlayTitle } = useScrollPageNavigation();

  return (
    <>
      <AboutChapterOverlay title={overlayTitle} />

      <Box
        sx={{
          display: "flex",
          pt: 10,
          px: { xs: 2, md: 4, lg: 6 },
          maxWidth: 1400,
          mx: "auto",
        }}
      >
        {/* Desktop Sidebar */}
        <Box
          sx={{
            display: { xs: "none", lg: "block" },
            flexShrink: 0,
          }}
        >
          <AboutSidebar />
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>{children}</Box>
      </Box>

      {/* Mobile Bottom Sheet */}
      <AboutMobileSidebar />
    </>
  );
}
