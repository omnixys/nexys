/**
 * @file RotatingProfileHeadline.tsx
 * @description Creative profile headline – rotates per page visit
 */

"use client";

import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { User } from "@/types/user/user.type";
import TypingHeadline from "../home/TypingHeadline";

const MotionBox = motion(Box);

export default function RotatingProfileHeadline({ user }: { user?: User }) {
  const pathname = usePathname();
  const firstName = user?.personalInfo?.firstName ?? "there";

  const messages = [
    {
      title: `Your profile is almost complete, ${firstName}`,
      subtitle: "Fine-tune your identity, security and preferences.",
    },
    {
      title: "This is your identity within Omnixys",
      subtitle: "One profile shared across Nexys, Finanxys and beyond.",
    },
    {
      title: `Built around you, ${firstName}`,
      subtitle: "Everything Omnixys knows — under your control.",
    },
    {
      title: "Your digital trust starts here",
      subtitle: "Manage how systems and people see you.",
    },
  ];

  const [index, setIndex] = useState(0);

  /* ---------------------------------------------
     Pick a new headline on each page visit
  ---------------------------------------------- */
  useEffect(() => {
    const next = Math.floor(Math.random() * messages.length);
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
