"use client";

import React from "react";
import { IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useRouter } from "next/navigation";

type Locale = "de" | "en";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const switchLocale = (locale: Locale) => {
    // 🔑 Locale im Cookie setzen (Variante A)
    document.cookie = `locale=${locale}; path=/; max-age=31536000`;

    handleClose();

    // 🔁 Next.js App Router neu rendern (kein Full Reload)
    router.refresh();
  };

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <LanguageIcon fontSize="large" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {LOCALES.map((l) => (
          <MenuItem key={l.code} onClick={() => switchLocale(l.code)}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography fontSize={14}>{l.label}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
