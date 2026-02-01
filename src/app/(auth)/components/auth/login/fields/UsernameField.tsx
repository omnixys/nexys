import { AccountCircle } from "@mui/icons-material";
import { InputAdornment, TextField, useTheme } from "@mui/material";
import { glassInputSx } from "../../../../../../themes/styles/glassInput";
import { useTypedTranslations } from "../../../../../../i18n/useTypedTranslations";

/**
 * Benutzerdefiniertes E-Mail-Feld mit integriertem Icon.
 *
 * @returns JSX.Element eines Textfeldes für die E-Mail-Eingabe.
 */
export default function UsernameField() {
  const theme = useTheme();
   const t = useTypedTranslations("auth");
  
  return (
    <TextField
      id="input-with-icon-textfield"
      label={t("username.label")}
      name="username"
      type="input"
      size="small"
      required
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle
              fontSize="inherit"
              style={{ color: theme.palette.text.secondary }}
            />
          </InputAdornment>
        ),
        style: { backgroundColor: theme.palette.background.paper }, // Weiß für Textfelder
      }}
      variant="outlined"
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
    />
  );
}
