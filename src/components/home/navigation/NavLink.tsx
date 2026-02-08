/**
 * @file NavLink.tsx
 * @description Top navigation link
 */

"use client";

import Link from "next/link";
import { Typography, useTheme } from "@mui/material";
import { JSX } from "react";

export default function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
  }): JSX.Element {
          const theme = useTheme();
  
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Typography
        color={theme.palette.text.primary}
        variant="body2"
        sx={{
          "&:hover": { color: "#fff" },
        }}
      >
       {label}
      </Typography>
    </Link>
  );
}
