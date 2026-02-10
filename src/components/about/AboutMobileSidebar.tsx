"use client";

import { Box, Drawer, IconButton, Typography, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Überblick", href: "/about/omnixys" },
  { label: "Vision", href: "/about/omnixys/vision" },
  { label: "Technologie", href: "/about/omnixys/technology" },
  { label: "Architektur", href: "/about/omnixys/architecture" },
  { label: "Security", href: "/about/omnixys/security" },
  { label: "Compliance", href: "/about/omnixys/compliance" },
  { label: "Careers", href: "/about/omnixys/careers" },
  { label: "History", href: "/about/omnixys/history" },
];

export default function AboutMobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Trigger */}
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1400,
          display: { xs: "block", lg: "none" },
        }}
      >
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            width: 56,
            height: 56,
            backdropFilter: "blur(12px)",
            background: "rgba(20,12,40,0.9)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            boxShadow: "0 0 24px rgba(168,62,180,0.6)",
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Bottom Sheet */}
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            background: "rgba(12,8,28,0.95)",
            backdropFilter: "blur(20px)",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTop: "1px solid rgba(255,255,255,0.12)",
          },
        }}
      >
        <Box sx={{ px: 3, py: 2 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography fontWeight={600} color="#fff">
              Omnixys · Kapitel
            </Typography>

            <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", mb: 2 }} />

          {/* Nav Items */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;

              return (
                <motion.div
                  key={item.href}
                  whileTap={{ scale: 0.97 }}
                  style={{ borderRadius: 10 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      sx={{
                        px: 2,
                        py: 1.4,
                        borderRadius: 2,
                        background: active
                          ? "linear-gradient(90deg, rgba(168,62,180,0.35), rgba(112,66,248,0.35))"
                          : "transparent",
                        border: active
                          ? "1px solid rgba(168,62,180,0.45)"
                          : "1px solid transparent",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: active ? 600 : 400,
                          color: "#fff",
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  </Link>
                </motion.div>
              );
            })}
          </Box>

          {/* Safe Area */}
          <Box sx={{ height: 12 }} />
        </Box>
      </Drawer>
    </>
  );
}
