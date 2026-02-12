import RootProviders from "@/providers/RootProvider";
import { Box } from "@mui/material";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Footer from "../../components/layout/footer/Footer";
import StarsCanvas from "../../components/background/StarBackground";

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
      <RootProviders>
        {children}

        <Footer />
      </RootProviders>
    </Box>
  );
}
