"use client";

import { Box, Container, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import SignUpWizard from "./SignUpWizard";
import { Country } from '../../../lib/getCountries';

export interface SignUpPageProps {
  countries: Country[];
  defaultCountry: string;
}

export default function SignUpPage({ countries, defaultCountry }: SignUpPageProps) {
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
        px: 2,
      }}
    >
      <Container maxWidth="md" sx={{ zIndex: 1300 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SignUpWizard countries={countries} defaultCountry={defaultCountry} />
        </motion.div>
      </Container>
    </Box>
  );
}
