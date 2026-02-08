/**
 * @file UserSidebar.tsx
 * @description User navigation sidebar
 */

"use client";

import { Divider, Drawer, useTheme } from "@mui/material";
import SidebarGroup from "./SidebarGroup";
import { JSX } from "react";
import { useTranslations } from "next-intl";
import SidebarLink from "../../home/navigation/SidebarLink";

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

      {/* SETTINGS GROUP */}
      <SidebarGroup
        href="/settings"
        label={t("settings")}
        childrenLinks={[
          { href: "/settings/appearance", label: t("settings_appearance") },
          { href: "/settings/language", label: t("settings_language") },
          {
            href: "/settings/notifications",
            label: t("settings_notifications"),
          },
          { href: "/settings/data", label: t("settings_data") },
          { href: "/settings/advanced", label: t("settings_advanced") },
        ]}
      />

      {/* SECURITY GROUP */}
      <SidebarGroup
        href="/security"
        label={t("security")}
        childrenLinks={[
          { href: "/security/score", label: t("security_score") },
          { href: "/security/features", label: t("security_features") },
          { href: "/security/devices", label: t("security_devices") },
          { href: "/security/history", label: t("security_history") },
          { href: "/security/auth", label: t("security_auth") },
          { href: "/security/actions", label: t("security_actions") },
        ]}
      />

      <SidebarLink href="/billing" label={t("billing")} />

      <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

      <SidebarLink href="/support" label={t("support")} />
    </Drawer>
  );
}
