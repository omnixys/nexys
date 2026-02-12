import StarsCanvas from "@/components/background/StarBackground";
import Footer from "@/components/layout/footer/Footer";
import { Box, createTheme } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Navbar from "@/components/layout/navbar/landing/Navbar";
import RootProvider from "@/providers/RootProvider";

export const metadata: Metadata = {
  title: "Omnixys",
  description:
    "Omnixys is a modular, event-driven platform for building scalable, secure, and domain-driven software systems.",
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
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <StarsCanvas />
      <Navbar />

      <RootProvider>
        {children}

        <Footer isFullSize={true} />
      </RootProvider>
    </Box>
  );
}
