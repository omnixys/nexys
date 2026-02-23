"use client";

/**
 * @file SuccessStep.tsx
 * @description Premium success screen with animated check + dynamic username.
 */

import { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import Confetti from "react-confetti";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import type { SignUpFormValues } from "../SignUpWizard";

export default function SuccessStep() {
  const theme = useTheme();
  const { getValues } = useFormContext<SignUpFormValues>();

  const username = getValues("username");

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const update = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    update();
    window.addEventListener("resize", update);

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 6000);

    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          numberOfPieces={320}
          colors={[
            theme.palette.primary.main,
            theme.palette.secondary.main,
            theme.palette.primary.main,
          ]}
          //colors={[theme.palette.primary.main, "#FFD700", "#F5D76E", "#FFFFFF"]}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1200,
          }}
        />
      )}

      <Box
        textAlign="center"
        py={6}
        sx={{
          maxWidth: 600,
          mx: "auto",
        }}
      >
        {/* Animated Circle Check */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 14,
            delay: 0.2,
          }}
        >
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              mx: "auto",
              mb: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, #FFD700)`,
              boxShadow: `0 0 40px ${theme.palette.primary.main}55`,
            }}
          >
            <CheckCircleRoundedIcon
              sx={{
                fontSize: 48,
                color: "#fff",
              }}
            />
          </Box>
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
            Willkommen bei Omnixys!
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Ihr Konto wurde erfolgreich erstellt.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mb: 4,
              fontWeight: 500,
            }}
          >
            Willkommen,{" "}
            <Box
              component="span"
              sx={{
                color: "primary.main",
                fontWeight: 700,
              }}
            >
              {username}
            </Box>
            ! Ihr Premium-Erlebnis beginnt jetzt.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 1.6,
              fontWeight: 600,
            }}
            onClick={() => {
              // später z.B. router.push("/dashboard")
              console.log("Go to dashboard");
            }}
          >
            Zum Dashboard
          </Button>
        </motion.div>
      </Box>
    </>
  );
}
