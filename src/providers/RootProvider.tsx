"use client";

import { CssBaseline } from "@mui/material";
import type React from "react";
import { ApolloRootProvider } from "@/providers/ApolloProvider";
import { AuthProvider } from "./AuthProvider";
import { DeviceProvider } from "./DeviceProvider";
import ThemeModeProvider from "./ThemeModeProvider";

type ProviderProps = { children: React.ReactNode };

export default function Provider({ children }: ProviderProps) {
  return (
    <DeviceProvider>
      <ThemeModeProvider>
        <CssBaseline />
        <ApolloRootProvider>
          <AuthProvider>{children}</AuthProvider>
        </ApolloRootProvider>
      </ThemeModeProvider>
    </DeviceProvider>
  );
}
