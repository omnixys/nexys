"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";

type FooterItemProps = {
  icon?: React.ReactNode;
  label: string;
  href: string;
};

const FooterItem = ({ icon, label, href }: FooterItemProps) => {
  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        my: 1,
        color: "inherit",
        textDecoration: "none",
        fontSize: "0.9rem",
        opacity: 0.85,
        "&:hover": {
          opacity: 1,
        },
      }}
    >
      {icon && <Box sx={{ fontSize: 18 }}>{icon}</Box>}
      <Typography component="span" fontSize="inherit">
        {label}
      </Typography>
    </Box>
  );
};

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        px: { xs: 2, md: 4, lg: 6 },
        py: 6,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        color: "grey.300",
        backgroundColor: "transparent",
      }}
    >
      {/* CONTENT GRID */}
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 4,
        }}
      >
        {/* COMMUNITY */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              fontSize: "0.875rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Community
          </Typography>

          <FooterItem
            icon={<FaYoutube />}
            label="YouTube"
            href="https://youtube.com"
          />
          <FooterItem
            icon={<RxGithubLogo />}
            label="GitHub"
            href="https://github.com/omnixys"
          />
          <FooterItem
            icon={<RxDiscordLogo />}
            label="Discord"
            href="https://discord.com"
          />
        </Box>

        {/* SOCIAL */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              fontSize: "0.875rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Social
          </Typography>

          <FooterItem
            icon={<RxInstagramLogo />}
            label="Instagram"
            href="https://instagram.com"
          />
          <FooterItem
            icon={<RxTwitterLogo />}
            label="Twitter / X"
            href="https://twitter.com"
          />
          <FooterItem
            icon={<RxLinkedinLogo />}
            label="LinkedIn"
            href="https://linkedin.com"
          />
        </Box>

        {/* ABOUT */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              fontSize: "0.875rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            About
          </Typography>

          <FooterItem label="Become a Sponsor" href="#" />
          <FooterItem label="Learn more about Omnixys" href="/about/omnixys" />
          <FooterItem label="Contact" href="mailto:mifwebchain@gmail.com" />
        </Box>
      </Box>

      {/* COPYRIGHT */}
      <Typography
        variant="caption"
        sx={{
          display: "block",
          textAlign: "center",
          mt: 5,
          opacity: 0.6,
        }}
      >
        © 2026 Omnixys — Modular Thinking. Infinite Possibilities.
      </Typography>
    </Box>
  );
};

export default Footer;
