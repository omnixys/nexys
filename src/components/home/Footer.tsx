"use client";

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";

const SIDEBAR_WIDTH = 80;

const Footer = () => {
  const theme = useTheme();


  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        boxShadow: "0 -8px 24px rgba(0,0,0,0.35)", // shadow-lg
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: `1px solid ${theme.palette.divider}`,
        p: "15px",
        ml: `${SIDEBAR_WIDTH}px`,
        color:
          theme.palette.mode === "dark"
            ? theme.palette.text.primary
            : theme.palette.primary.light,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {/* LINK SECTIONS */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "flex-start",
          }}
        >
          {/* Community */}
          <Box
            sx={{
              minWidth: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
              Community
            </Typography>

            <FooterItem icon={<FaYoutube />} label="Youtube" />
            <FooterItem icon={<RxGithubLogo />} label="Github" />
            <FooterItem icon={<RxDiscordLogo />} label="Discord" />
          </Box>

          {/* Social Media */}
          <Box
            sx={{
              minWidth: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
              Social Media
            </Typography>

            <FooterItem icon={<FaYoutube />} label="Instagram" />
            <FooterItem icon={<RxGithubLogo />} label="Twitter" />
            <FooterItem icon={<RxDiscordLogo />} label="LinkedIn" />
          </Box>

          {/* About */}
          <Box
            sx={{
              minWidth: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
              About
            </Typography>

            <FooterItem label="Become Sponsor" />
            <FooterItem label="Learning about me" />
            <FooterItem label="mifwebchain@gmail.com" />
          </Box>
        </Box>

        {/* COPYRIGHT */}
        <Typography
          sx={{
            mt: "20px",
            fontSize: "15px",
            textAlign: "center",
            color:
              theme.palette.mode === "dark"
                ? theme.palette.text.secondary
                : theme.palette.secondary.light,
          }}
        >
          © 2026 Omnixys – Modular Thinking. Infinite Possibilities.
        </Typography>
      </Box>
    </Box>
  );
};

type FooterItemProps = {
  icon?: React.ReactNode;
  label: string;
};

const FooterItem = ({ icon, label }: FooterItemProps) => {
    const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        my: "15px",
        cursor: "pointer",
        "&:hover": {
          opacity: 0.85,
        },
      }}
    >
      {icon && <Box sx={{ fontSize: "18px" }}>{icon}</Box>}
      <Typography
        sx={{ fontSize: "15px", ml: icon ? "6px" : 0 }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default Footer;
