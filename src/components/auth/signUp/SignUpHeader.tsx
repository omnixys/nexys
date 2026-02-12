import { Box, Typography, useTheme } from "@mui/material";
import { useThemeMode } from "../../../../../providers/ThemeModeProvider";
import { OMNIXYS_LOGOS } from "../../../utils/omnixysBranding";

export default function SignUpHeader() {
  const theme = useTheme();
  const { scheme } = useThemeMode();

  const logoSrc = OMNIXYS_LOGOS[scheme];
  return (
    <Box textAlign="center" mb={3}>
      {BRANDING.logo}
      <Typography variant="h4" mt={1} color="#6A4BBC">
        {BRANDING.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {BRANDING.tagline}
      </Typography>
    </Box>
  );
}
