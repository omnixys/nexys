"use client";

import Link from "next/link";
import { Box, SxProps, Theme, Typography, useTheme } from "@mui/material";
import { JSX } from "react";

export default function SidebarLink({
  href,
  label,
  disabled = false,
  sx,
}: {
  href: string;
  label: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}): JSX.Element {
  const theme = useTheme();

  const content = (
    <Box
      sx={{
        ...sx,
        py: 1.5,
        px: 2,
        borderRadius: 2,

        color: disabled ? theme.palette.text.disabled : "rgba(255,255,255,0.7)",

        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,

        transition: "all 0.2s ease",

        ...(disabled
          ? {}
          : {
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.06)",
                color: "#fff",
              },
            }),
      }}
      aria-disabled={disabled}
    >
      <Typography>{label}</Typography>
    </Box>
  );

  // 🔥 Disabled → kein Link
  if (disabled) {
    return content;
  }

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      {content}
    </Link>
  );
}
