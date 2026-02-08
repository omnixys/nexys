import StarsCanvas from "@/components/landing/StarBackground";
import RootProviders from "@/providers/RootProvider";
import { Box } from "@mui/material";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import React, { ReactNode } from "react";
import SettingsLayoutClient from "./SettingsLayoutClient";

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
        <SettingsLayoutClient modal={modal}>{children}</SettingsLayoutClient>

        {/* <Footer /> */}
      </RootProviders>
    </Box>
  );
}
