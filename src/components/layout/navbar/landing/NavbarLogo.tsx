"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

export function NavbarLogo() {
  return (
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
        <Image src="/logo/omnixys-original.png" alt="logo" width={44} height={44} />
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
  );
}
