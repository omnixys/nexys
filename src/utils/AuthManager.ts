"use client";

import { ApolloClient, gql } from "@apollo/client";
import {
  LoginCredentialsDocument,
  LoginCredentialsMutation,
  LoginCredentialsMutationVariables,
  GenerateWebAuthnAuthOptionsDocument,
  GenerateWebAuthnAuthOptionsMutation,
  GenerateWebAuthnAuthOptionsMutationVariables,
  LogInInput,
  LoginTotpDocument,
  LoginTotpMutation,
  LoginTotpMutationVariables,
  LogoutDocument,
  LogoutMutation,
  LogoutMutationVariables,
  RefreshTokenDocument,
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
  SendMagicLinkDocument,
  SendMagicLinkMutation,
  SendMagicLinkMutationVariables,
  VerifyMagicLinkDocument,
  VerifyMagicLinkMutation,
  VerifyMagicLinkMutationVariables,
  VerifyWebAuthnAuthenticationDocument,
  VerifyWebAuthnAuthenticationMutation,
  VerifyWebAuthnAuthenticationMutationVariables,
} from "@/generated/graphql";
import { startAuthentication } from "@simplewebauthn/browser";


type OAuthProvider = "github" | "google";


/* --------------------------------------------------------------
 * Browser Cookie Helper
 * -------------------------------------------------------------- */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function removeCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
}

/* --------------------------------------------------------------
 * Auth Event Bus
 * -------------------------------------------------------------- */
class AuthEventEmitter {
  private listeners = new Map<string, Array<(p?: any) => void>>();

  on(name: string, fn: (p?: any) => void) {
    if (!this.listeners.has(name)) this.listeners.set(name, []);
    this.listeners.get(name)!.push(fn);
  }

  emit(name: string, payload?: any) {
    this.listeners.get(name)?.forEach((fn) => fn(payload));
  }
}

export const AuthEventsBus = new AuthEventEmitter();

/* --------------------------------------------------------------
 * Auth Manager (Variant B)
 * -------------------------------------------------------------- */
class AuthManagerClass {
  private intervalId: number | null = null;
  private apollo: ApolloClient | null = null;
  private isRefreshing = false;

  init(apollo: ApolloClient) {
    this.apollo = apollo;

    if (!this.intervalId) {
      this.intervalId = window.setInterval(() => {
        this.checkRefresh();
      }, 5_000);
    }
  }

  /* =========================================================
     INTERNAL REFRESH CHECK
  ========================================================= */
  private async checkRefresh() {
    if (this.isRefreshing) return;

    const expRaw = getCookie("access_expires_at");
    if (!expRaw) return;

    const expiresAt = Number(expRaw);
    const remainingMs = expiresAt - Date.now();

    if (remainingMs <= 30_000) {
      this.isRefreshing = true;
      try {
        await this.forceRefresh();
      } finally {
        this.isRefreshing = false;
      }
    }
  }

  /* =========================================================
     CREDENTIALS LOGIN
  ========================================================= */
  async login(input: LogInInput): Promise<void> {
    this.assertApollo();

    const res = await this.apollo!.mutate<
      LoginCredentialsMutation,
      LoginCredentialsMutationVariables
    >({
      mutation: LoginCredentialsDocument,
      variables: { input },
      fetchPolicy: "no-cache",
      context: { fetchOptions: { credentials: "include" } },
    });

    if (!res.data?.credentialsLogin) {
      throw new Error("Missing login payload");
    }

    AuthEventsBus.emit("login");
  }

  /* =========================================================
     TOTP LOGIN
  ========================================================= */
  async loginWithTotp(username: string, code: string): Promise<void> {
    this.assertApollo();

    await this.apollo!.mutate<LoginTotpMutation, LoginTotpMutationVariables>({
      mutation: LoginTotpDocument,
      variables: { username, code },
      context: { fetchOptions: { credentials: "include" } },
      fetchPolicy: "no-cache",
    });

    await new Promise((r) => setTimeout(r, 50));
    AuthEventsBus.emit("login");
  }

  /* =========================================================
     WEBAUTHN LOGIN (DISCOVERABLE)
  ========================================================= */
  async loginWithWebAuthn(): Promise<void> {
    this.assertApollo();

    const { data } = await this.apollo!.mutate<GenerateWebAuthnAuthOptionsMutation, GenerateWebAuthnAuthOptionsMutationVariables>({
      mutation: GenerateWebAuthnAuthOptionsDocument,
      context: { fetchOptions: { credentials: "include" } },
      fetchPolicy: "no-cache",
    });

    const raw = data?.generateWebAuthnAuthOptions;
    const options = typeof raw === "string" ? JSON.parse(raw) : raw;

    const authResp = await startAuthentication(options);

    await this.apollo!.mutate<VerifyWebAuthnAuthenticationMutation, VerifyWebAuthnAuthenticationMutationVariables>({
      mutation: VerifyWebAuthnAuthenticationDocument,
      variables: { response: authResp },
      context: { fetchOptions: { credentials: "include" } },
      fetchPolicy: "no-cache",
    });

    AuthEventsBus.emit("login");
  }

  /* =========================================================
     MAGIC LINK VERIFY
  ========================================================= */
  async verifyMagicLink(token: string): Promise<void> {
    this.assertApollo();

    await this.apollo!.mutate<VerifyMagicLinkMutation, VerifyMagicLinkMutationVariables>({
      mutation: VerifyMagicLinkDocument,
      variables: { token },
      context: { fetchOptions: { credentials: "include" } },
      fetchPolicy: "no-cache",
    });

    AuthEventsBus.emit("login");
  }

  async requestMagicLink(email: string): Promise<void> {
    this.assertApollo();

    await this.apollo!.mutate<SendMagicLinkMutation, SendMagicLinkMutationVariables>({
      mutation: SendMagicLinkDocument,
      variables: { email },
      context: { fetchOptions: { credentials: "include" } },
      fetchPolicy: "no-cache",
    });
  }

  loginWithProvider(provider: OAuthProvider): void {
    // const base = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
    const base =
      process.env.NEXT_PUBLIC_AUTH_API_BASE_URL ?? "http://localhost:7501";
    if (!base) throw new Error("NEXT_PUBLIC_AUTH_API_BASE_URL missing");

    const url = `${base}/auth/oauth/${provider}`;

    window.location.assign(url);
  }

  /* =========================================================
     REFRESH
  ========================================================= */
  async forceRefresh(): Promise<void> {
    this.assertApollo();

    const res = await this.apollo!.mutate<RefreshTokenMutation, RefreshTokenMutationVariables>({
      mutation: RefreshTokenDocument,
      fetchPolicy: "no-cache",
      context: { fetchOptions: { credentials: "include" } },
    });

    if (!res.data?.refresh) {
      throw new Error("Missing refresh payload");
    }

    AuthEventsBus.emit("refresh");
  }

  /* =========================================================
     LOGOUT
  ========================================================= */
  async logout(): Promise<void> {
    this.assertApollo();

    await this.apollo!.mutate<LogoutMutation, LogoutMutationVariables>({
      mutation: LogoutDocument,
      fetchPolicy: "no-cache",
      context: { fetchOptions: { credentials: "include" } },
    });

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    AuthEventsBus.emit("logout");
  }

  private assertApollo() {
    if (!this.apollo) {
      throw new Error("AuthManager not initialized");
    }
  }
}

export const AuthManager = new AuthManagerClass();
