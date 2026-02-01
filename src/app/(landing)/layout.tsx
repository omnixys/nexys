import { Box, createTheme, CssBaseline } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Footer from "../../components/landing/Footer";
import Navbar from "../../components/landing/Navbar";
import StarsCanvas from "../../components/landing/StarBackground";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Omnixys",
  description:
    "Omnixys is a modular, event-driven platform for building scalable, secure, and domain-driven software systems.",
};


const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#030014",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <ThemeProvider theme={theme}> */}
        <CssBaseline />

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
          <Navbar />

          {/* Page Content */}
          {children}

          <Footer />
        </Box>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
