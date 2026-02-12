"use client";

import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import { NavbarLogo } from "./NavbarLogo";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarSocials } from "./NavbarSocials";
import { NavbarMobileDrawer } from "./NavbarMobileDrawer";
import { NavItem } from "./navbar.types";

const ITEMS: NavItem[] = [
  { label: "About me", href: "/about/me" },
  { label: "Home", href: "/" },
  { label: "About Omnixys", href: "/about/omnixys" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > lastY && y > 80) setHidden(true);
    else setHidden(false);
    setLastY(y);
  });

  return (
    <>
      <motion.div
        animate={{
          y: hidden ? -80 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ position: "fixed", width: "100%", zIndex: 50 }}
      >
        <Box
          sx={{
            height: 65,
            px: { xs: 2, md: 5 },
            backgroundColor: "rgba(3, 0, 20, 0.09)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 24px rgba(42, 14, 97, 0.5)",
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <NavbarLogo />

            <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <NavbarLinks items={ITEMS} />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <NavbarSocials />
              <IconButton
                onClick={() => setOpen(true)}
                sx={{ display: { md: "none" }, color: "grey.300" }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </motion.div>

      <NavbarMobileDrawer
        open={open}
        onClose={() => setOpen(false)}
        items={ITEMS}
      />

      {/* Animation */}
      <style jsx global>{`
        @keyframes slowSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
