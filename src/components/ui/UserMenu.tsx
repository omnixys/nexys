"use client";

import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { JSX } from "react";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BadgeIcon from "@mui/icons-material/Badge";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Person from "@mui/icons-material/Person";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

import { useAuth } from "@/providers/AuthProvider";
import { useDevice } from "@/providers/DeviceProvider";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import ColorBubbleSwitcher from "./ColorBubbleSwitcher";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

type EventRole = "ADMIN" | "SECURITY" | "GUEST";

export default function UserMenu({
  logoutPath,
}: {
  logoutPath: string;
}): JSX.Element | null {
  const router = useRouter();
  const { device } = useDevice();
  const { user, isAuthenticated, loading, logout } = useAuth();

  const t = useTypedTranslations("layout");

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  if (loading) return null;
  if (!isAuthenticated || !user) return null;

  const role = user?.eventRole as EventRole | undefined;

  const displayName =
    [user?.personalInfo?.firstName, user?.personalInfo?.lastName]
      .filter(Boolean)
      .join(" ") ||
    user.username ||
    "User";

  const initials = displayName
    .split(" ")
    .map((x) => x[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const go = (href: string) => {
    handleClose();
    router.push(href);
  };

  const doLogout = async () => {
    handleClose();
    await logout();
    router.replace(logoutPath);
  };

  return (
    <>
      <Tooltip title={displayName}>
        <IconButton onClick={handleOpen} size="small" sx={{ ml: 1 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "primary.main",
              fontSize: "0.9rem",
              fontWeight: 700,
            }}
          >
            {initials}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            borderRadius: 3,
            mt: 1,
            minWidth: 240,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem disabled>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {displayName}
          </Typography>
        </MenuItem>

        {device === "mobile" && (
          <MenuItem>
            <ColorBubbleSwitcher />
          </MenuItem>
        )}

        {/* Profile */}
        <MenuItem onClick={() => go("/checkpoint/me")}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          {t("userMenu.profile")}
        </MenuItem>

        {/* Notifications */}
        <MenuItem onClick={() => go("/checkpoint/me/notifications")}>
          <ListItemIcon>
            <NotificationsIcon fontSize="small" />
          </ListItemIcon>
          {t("userMenu.notifications")}
        </MenuItem>

        {/* QR Ticket */}
        <MenuItem onClick={() => go("/checkpoint/my-qr")}>
          <ListItemIcon>
            <BadgeIcon fontSize="small" />
          </ListItemIcon>
          {t("userMenu.qr")}
        </MenuItem>

        {/* Security Scanner */}
        {role === "SECURITY" && (
          <MenuItem onClick={() => go("/scan")}>
            <ListItemIcon>
              <QrCodeScannerIcon fontSize="small" />
            </ListItemIcon>
            Scanner
          </MenuItem>
        )}

        {/* Admin */}
        {role === "ADMIN" && (
          <MenuItem onClick={() => go("/checkpoint/admin")}>
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize="small" />
            </ListItemIcon>
            Admin Panel
          </MenuItem>
        )}

        <Divider />

        {/* Logout */}
        <MenuItem onClick={doLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          {t("userMenu.logout")}
        </MenuItem>
      </Menu>
    </>
  );
}
