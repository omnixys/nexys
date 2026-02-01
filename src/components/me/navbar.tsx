"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import NavLink from "./navLink";

const MotionBox = motion(Box);

const links = [
  { url: "/me/", title: "Home" },
  { url: "/me/about", title: "About" },
  { url: "/me/portfolio", title: "Portfolio" },
  { url: "/me/contact", title: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const topVariants = {
    closed: { rotate: 0 },
    opened: { rotate: 45, backgroundColor: "rgb(255,255,255)" },
  };

  const centerVariants = {
    closed: { opacity: 1 },
    opened: { opacity: 0 },
  };

  const bottomVariants = {
    closed: { rotate: 0 },
    opened: { rotate: -45, backgroundColor: "rgb(255,255,255)" },
  };

  const listVariants = {
    closed: { x: "100vw" },
    opened: {
      x: 0,
      transition: { when: "beforeChildren", staggerChildren: 0.2 },
    },
  };

  const listItemVariants = {
    closed: { x: -10, opacity: 0 },
    opened: { x: 0, opacity: 1 },
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, sm: 4, md: 6, lg: 10, xl: 24 },
        fontSize: "1.25rem",
      }}
    >
      {/* LINKS (Desktop) */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          gap: 2,
          width: "33.333%",
        }}
      >
        {links.map((link) => (
          <NavLink link={link} key={link.title} />
        ))}
      </Box>

      {/* LOGO */}
      <Box
        sx={{
          display: { xs: "none", md: "none", lg: "flex" },
          width: { xl: "33.333%" },
          justifyContent: { xl: "center" },
        }}
      >
        <Link href="/me/" style={{ textDecoration: "none" }}>
          <Box
            sx={{
              fontSize: "0.875rem",
              bgcolor: "black",
              borderRadius: 1,
              p: 0.5,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="white" mr={0.5}>
              Caleb
            </Typography>
            <Box
              sx={{
                width: 48,
                height: 32,
                borderRadius: 1,
                bgcolor: "white",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Gyamfi
            </Box>
          </Box>
        </Link>
      </Box>

      {/* SOCIAL (Desktop) */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          gap: 2,
          width: "33.333%",
        }}
      >
        {[
          "/socials/github.png",
          "/socials/dribbble.png",
          "/socials/instagram.png",
          "/socials/facebook.png",
          "/socials/pinterest.png",
          "/socials/linkedin.png",
        ].map((src) => (
          <Link href="/me/" key={src}>
            <Image src={src} alt="" width={24} height={24} />
          </Link>
        ))}
      </Box>

      {/* MOBILE MENU */}
      <Box sx={{ display: { md: "none" } }}>
        {/* BURGER BUTTON */}
        <IconButton
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            width: 40,
            height: 32,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 50,
          }}
        >
          <MotionBox
            variants={topVariants}
            animate={open ? "opened" : "closed"}
            sx={{
              width: 40,
              height: 4,
              bgcolor: "black",
              borderRadius: 1,
              transformOrigin: "left",
            }}
          />
          <MotionBox
            variants={centerVariants}
            animate={open ? "opened" : "closed"}
            sx={{
              width: 40,
              height: 4,
              bgcolor: "black",
              borderRadius: 1,
            }}
          />
          <MotionBox
            variants={bottomVariants}
            animate={open ? "opened" : "closed"}
            sx={{
              width: 40,
              height: 4,
              bgcolor: "black",
              borderRadius: 1,
              transformOrigin: "left",
            }}
          />
        </IconButton>

        {/* FULLSCREEN MENU */}
        {open && (
          <MotionBox
            variants={listVariants}
            initial="closed"
            animate="opened"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100vw",
              height: "100vh",
              bgcolor: "black",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              fontSize: "2.25rem",
              zIndex: 40,
            }}
          >
            {links.map((link) => (
              <motion.div key={link.title} variants={listItemVariants}>
                <Link
                  href={link.url}
                  style={{ color: "white", textDecoration: "none" }}
                  onClick={() => setOpen(false)}
                >
                  {link.title}
                </Link>
              </motion.div>
            ))}
          </MotionBox>
        )}
      </Box>
    </Box>
  );
}
