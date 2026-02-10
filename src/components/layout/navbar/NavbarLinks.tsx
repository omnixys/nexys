"use client";

import Link from "next/link";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NavItem } from "./navbar.types";

export function NavbarLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        gap: { md: 3, lg: 5 },
        px: 4,
        py: 1.2,
        borderRadius: 999,
        border: "1px solid rgba(112, 66, 248, 0.38)",
        backgroundColor: "rgba(3, 0, 20, 0.37)",
        position: "relative",
      }}
    >
      {items.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <Box key={item.href} sx={{ position: "relative" }}>
            {active && (
              <motion.div
                layoutId="nav-active-indicator"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                style={{
                  position: "absolute",
                  inset: -6,
                  borderRadius: 999,
                  background:
                    "linear-gradient(90deg, rgba(112,66,248,0.25), rgba(155,123,255,0.25))",
                }}
              />
            )}

            <Link
              href={item.href}
              prefetch
              style={{
                position: "relative",
                zIndex: 1,
                textDecoration: "none",
                color: active ? "#C5B6FF" : "#D1D5DB",
                fontWeight: active ? 600 : 400,
                fontSize: "0.95rem",
              }}
            >
              {item.label}
            </Link>
          </Box>
        );
      })}
    </Box>
  );
}
