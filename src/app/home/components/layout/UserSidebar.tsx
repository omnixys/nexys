/**
 * @file UserSidebar.tsx
 * @description User navigation sidebar
 */

"use client";

import { Divider, Drawer, useTheme } from "@mui/material";
import SidebarLink from "../navigation/SidebarLink";
import { JSX } from "react";
import { useTranslations } from "next-intl";

export default function UserSidebar({ width }: { width: number }): JSX.Element {
  const theme = useTheme();
  const t = useTranslations("sidebar");

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width,
          boxSizing: "border-box",
          bgcolor: theme.palette.background.default,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRight: `1px solid ${theme.palette.divider}`,
          pt: 8,
        },
      }}
    >
      <SidebarLink href="/home" label={t("home")} />
      <SidebarLink href="/profile" label={t("profile")} />
      <SidebarLink href="/settings" label={t("settings")} />
      <SidebarLink href="/security" label={t("security")} />
      <SidebarLink href="/billing" label={t("billing")} />

      <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

      <SidebarLink href="/support" label={t("support")} />
    </Drawer>
  );
}
