"use client";

import Image from "next/image";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useThemeMode } from "@/providers/ThemeModeProvider";

import NavLink from "../navigation/NavLink";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import ColorBubbleSwitcher from "@/components/ui/ColorBubbleSwitcher";
import UserMenu from "@/components/ui/UserMenu";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { OMNIXYS_LOGOS } from "../../auth/login/omnixysBranding";
import { User } from "@/types/user/user.type";
import ProductSelectorMobileButton from "../ProductSelectorMobileButton";
import ProductSelectorActionSheet from "../ProductSelectorActionSheet";

const NAV_ITEMS = [
  { label: "Nexys", href: "/home" },
  { label: "Finanxys", href: "/finyx" },
  { label: "Vexys", href: "/vexys" },
  { label: "Journeyxys", href: "/journeyxys" },
  { label: "Conexys", href: "/conexys" },
  { label: "Vibe Check", href: "/vibe-check" },
  { label: "Checkpoint", href: "/checkpoint" },
];

export default function GlobalNavbar({
  user,
  loading,
  open,
  setOpen,
}: {
  user?: User;
  loading: boolean;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}): JSX.Element {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { scheme } = useThemeMode();
  const { logout } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);


  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user]);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <>
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
          {/* LEFT */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Image
              src={OMNIXYS_LOGOS[scheme]}
              alt="Omnixys"
              width={28}
              height={28}
            />
            <Typography fontWeight={600}>Omnixys</Typography>

            {!isMobile && (
              <>
                <Divider orientation="vertical" flexItem />
                <Stack direction="row" spacing={2}>
                  {NAV_ITEMS.map((item) => (
                    <NavLink
                      key={item.href}
                      href={item.href}
                      label={item.label}
                    />
                  ))}
                </Stack>
              </>
            )}
          </Stack>

          {/* RIGHT */}
          {!isMobile ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <LanguageSwitcher />
              <ThemeToggleButton />
              <ColorBubbleSwitcher direction="vertical" />
              <UserMenu logoutPath="/login" />
            </Stack>
          ) : (
            <>
              <ProductSelectorMobileButton onOpen={() => setOpen(true)} />
              <IconButton onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: theme.palette.background.default,
            backdropFilter: "blur(16px)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography fontWeight={600}>Navigation</Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <List>
            {NAV_ITEMS.map((item) => (
              <ListItemButton
                key={item.href}
                onClick={() => {
                  router.push(item.href);
                  toggleDrawer();
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />
          <ColorBubbleSwitcher direction="horizontal" />
          <Divider sx={{ my: 2 }} />

          <Stack direction={"row"} px={5} spacing={2}>
            <LanguageSwitcher />
            <ThemeToggleButton />
            <UserMenu logoutPath="/login" />
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
