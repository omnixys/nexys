"use client";

import { Drawer, Stack, Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { NavItem } from "./navbar.types";
import { Socials } from "@/constants/socials";
import { usePathname } from "next/navigation";

export function NavbarMobileDrawer({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}) {
  const pathname = usePathname();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 260,
          backgroundColor: "rgba(3, 0, 20, 0.9)",
          backdropFilter: "blur(16px)",
          color: "grey.200",
        },
      }}
    >
      <Stack spacing={3} sx={{ p: 3 }}>
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              onClick={onClose}
              style={{
                textDecoration: "none",
                fontSize: "1.05rem",
                fontWeight: active ? 600 : 400,
                color: active ? "#C5B6FF" : "#D1D5DB",
              }}
            >
              {item.label}
            </Link>
          );
        })}

        <Box sx={{ display: "flex", gap: 2, pt: 2 }}>
          {Socials.map((social) => (
            <Image
              key={social.name}
              src={social.src}
              alt={social.name}
              width={22}
              height={22}
            />
          ))}
        </Box>
      </Stack>
    </Drawer>
  );
}
