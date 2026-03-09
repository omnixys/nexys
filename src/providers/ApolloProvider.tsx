"use client";

import { ApolloProvider } from "@apollo/client/react";
import type React from "react";
import { useMemo } from "react";
import { createCombinedApolloClient } from "@/lib/client/combined-client";

export function ApolloRootProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => createCombinedApolloClient(), []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
