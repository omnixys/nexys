"use client";

import { Box, Typography } from "@mui/material";
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

const Navbar = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        width: "100%",
        height: "65px",
        zIndex: 50,
        px: "40px",
        backgroundColor: "rgba(3, 0, 20, 0.09)", // bg-[#03001417]
        backdropFilter: "blur(12px)", // backdrop-blur-md
        boxShadow: "0 8px 24px rgba(42, 14, 97, 0.5)", // shadow-lg shadow-[#2A0E61]/50
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "auto",
          px: "10px",
        }}
      >
        {/* LEFT: Logo */}
        <Box
          component="a"
          href="#about-me"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "auto",
            height: "auto",
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
              "&:hover": {
                animation: "slowSpin 6s linear infinite",
              },
            }}
          >
            <Image
              src="/omnixys-original.png"
              alt="logo"
              width={50}
              height={50}
            />
          </Box>

          <Typography
            sx={{
              fontWeight: 700,
              ml: "10px",
              display: { xs: "none", md: "block" },
              color: "grey.300",
              whiteSpace: "nowrap",
            }}
          >
            Nexys
          </Typography>
        </Box>

        {/* CENTER: Navigation */}
        <Box
          sx={{
            width: "500px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mr: { md: "80px" }, // md:mr-20
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid rgba(112, 66, 248, 0.38)", // border-[#7042f861]
              backgroundColor: "rgba(3, 0, 20, 0.37)", // bg-[#0300145e]
              mr: "15px",
              px: "20px",
              py: "10px",
              borderRadius: "999px",
              color: "grey.200",
            }}
          >
            {ITEMS.map((item) => (
              <Box
                key={item.href}
                component="a"
                href={item.href}
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: "0.95rem",
                  "&:hover": {
                    opacity: 0.85,
                  },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Box>
        </Box>

        {/* RIGHT: Social Icons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            alignItems: "center",
          }}
        >
          {Socials.map((social) => (
            <Box key={social.name}>
              <Image
                src={social.src}
                alt={social.name}
                width={24}
                height={24}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Local animation */}
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
    </Box>
  );
};

export default Navbar;
