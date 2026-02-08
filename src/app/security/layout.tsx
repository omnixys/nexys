import { Box, createTheme, CssBaseline } from "@mui/material";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import React, { ReactNode } from "react";
import StarsCanvas from "@/components/landing/StarBackground";
import RootProviders from "@/providers/RootProvider";
import Footer from "@/components/home/Footer";
import SecurityLayoutClient from "./SecurityLayoutClient";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Omnixys",
  description:
    "Omnixys is a modular, event-driven platform for building scalable, secure, and domain-driven software systems.",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
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
        <SecurityLayoutClient modal={modal}>{children}</SecurityLayoutClient>

        {/* <Footer /> */}
      </RootProviders>
    </Box>
  );
}
