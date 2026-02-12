/**
 * @file TypingHeadline.tsx
 * @description Headline with typing animation (welcome effect)
 */

"use client";

import { Typography, useTheme } from "@mui/material";
import { JSX, useEffect, useState } from "react";

export default function TypingHeadline({
  text,
  variant = "h1",
  speed = 55,
  delay = 300,
}: {
  text?: string;
  variant?: "h1" | "h2" | "h3" | "h4";
  speed?: number; // ms per character
  delay?: number; // initial delay
  }): JSX.Element {
      const theme = useTheme();
  
  const [visibleText, setVisibleText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (visibleText.length >= text.length) return;

    const timeout = setTimeout(() => {
      setVisibleText((prev) => text.slice(0, prev.length + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [visibleText, started, text, speed]);

  return (
    <Typography
      color={
        theme.palette.mode === "dark"
          ? theme.palette.text.primary
          : theme.palette.primary.light
      }
      variant={variant}
      gutterBottom
      sx={{
        fontWeight: 600,
        letterSpacing: "-0.02em",
        maxWidth: "100%",
        whiteSpace: { xs: "normal", md: "nowrap" },
      }}
      aria-label={text}
    >
      {visibleText}
      <BlinkingCursor active={visibleText.length < text?.length} />
    </Typography>
  );
}

/* =====================================================
   CURSOR
===================================================== */

function BlinkingCursor({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 8,
        marginLeft: 2,
        animation: "blink 1.1s infinite",
      }}
    >
      |
      <style jsx>{`
        @keyframes blink {
          0%,
          50%,
          100% {
            opacity: 1;
          }
          25%,
          75% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}
