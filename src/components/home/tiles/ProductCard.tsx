/**
 * @file ProductCard.tsx
 * @description Single product card with spatial focus
 */

"use client";

import Link from "next/link";
import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

export default function ProductCard({
  name,
  description,
  href,
}: {
  name: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <MotionCard
        tabIndex={0}
        whileHover={{ scale: 1.06 }}
        whileFocus={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        sx={{
          minWidth: 260,
          height: 160,
          borderRadius: 3,
          cursor: "pointer",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#fff",
          outline: "none",
          "&:focus-visible": {
            boxShadow: "0 0 0 2px rgba(140,120,255,0.9)",
          },
        }}
      >
        <CardContent>
          <Typography variant="h6">{name}</Typography>
          <Typography
            variant="body2"
            sx={{ mt: 1, color: "rgba(255,255,255,0.65)" }}
          >
            {description}
          </Typography>
        </CardContent>
      </MotionCard>
    </Link>
  );
}
