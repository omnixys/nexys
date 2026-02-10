import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import TransitionProvider from "@/components/me/transitionProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Omnixys · About Me",
  description:
    "Personal portfolio showcasing my background, experience, and selected projects in software development.",
};

const theme = createTheme({
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
      <TransitionProvider>{children}</TransitionProvider>
  );
}
