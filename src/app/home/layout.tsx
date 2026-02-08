import Footer from "@/components/home/Footer";
import StarsCanvas from "@/components/landing/StarBackground";
import RootProviders from "@/providers/RootProvider";
import { Box } from "@mui/material";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

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
        // backgroundColor: "palette.background",
        backgroundColor: "#030014",
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Global FX / Layout */}
      <StarsCanvas />
      {/* Page Content */}
      <RootProviders>
        {children}

        <Footer />
      </RootProviders>
    </Box>
  );
}
