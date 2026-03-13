// /providers/AuthProvider.tsx
/** biome-ignore-all lint/suspicious/noExplicitAny: any in use for now */
"use client";

import { useApolloClient, useQuery } from "@apollo/client/react";
import type React from "react";
import { createContext, type JSX, useContext, useEffect } from "react";
import {
  GetMeDocument,
  type GetMeQuery,
  type GetMeQueryVariables,
  RealmRoleType,
} from "@/generated/graphql";
import type { User } from "@/graphql/graphql.type";
import { AuthEventsBus, AuthManager, getCookie } from "@/utils/AuthManager";

export interface AuthContextType {
  user?: User;
  isAdmin: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  refetchMe: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const hasSession = !!getCookie("access_expires_at");
  const apollo = useApolloClient();

  const { data, loading, refetch } = useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, {
    skip: !hasSession,
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
    context: {
      fetchOptions: {
        credentials: "include",
      },
    },
  });

  const user = data?.me;
  const isAdmin = user?.role === RealmRoleType.Admin;
  const isAuthenticated = !!user;

  /* Initialize AuthManager */
  useEffect(() => {
    AuthManager.init(apollo);
  }, [apollo]);

  /* Re-fetch user on events */
  useEffect(() => {
    const refetchUser = (): void => {
      void refetch();
    };

    AuthEventsBus.on("login", refetchUser);
    AuthEventsBus.on("refresh", refetchUser);
    AuthEventsBus.on("signup", refetchUser);
    AuthEventsBus.on("logout", refetchUser);

    return () => {
      AuthEventsBus.off("login", refetchUser);
      AuthEventsBus.off("refresh", refetchUser);
      AuthEventsBus.off("signup", refetchUser);
      AuthEventsBus.off("logout", refetchUser);
    };
  }, [refetch]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isAuthenticated,
        loading,
        logout: () => AuthManager.logout(),
        refetchMe: () => refetch(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
