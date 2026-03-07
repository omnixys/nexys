/**
 * @file UserSidebar.tsx
 * @description User navigation sidebar
 */

"use client";

import { Divider, Drawer, SxProps, Theme, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { JSX } from "react";
import SidebarLink from "../../sidebar/SidebarLink";
import SidebarGroup from "../../sidebar/SidebarGroup";

export default function UserSidebar({
  width,
  sx,
}: {
  width: number;
  sx?: SxProps<Theme>;
}): JSX.Element {
  const theme = useTheme();
  const t = useTranslations("layout");

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
      <SidebarLink href="/home" label={t("sidebar.home")} sx={sx} />
      <SidebarLink href="/profile" label={t("sidebar.profile")} sx={sx} />

      {/* SETTINGS GROUP */}
      <SidebarGroup
        sx={sx}
        href="/settings"
        label={t("sidebar.settings")}
        childrenLinks={[
          {
            href: "/settings/appearance",
            label: t("sidebar.settings_appearance"),
          },
          {
            href: "/settings/language",
            label: t("sidebar.settings_language")
          },
          {
            href: "/settings/notifications",
            label: t("sidebar.settings_notifications"),
          },
          { href: "/settings/data", label: t("sidebar.settings_data") },
          { href: "/settings/advanced", label: t("sidebar.settings_advanced") },
        ]}
      />

      {/* SECURITY GROUP */}
      <SidebarGroup
        sx={sx}
        href="/security"
        label={t("sidebar.security")}
        childrenLinks={[
          { href: "/security/score", label: t("sidebar.security_score") },
          { href: "/security/features", label: t("sidebar.security_features") },
          { href: "/security/devices", label: t("sidebar.security_devices") },
          { href: "/security/history", label: t("sidebar.security_history") },
          { href: "/security/auth", label: t("sidebar.security_auth") },
          { href: "/security/actions", label: t("sidebar.security_actions") },
        ]}
      />
      
      <SidebarLink href="/billing" label={t("sidebar.billing")} sx={sx} />
      <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />
      <SidebarLink href="/support" label={t("sidebar.support")} sx={sx} />
    </Drawer>
  );
}
