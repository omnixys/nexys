"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { Socials } from "@/constants/socials";

export function NavbarSocials() {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        gap: 2,
        alignItems: "center",
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
  );
}
