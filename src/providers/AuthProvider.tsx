// /providers/AuthProvider.tsx
"use client";

import { ApolloProvider, useApolloClient, useQuery } from "@apollo/client/react";
import React, {
  createContext,
  JSX,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { createCombinedApolloClient } from "@/lib/client/combined-client";
import type { MeResult } from "@/types/user/user-graphql.type";
import { AuthEventsBus, AuthManager, getCookie } from "@/utils/AuthManager";
import { KcRole } from '../types/authentication/auth-enum.type';
import { GetMeDocument, GetMeQuery, GetMeQueryVariables, RealmRole } from "@/generated/graphql";
import { User } from '@/graphql/graphql.type'

export interface AuthContextType {
  user?: User;
  isAdmin: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  refetchMe: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
  }): JSX.Element {
  const hasSession = !!getCookie("access_expires_at");
    const apollo = useApolloClient();
  
  const { data, loading, refetch } = useQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument, {
          skip: !hasSession,
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-first",
      context: {
        fetchOptions: {
          credentials: "include"
        }
      },
  });

  const user = data?.me;
  const isAdmin = user?.role == RealmRole.Admin;
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
