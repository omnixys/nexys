import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { glassInputSx } from "@/themes/styles/glassInput";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

/**
 * Benutzerdefiniertes Passwort-Feld mit Sichtbarkeitsumschaltung.
 *
 * @returns JSX.Element eines Eingabefeldes für das Passwort.
 */
export default function PasswordField() {
  const theme = useTheme();
    const t = useTypedTranslations("auth");
  const [showPassword, setShowPassword] = React.useState(false);

  /**
   * Wechselt den Sichtbarkeitsstatus des Passworts.
   */
  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  /**
   * Verhindert das Standardverhalten bei Maus-Klicks.
   *
   * @param event - Das Mausereignis.
   */
  const handleMouseDownPassword = (event: React.MouseEvent): void => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        {t("password.label")}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        name="password"
        size="small"
        label={t("password.label")}
        sx={{
          ...glassInputSx(theme),

          my: 1,

          "& .MuiOutlinedInput-root": {
            transition: "background-color 0.2s ease, box-shadow 0.2s ease",
          },

          "&:hover .MuiOutlinedInput-root": {
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 0 0 1px rgba(255,255,255,0.12)"
                : "0 0 0 1px rgba(0,0,0,0.08)",
          },
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={t("password.toggleVisibility")}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
              sx={{
                color: theme.palette.text.secondary,
                transition: "transform 0.3s",
                "&:hover": { transform: "rotate(20deg)" },
              }}
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}