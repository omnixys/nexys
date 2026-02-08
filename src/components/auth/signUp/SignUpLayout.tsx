import { Box, Paper, useTheme } from "@mui/material";
import { ReactNode } from "react";

export default function SignUpLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(
          135deg,
          ${theme.palette.background.default},
          ${theme.palette.background.default},
          ${theme.palette.background.default},
          ${theme.palette.primary.main},
          ${theme.palette.secondary.main},
          ${theme.palette.primary.main},
          ${theme.palette.background.default},
          ${theme.palette.background.default},
          ${theme.palette.background.default}
        )`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundAttachment: "fixed",
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 760,
          p: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          backdropFilter: "blur(6px)",
          zIndex: 1300,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}
