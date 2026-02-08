/**
 * @file GlobalNavbar.tsx
 * @description Top global navigation bar
 */

"use client";

import Image from "next/image";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import NavLink from "../navigation/NavLink";
import { JSX, useEffect } from "react";
import { User } from "@/types/user/user.type";
import { useRouter } from "next/navigation";

import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BadgeIcon from "@mui/icons-material/Badge";
import GroupsIcon from "@mui/icons-material/Groups";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/providers/AuthProvider";
import React from "react";
import { useThemeMode } from "@/providers/ThemeModeProvider";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import ColorBubbleSwitcher from "@/components/ui/ColorBubbleSwitcher";
import UserMenu from "@/components/ui/UserMenu";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { OMNIXYS_LOGOS } from "../../auth/login/omnixysBranding";


export default function GlobalNavbar({
  user,
  loading,
}: {
  user?: User;
  loading: boolean;
}): JSX.Element {
  const router = useRouter();
    const theme = useTheme();
  const { scheme } = useThemeMode();
  const { logout } = useAuth();  
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);



 useEffect(() => {
   if (!loading && !user) {
     router.replace("/login");
   }
 }, [loading, user]);

  const displayName =
    [user?.personalInfo.firstName, user?.personalInfo.lastName]
      .filter(Boolean)
      .join(" ") ||
    user?.username ||
    "User";

  const initials = displayName
    .split(" ")
    .map((x) => x[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
  
    const open = Boolean(anchorEl);
  
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
      router.replace("/login");
    };
  
      const logoSrc =
        theme.palette.mode !== "dark"
          ? OMNIXYS_LOGOS[scheme]
          : "/omnixys-white.png";

  
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.default,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: 1401,
        height: 60,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Image
            src={OMNIXYS_LOGOS[scheme]}
            alt="Omnixys"
            width={30}
            height={30}
          />
          <Typography fontWeight={600} color={theme.palette.text.primary}>
            Omnixys
          </Typography>

          <Divider orientation="vertical" flexItem />

          <Stack direction="row" spacing={2}>
            <NavLink href="/home" label="Nexys" />
            <NavLink href="/finyx" label="Finanxys" />
            <NavLink href="/vexys" label="Vexys" />
            <NavLink href="/journeyxys" label="Journeyxys" />
            <NavLink href="/conexys" label="Conexys" />
            <NavLink href="/vibe-check" label="Vibe Check" />
            <NavLink href="/checkpoint" label="Checkpoint" />
          </Stack>
        </Stack>

        {/* Right */}
        <Stack direction="row" spacing={2} alignItems="center">
          <LanguageSwitcher />
          <ThemeToggleButton />
          <ColorBubbleSwitcher direction={"vertical"} />
          <UserMenu logoutPath={"/login"} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
