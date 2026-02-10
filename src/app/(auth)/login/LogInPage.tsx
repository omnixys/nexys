"use client";

import { useState } from "react";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

import AuthLayout from "@/components/auth/login/AuthLayout";
import CredentialsLoginCard from "@/components/auth/login/CredentialsLoginCard";
import ProviderLoginCard from "@/components/auth/login/ProviderLoginCard";

import { LoginInput } from "@/types/authentication/auth-input.type";
import { AuthManager } from "@/utils/AuthManager";
import { AuthErrorKey } from "@/types/authentication/auth.type";
import AuthTabs from "../../../components/auth/login/AuthTabs";

export default function BrandingLogInPage() {
  const theme = useTheme();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthErrorKey | undefined>();

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

      const input: LoginInput = {
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


  return (
    <AuthLayout>
      <AuthTabs
        credentials={<CredentialsLoginCard  onSubmit={onSubmit}
        loading={loading}
        error={error} />}
        providers={<ProviderLoginCard />}
      />
    </AuthLayout>
  );
}