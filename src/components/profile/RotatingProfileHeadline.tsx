"use client";

import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";

import TypingHeadline from "../home/TypingHeadline";
import { User } from "@/graphql/graphql.type";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

const MotionBox = motion(Box);

export default function RotatingProfileHeadline({ user }: { user?: User }) {
  const pathname = usePathname();
  const t = useTypedTranslations("profile");

  const firstName = user?.personalInfo?.firstName ?? "there";

  const messages = useMemo(
    () => [
      {
        title: t("profileHeadline.1.title", { name: firstName }),
        subtitle: t("profileHeadline.1.subtitle"),
      },
      {
        title: t("profileHeadline.2.title"),
        subtitle: t("profileHeadline.2.subtitle"),
      },
      {
        title: t("profileHeadline.3.title", { name: firstName }),
        subtitle: t("profileHeadline.3.subtitle"),
      },
      {
        title: t("profileHeadline.4.title"),
        subtitle: t("profileHeadline.4.subtitle"),
      },
    ],
    [t, firstName],
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const next =
      (index + 1 + Math.floor(Math.random() * (messages.length - 1))) %
      messages.length;
    setIndex(next);
  }, [pathname, messages.length]);

  return (
    <Box sx={{ mb: 3, minHeight: 84 }}>
      <MotionBox
        key={index}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <TypingHeadline
          text={messages[index].title}
          variant="h3"
          speed={55}
          delay={120}
        />

        <TypingHeadline
          text={messages[index].subtitle}
          variant="body1"
          speed={45}
          delay={180}
        />
      </MotionBox>
    </Box>
  );
}
