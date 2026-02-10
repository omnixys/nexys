"use client";

import { useState } from "react";
import { Box, Typography, IconButton, Drawer, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { Socials } from "@/constants/socials";

const ITEMS = [
  // { label: "About me", href: "#about-me" },
  // { label: "Skills", href: "#skills" },
  // { label: "Projects", href: "#projects" },
  { label: "About me", href: "/about/me" },
  { label: "Home", href: "/" },
  { label: "About Omnixys", href: "/about/omnixys" },
  // { label: "Projects", href: "#projects" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: 65,
          zIndex: 50,
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
          {/* LEFT: Logo */}
          <Box
            component="a"
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                cursor: "pointer",
                "&:hover": { animation: "slowSpin 6s linear infinite" },
              }}
            >
              <Image
                src="/omnixys-original.png"
                alt="logo"
                width={44}
                height={44}
              />
            </Box>

            <Typography
              sx={{
                ml: 1.5,
                fontWeight: 700,
                color: "grey.300",
                display: { xs: "none", md: "block" },
              }}
            >
              Nexys
            </Typography>
          </Box>

          {/* CENTER: Navigation (desktop / tablet only) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: { md: 3, lg: 5 },
                px: 4,
                py: 1.2,
                borderRadius: 999,
                border: "1px solid rgba(112, 66, 248, 0.38)",
                backgroundColor: "rgba(3, 0, 20, 0.37)",
                color: "grey.200",
              }}
            >
              {ITEMS.map((item) => (
                <Box
                  key={item.href}
                  component="a"
                  href={item.href}
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: "0.95rem",
                    "&:hover": { opacity: 0.85 },
                  }}
                >
                  {item.label}
                </Box>
              ))}
            </Box>
          </Box>

          {/* RIGHT: Socials (desktop) OR Hamburger (mobile) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Desktop Socials */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 2,
              }}
            >
              {Socials.map((social) => (
                <Image
                  key={social.name}
                  src={social.src}
                  alt={social.name}
                  width={22}
                  height={22}
                />
              ))}
            </Box>

            {/* Mobile Menu */}
            <IconButton
              onClick={() => setOpen(true)}
              sx={{ display: { md: "none" }, color: "grey.300" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            backgroundColor: "rgba(3, 0, 20, 0.9)",
            backdropFilter: "blur(16px)",
            color: "grey.200",
          },
        }}
      >
        <Stack spacing={3} sx={{ p: 3 }}>
          {ITEMS.map((item) => (
            <Box
              key={item.href}
              component="a"
              href={item.href}
              onClick={() => setOpen(false)}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "1.05rem",
                fontWeight: 500,
              }}
            >
              {item.label}
            </Box>
          ))}

          <Box sx={{ display: "flex", gap: 2, pt: 2 }}>
            {Socials.map((social) => (
              <Image
                key={social.name}
                src={social.src}
                alt={social.name}
                width={22}
                height={22}
              />
            ))}
          </Box>
        </Stack>
      </Drawer>

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
