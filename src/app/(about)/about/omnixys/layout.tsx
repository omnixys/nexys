"use client";

import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import AboutChapterOverlay from "@/components/about/AboutChapterOverlay";
import { useScrollPageNavigation } from "@/components/about/useScrollPageNavigation";
import AboutSidebar from "@/components/about/AboutSidebar";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { overlayTitle } = useScrollPageNavigation();

  return (
    <>
      <AboutChapterOverlay title={overlayTitle} />

      <Box sx={{ display: "flex", pt: 10}}>
        <AboutSidebar />

        <Box sx={{ flex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </>
  );
}
