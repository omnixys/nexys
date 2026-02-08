"use client";

import { Checkbox, FormControlLabel, useTheme } from "@mui/material";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

/**
 * Terms & Conditions agreement checkbox.
 * i18n + typed, fully theme-driven.
 */
export default function AgreeWithTerms() {
  const theme = useTheme();
  const t = useTypedTranslations("auth");

  return (
    <FormControlLabel
      control={
        <Checkbox
          name="tandc"
          value="true"
          size="small"
          sx={{
            padding: 0.5,
            color: theme.palette.text.secondary,
            "&.Mui-checked": {
              color: theme.palette.primary.main,
            },
            "&:hover": {
              backgroundColor: "transparent",
            },
            "& .MuiSvgIcon-root": {
              fontSize: 20,
              transition: "opacity 0.2s ease",
            },
            "&:hover .MuiSvgIcon-root": {
              opacity: 0.75,
            },
          }}
        />
      }
      label={t("terms.label")}
      componentsProps={{
        typography: {
          variant: "body2",
          color: theme.palette.text.secondary,
        },
      }}
    />
  );
}
