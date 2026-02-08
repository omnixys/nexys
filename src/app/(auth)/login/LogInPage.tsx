"use client";

import { useState } from "react";
import { useTheme } from "@mui/material";
import AuthLayout from "@/components/auth/login/AuthLayout";
import CredentialsLoginCard from "@/components/auth/login/CredentialsLoginCard";
import ProviderLoginCard from "@/components/auth/login/ProviderLoginCard";
import { useRouter } from "next/navigation";
import { LoginInput } from "@/types/authentication/auth-input.type";
import { AuthManager } from "@/utils/AuthManager";
import { useAuth } from "@/providers/AuthProvider";
import { AuthErrorKey } from "@/types/authentication/auth.type";

export default function BrandingLogInPage() {
  const theme = useTheme();
  const router = useRouter();
  const { refetchMe } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthErrorKey | undefined>();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);

    try {
      setLoading(true);
      setError(undefined);
      
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
          username: username.toString(),
          password: password.toString(),
        };
        await AuthManager.login(input);

        // await refetchMe();
        router.push('/home')

    } catch (e) {
      console.error(e);
      setError("loginFailed");
    } finally {
      setLoading(false);
    }

    setLoading(false);
  }
  return (
      <AuthLayout>
        <CredentialsLoginCard
          onSubmit={onSubmit}
          loading={loading}
          error={error}
        />
        <ProviderLoginCard />
      </AuthLayout>
  );
}
