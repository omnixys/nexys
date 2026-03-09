"use client";

import React from "react";


import { CssBaseline } from "@mui/material";
import ThemeModeProvider from "./ThemeModeProvider";
import { AuthProvider } from "./AuthProvider";
import { DeviceProvider } from "./DeviceProvider";
import { ApolloRootProvider } from "@/providers/ApolloProvider";

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
