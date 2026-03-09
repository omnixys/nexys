"use client";

import React, { useMemo } from "react";
import { createCombinedApolloClient } from "@/lib/client/combined-client";
import { ApolloProvider } from "@apollo/client/react";

export function ApolloRootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = useMemo(() => createCombinedApolloClient(), []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}