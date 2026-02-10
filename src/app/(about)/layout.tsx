import { Box, createTheme, CssBaseline } from "@mui/material";
import { Inter } from "next/font/google";
import React from "react";
import StarsCanvas from "../../components/landing/StarBackground";

const inter = Inter({ subsets: ["latin"] });

import type { Metadata } from "next";
import Navbar from "../../components/layout/navbar/Navbar";
import RootProvider from "../../providers/RootProvider";

export const metadata: Metadata = {
  title: "About · Omnixys",
  description:
    "Omnixys is a modular software platform designed around domain-driven design, event-driven architecture, and scalable microservices.",
};



const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#030014",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        // backgroundColor: "palette.background",
        backgroundColor: "#030014",
        // overflowY: "auto",
        // overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Global FX / Layout */}
      <StarsCanvas />
      <Navbar />

      {/* Page Content */}
      {children}
    </Box>
  );
}
