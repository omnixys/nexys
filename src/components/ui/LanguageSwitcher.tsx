"use client";

import React from "react";
import { IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { CheckIcon } from "lucide-react";


type Locale = "de" | "en";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000`;
    handleClose();
    router.refresh();
  };

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <Stack direction="row" spacing={1} alignItems="center">
          <LanguageIcon fontSize="large" />
          <Typography fontSize={16}>{locale.toUpperCase()}</Typography>
        </Stack>
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
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ width: "100%", justifyContent: "space-between" }}
            >
              <Typography fontSize={14}> {l.label} </Typography>
              {locale === l.code && <CheckIcon fontSize="small" />}
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
