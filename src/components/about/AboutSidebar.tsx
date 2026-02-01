"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

export default function AboutSidebar() {
  const pathname = usePathname();


  const activeIndex = NAV_ITEMS.findIndex(
    (i) => pathname === i.href,
  );

  const [progress, setProgress] = useState<number>(activeIndex);

  useEffect(() => {
  setProgress(activeIndex >= 0 ? (activeIndex + 1) / NAV_ITEMS.length : 0);
  console.log(activeIndex);
  }, [activeIndex])


  return (
    <Box
      sx={{
        position: "sticky",
        top: 120,
        minWidth: 260,
        pl: 3,
        display: "flex",
        gap: 3,
        zIndex: 1300,
      }}
    >
      {/* PROGRESS LINE */}
      <Box
        sx={{
          position: "relative",
          width: 4,
          borderRadius: 4,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            width: "100%",
            background: "linear-gradient(180deg, #a855f7, #06b6d4)",
          }}
          initial={{ height: 0 }}
          animate={{ height: `${progress * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </Box>

      {/* NAV ITEMS */}
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontSize: 12,
            opacity: 0.6,
            mb: 2,
            pointerEvents: "none",
          }}
        >
          {activeIndex + 1} / {NAV_ITEMS.length}
        </Typography>

        {NAV_ITEMS.map((item, index) => {
          const active = pathname === item.href;

          return (
            <motion.div
              key={item.href}
              whileHover={{ x: 6 }}
              animate={
                active ? { boxShadow: "0 0 24px rgba(168,62,180,0.45)" } : {}
              }
              transition={{ duration: 0.25 }}
              style={{
                borderRadius: 8,
                pointerEvents: "auto", // 👈 wichtig
              }}
            >
              <Link
                href={item.href}
                style={{
                  display: "block",
                  textDecoration: "none",
                }}
              >
                <Typography
                  sx={{
                    py: 1.1,
                    px: 1,
                    fontSize: 14,
                    fontWeight: active ? 600 : 400,
                    color: active ? "#fff" : "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
}
