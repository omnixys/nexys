"use client";

import { Paper, Typography, Button, Box } from "@mui/material";
import { providers } from "./providers";
import { handleLogin } from "./useLogin";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

export default function ProviderLoginCard() {
  const t = useTypedTranslations("auth");

  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        p: 4,
        borderRadius: 3,
        backdropFilter: "blur(5px)",
        zIndex: 1300,
        animation: "auth-card-fade 0.6s ease-out both",

        "@keyframes auth-card-fade": {
          from: { opacity: 0, transform: "translateY(12px) scale(0.98)" },
          to: { opacity: 1, transform: "translateY(0) scale(1)" },
        },
      }}
    >
      <Box textAlign="center" mb={2}>
        <Typography variant="h5">{t("provider.title")}</Typography>
      </Box>

      {providers
        .filter((p) => p.id !== "credentials")
        .map((provider) => (
          <Button
            key={provider.id}
            variant="outlined"
            startIcon={provider.icon}
            fullWidth
            sx={{
              my: 1,
              transition: "transform 0.25s ease",
              "&:hover": { transform: "scale(1.02)" },
            }}
            onClick={() => handleLogin(provider)}
          >
            {provider.name}
          </Button>
        ))}
    </Paper>
  );
}
