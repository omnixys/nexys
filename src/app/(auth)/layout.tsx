import RootProvider from "@/providers/RootProvider";
import { Box } from "@mui/material";
import React from "react";
import Navbar from "../../components/landing/Navbar";
import StarsCanvas from "../../components/landing/StarBackground";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootProvider>
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
        {children}
      </Box>
    </RootProvider>
  );
}
