import RootProviders from "@/providers/NexysRootProvider";
import { Box } from "@mui/material";
import type { Metadata } from "next";
import { type ReactNode } from "react";
import StarsCanvas from "../../components/background/StarBackground";
import SettingsLayoutClient from "./SettingsLayoutClient";

export const metadata: Metadata = {
  title: "Omnixys",
  description:
    "Omnixys is a modular, event-driven platform for building scalable, secure, and domain-driven software systems.",
};

export default function RootLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
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
        <SettingsLayoutClient modal={modal}>{children}</SettingsLayoutClient>
      </RootProviders>
    </Box>
  );
}
