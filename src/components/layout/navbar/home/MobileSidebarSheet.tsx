"use client";

import { Box, Divider, SwipeableDrawer, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import SidebarLink from "../../sidebar/SidebarLink";
import SidebarGroup from "../../sidebar/SidebarGroup";

type Props = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export default function MobileSidebarSheet({ open, onOpen, onClose }: Props) {
  const theme = useTheme();
  const t = useTranslations("sidebar");

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      disableDiscovery
      PaperProps={{
        sx: {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          bgcolor: theme.palette.background.default,
          pb: 3,
          zIndex: 2000,
        },
      }}
    >
      {/* Drag Handle */}
      <Box
        sx={{
          width: 40,
          height: 4,
          bgcolor: "rgba(255,255,255,0.3)",
          borderRadius: 2,
          mx: "auto",
          my: 1.5,
        }}
      />

      {/* Content */}
      <Box sx={{ px: 3 }}>
        <SidebarLink href="/home" label={t("home")} />

        <SidebarLink href="/profile" label={t("profile")} />

        <SidebarGroup
          disabled={true}
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

        <SidebarGroup
          disabled={true}
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

        <Divider sx={{ my: 2 }} />

        <SidebarLink disabled href="/billing" label={t("billing")} />
        <SidebarLink disabled href="/support" label={t("support")} />
      </Box>
    </SwipeableDrawer>
  );
}
