import { Box, createTheme, CssBaseline } from "@mui/material";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import React, { ReactNode } from "react";
import RootProviders from "@/providers/RootProvider";
import SecurityLayoutClient from "./SecurityLayoutClient";
import StarsCanvas from "../../components/background/StarBackground";

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
        backgroundColor: "#030014",
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <StarsCanvas />
      <RootProviders>
        <SecurityLayoutClient modal={modal}>{children}</SecurityLayoutClient>
      </RootProviders>
    </Box>
  );
}
