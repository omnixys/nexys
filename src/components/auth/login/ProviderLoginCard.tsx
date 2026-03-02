"use client";

import {
  Paper,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { providers } from "./providers";
import { handleLogin } from "./useLogin";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { AuthMethod } from "./LogInPage";
import { AuthManager } from "../../../utils/AuthManager";

type ProviderLoginCardProps = {
  selected: AuthMethod;
  onSelect: (method: AuthMethod) => void;
};

export default function ProviderLoginCard({
  selected,
  onSelect,
}: ProviderLoginCardProps) {
  const t = useTypedTranslations("auth");
  const [tab, setTab] = useState<"providers" | "auth">("auth");

  const oauthProviders = providers.filter((p) =>
    [
      "github",
      "google",
      "facebook",
      "twitter",
      "linkedin",
      "keycloak",
    ].includes(p.id),
  );

  const authMethods = providers.filter((p) =>
    ["credentials", "totp", "webauthn", "magic-link"].includes(p.id),
  );

  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        p: 4,
        borderRadius: 3,
        backdropFilter: "blur(6px)",
      }}
    >
      <Box textAlign="center" mb={2}>
        <Typography variant="h5">
          {tab === "providers" ? t("provider.title") : t("auth.title")}
        </Typography>
      </Box>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered sx={{ mb: 3 }}>
        <Tab value="providers" label="Providers" />
        <Tab value="auth" label="Auth" />
      </Tabs>

      <Stack spacing={1}>
        {(tab === "providers" ? oauthProviders : authMethods).map(
          (provider) => {
            const isActive = selected === provider.id;

            return (
              <Button
                key={provider.id}
                startIcon={provider.icon}
                fullWidth
                onClick={() => {
                                          onSelect(provider.id as AuthMethod);
                  if (provider.id === "github") {
                    AuthManager.loginWithProvider("github");
                    return;
                  }
                  if (provider.id === "google") {
                    AuthManager.loginWithProvider("google");
                    return;
                  }



                  // andere Provider später
                }}
                sx={{
                  borderRadius: 3,
                  transition: "all 250ms cubic-bezier(.4,0,.2,1)",
                  border: "1px solid",
                  borderColor: isActive
                    ? "primary.main"
                    : "rgba(255,255,255,0.1)",
                  background: isActive
                    ? "rgba(124,77,255,0.15)"
                    : "transparent",
                  boxShadow: isActive
                    ? "0 0 20px rgba(124,77,255,0.35)"
                    : "none",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                {provider.name}
              </Button>
            );
          },
        )}
      </Stack>
    </Paper>
  );
}
