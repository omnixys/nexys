"use client";

import { Typography, TypographyProps } from "@mui/material";
import { useEffect, useState } from "react";

interface TypingWordProps extends TypographyProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  cursor?: boolean;
}

export default function TypingWord({
  words,
  typingSpeed = 120,
  deletingSpeed = 70,
  pauseAfterType = 1500,
  pauseAfterDelete = 500,
  cursor = true,
  ...typographyProps
}: TypingWordProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting) {
      // typing
      if (text.length < currentWord.length) {
        timeout = setTimeout(
          () => setText(currentWord.slice(0, text.length + 1)),
          typingSpeed,
        );
      } else {
        timeout = setTimeout(() => setDeleting(true), pauseAfterType);
      }
    } else {
      // deleting
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText(currentWord.slice(0, text.length - 1)),
          deletingSpeed,
        );
      } else {
        timeout = setTimeout(() => {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }, pauseAfterDelete);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    deleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseAfterType,
    pauseAfterDelete,
  ]);

  return (
    <Typography component="span" {...typographyProps}>
      {text}
      {cursor && (
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: "0.12em",
            height: "1.05em",
            marginLeft: "0.08em",
            backgroundColor: "currentColor",
            verticalAlign: "baseline",
            animation: "caret-blink 1.1s steps(1) infinite",
          }}
        />
      )}

      <style jsx>{`
        @keyframes caret-blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </Typography>
  );
}
