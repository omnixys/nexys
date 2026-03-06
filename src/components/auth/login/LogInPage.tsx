"use client";

import { useState } from "react";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

import AuthLayout from "@/components/auth/login/AuthLayout";
import CredentialsLoginCard from "@/components/auth/login/CredentialsLoginCard";
import ProviderLoginCard from "@/components/auth/login/ProviderLoginCard";

import { AuthManager } from "@/utils/AuthManager";
import { AuthErrorKey } from "@/types/authentication/auth.type";
import AuthTabs from "@/components/auth/login/AuthTabs";
import MagicLinkLoginCard from "./MagicLinkLoginCard";
import TotpLoginCard from "./TotpLoginCard";
import WebAuthnLoginCard from "./WebAuthnLoginCard";

export type AuthMethod =
  | "credentials"
  | "totp"
  | "webauthn"
  | "magic-link"
  | "github"
  | "google"
  | "facebook"
  | "twitter"
  | "linkedin"
  | "keycloak";
  
export default function LogInPage() {
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthErrorKey | undefined>();
  const [authMethod, setAuthMethod] = useState<AuthMethod>("credentials");

  const [magicSent, setMagicSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError(undefined);

    const data = new FormData(e.currentTarget);
    
    try {
      const username = data.get("username");
      const password = data.get("password");
      const tandcAccepted = data.has("tandc");

      if (!tandcAccepted) {
        setError("termsRequired");
        return;
      }

      if (!username || !password) {
        setError("missingCredentials");
        return;
      }

      const input = {
        username: String(username),
        password: String(password),
      };

      await AuthManager.login(input);

      router.push("/home");
    } catch (err) {
      console.error("Login failed:", err);
      setError("loginFailed");
    } finally {
      setLoading(false);
    }
  }

  function renderLeftCard() {
    if (authMethod === "credentials") {
      return (
        <CredentialsLoginCard
          onSubmit={onSubmit}
          loading={loading}
          error={error}
        />
      );
    }

if (authMethod === "totp") {
  return (
    <TotpLoginCard
      loading={loading}
      errorText={error ? String(error) : null}
      onVerify={async (code, username) => {
        setLoading(true);
        try {
          await AuthManager.loginWithTotp(username, code);
          router.push("/home");
        } catch {
          setError("loginFailed");
        } finally {
          setLoading(false);
        }
      }}
    />
  );
}

if (authMethod === "webauthn") {
  return (
    <WebAuthnLoginCard
      loading={loading}
      errorText={error ? String(error) : null}
      onStart={async () => {
        setLoading(true);
        try {
          await AuthManager.loginWithWebAuthn();
          router.push("/home");
        } catch {
          setError("loginFailed");
        } finally {
          setLoading(false);
        }
      }}
    />
  );
}

if (authMethod === "magic-link") {
  return (
    <MagicLinkLoginCard
      loading={loading}
      errorText={error ? String(error) : null}
      infoText={
        magicSent
          ? "Magic Link wurde gesendet. Bitte prüfe deine E-Mail."
          : null
      }
      onSend={async (email) => {
        setLoading(true);
        try {
          await AuthManager.requestMagicLink(email);
          setMagicSent(true);
        } catch {
          setError("loginFailed");
        } finally {
          setLoading(false);
        }
      }}
    />
  );
}

    // If user picked an OAuth provider on the right, keep left on credentials (or render a nice hint card)
    return (
      <CredentialsLoginCard
        onSubmit={onSubmit}
        loading={loading}
        error={error}
      />
    );
  }


  return (
<AuthLayout>
  <AuthTabs
    credentials={renderLeftCard()}
    providers={
      <ProviderLoginCard selected={authMethod} onSelect={setAuthMethod} />
    }
  />
</AuthLayout>
  );
}