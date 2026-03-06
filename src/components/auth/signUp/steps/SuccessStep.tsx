"use client";

/**
 * @file VerifyEmailStep.tsx
 * @description Email verification screen with countdown, mail provider shortcuts
 * and automatic verification polling.
 */

import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { SignUpFormValues } from "@/schemas/sign-up.schema";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { useRouter } from "next/navigation";

const EXPIRATION_SECONDS = 15 * 60; // 15 min

type MailLink = {
  label: string;
  url: string;
  domains?: string[];
};

const LINKS: MailLink[] = [
  {
    label: "Open Mail App",
    url: "mailto:",
  },
  {
    label: "Open Gmail",
    url: "https://mail.google.com",
    domains: ["gmail"],
  },
  {
    label: "Open Outlook",
    url: "https://outlook.live.com/mail",
    domains: ["outlook", "hotmail", "live"],
  },
  {
    label: "Open iCloud Mail",
    url: "https://www.icloud.com/mail",
    domains: ["icloud", "me.com", "mac.com"],
  },
];

export default function VerifyEmailStep() {
  const theme = useTheme();
  const router = useRouter();

  const t = useTypedTranslations("signup");

  const { getValues } = useFormContext<SignUpFormValues>();
  const email = getValues("personalInfo.email");

  const [timeLeft, setTimeLeft] = useState(EXPIRATION_SECONDS);
  const [verified, setVerified] = useState(false);

  // ----------------------------
  // Countdown
  // ----------------------------

useEffect(() => {
  if (timeLeft === 0) return;

  const interval = setInterval(() => {
    setTimeLeft((t) => Math.max(0, t - 1));
  }, 1000);

  return () => clearInterval(interval);
}, [timeLeft]);

  // ----------------------------
  // Polling verification
  // ----------------------------

useEffect(() => {
  if (verified) return;

  const interval = setInterval(async () => {
    try {
      const res = await fetch("/api/auth/verify-status", {
        credentials: "include",
      });

      const data = await res.json();

      if (data.verified) {
        setVerified(true);
        router.push("/home");
      }
    } catch {}
  }, 5000);

  return () => clearInterval(interval);
}, [router, verified]);

  // ----------------------------
  // Time format
  // ----------------------------

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  // ----------------------------
  // Mail provider detection
  // ----------------------------

const getMailLinks = () => {
  const domain = email?.split("@")[1]?.toLowerCase();

  if (!domain) return LINKS;

  return LINKS.filter((link) => {
    if (!link.domains) return true;

    return link.domains.some((d) => domain.includes(d));
  });
};
  const mailLinks = getMailLinks();

  return (
    <Box
      textAlign="center"
      py={6}
      sx={{
        maxWidth: 600,
        mx: "auto",
      }}
    >
      {/* Animated Icon */}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 14,
          delay: 0.2,
        }}
      >
        <Box
          sx={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            mx: "auto",
            mb: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, #FFD700)`,
            boxShadow: `0 0 40px ${theme.palette.primary.main}55`,
          }}
        >
          <MailOutlineRoundedIcon
            sx={{
              fontSize: 48,
              color: "#fff",
            }}
          />
        </Box>
      </motion.div>

      {/* Content */}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
          {t("verifyEmail.title")}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {t("verifyEmail.description")}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "primary.main",
          }}
        >
          {email}
        </Typography>

        {/* Countdown */}

        <Typography
          variant="body2"
          sx={{
            mb: 4,
            fontWeight: 500,
          }}
        >
          {t("verifyEmail.expires")}{" "}
          <Box
            component="span"
            sx={{
              fontWeight: 700,
              color: timeLeft < 60 ? "error.main" : "text.primary",
            }}
          >
            {formatted}
          </Box>
        </Typography>

        {/* Mail provider links */}

        {mailLinks.length > 0 && (
          <Stack spacing={1} mb={4}>
            {mailLinks.map((l) => (
              <Button
                key={l.url}
                variant="outlined"
                component="a"
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.label}
              </Button>
            ))}
          </Stack>
        )}

        {/* Resend */}

        <Button
          variant="outlined"
          size="large"
          disabled={timeLeft > 0}
          sx={{
            px: 5,
            py: 1.5,
          }}
        >
          {t("verifyEmail.resend")}
        </Button>
      </motion.div>
    </Box>
  );
}
