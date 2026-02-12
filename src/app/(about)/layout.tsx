import { Box, createTheme } from "@mui/material";
import { Inter } from "next/font/google";
import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar/landing/Navbar";
import StarsCanvas from "@/components/background/StarBackground";

export const metadata: Metadata = {
  title: "About · Omnixys",
  description:
    "Omnixys is a modular software platform designed around domain-driven design, event-driven architecture, and scalable microservices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#030014",
        position: "relative",
      }}
    >
      <StarsCanvas />
      <Navbar />
      {children}
    </Box>
  );
}
