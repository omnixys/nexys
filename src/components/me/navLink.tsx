"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";

export interface NavLinkItem {
  url: string;
  title: string;
}

interface NavLinkProps {
  link: NavLinkItem;
}

export default function NavLink({ link }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === link.url;

  return (
    <Link href={link.url} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          px: 1,
          py: 0.5,
          borderRadius: 1,
          bgcolor: isActive ? "black" : "transparent",
          color: isActive ? "white" : "inherit",
          fontWeight: isActive ? 600 : 400,
          transition: "background-color 0.2s, color 0.2s",
          "&:hover": {
            bgcolor: isActive ? "black" : "rgba(0,0,0,0.04)",
          },
        }}
      >
        {link.title}
      </Box>
    </Link>
  );
}
