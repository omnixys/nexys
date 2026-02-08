"use client";

import { Paper, Typography, Button, Box, useTheme } from "@mui/material";
import { providers } from "./providers";
import { handleLogin } from "./useLogin";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

export default function ProviderLoginCard() {
  const theme = useTheme();
    const t = useTypedTranslations("auth");
  
  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        p: 4,
        borderRadius: 3,
        backgroundColor: theme.palette.background.default,
        backdropFilter: "blur(5px)",
        zIndex: 1300,
        animation: "auth-card-fade 0.6s ease-out both",

        "@keyframes auth-card-fade": {
          from: {
            opacity: 0,
            transform: "translateY(12px) scale(0.98)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
        },
      }}
    >
      <Box textAlign="center" mb={2}>
        <Typography variant="h5" color={`${theme.palette.text.primary}`}>
          {t("provider.title")}
        </Typography>
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
              borderColor: theme.palette.primary,
              color: theme.palette.primary,
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.02)",
                borderColor: theme.palette.secondary,
                color: theme.palette.secondary,
              },
            }}
            onClick={() => handleLogin(provider)}
          >
            {provider.name}
          </Button>
        ))}
    </Paper>
  );
}
