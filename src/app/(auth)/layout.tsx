import { Box } from "@mui/material";
import type React from "react";
import StarsCanvas from "@/components/background/StarBackground";
import Navbar from "@/components/layout/navbar/landing/Navbar";
import RootProvider from "@/providers/RootProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
