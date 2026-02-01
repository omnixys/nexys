import { Box } from "@mui/material";
import React from "react";
import StarsCanvas from "../../components/landing/StarBackground";
import Navbar from "../../components/landing/Navbar";
import RootProvider from "@/providers/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}
