/**
 * @file RotatingProfileHeadline.tsx
 * @description Rotating creative headline for profile pages
 */

"use client";

import { Box, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { User } from "@/types/user/user.type";

const MotionBox = motion(Box);

export default function RotatingProfileHeadline({ user }: { user?: User }) {
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

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4200);

    return () => clearInterval(id);
  }, [messages.length]);

  return (
    <Box sx={{ mb: 3, minHeight: 84 }}>
      <AnimatePresence mode="wait">
        <MotionBox
          key={index}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Typography variant="h3" fontWeight={800}>
            {messages[index].title}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {messages[index].subtitle}
          </Typography>
        </MotionBox>
      </AnimatePresence>
    </Box>
  );
}
