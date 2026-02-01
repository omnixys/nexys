"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const SkillText = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Badge */}
      <MotionBox
        variants={slideInFromTop}
        sx={{
          display: "flex",
          alignItems: "center",
          px: "7px",
          py: "8px",
          border: "1px solid rgba(112,66,248,0.55)",
          borderRadius: "8px",
          opacity: 0.9,
          width: "fit-content",
        }}
      >
        <Box
          component={SparklesIcon}
          sx={{
            color: "#b49bff",
            width: "20px",
            height: "20px",
            mr: "10px",
          }}
        />
        <Typography
          color="#fff"
          sx={{
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          Technology Stack & Platform Capabilities
        </Typography>
      </MotionBox>

      {/* Headline */}
      <MotionTypography
        variants={slideInFromLeft(0.5)}
        sx={{
          mt: "10px",
          mb: "15px",
          fontSize: "30px",
          fontWeight: 500,
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        Enterprise-grade technologies
        powering modular digital domains
      </MotionTypography>

      {/* Subline */}
      <MotionTypography
        variants={slideInFromRight(0.5)}
        sx={{
          mt: "10px",
          mb: "40px",
          fontSize: "20px",
          color: "grey.200",
          textAlign: "center",
          fontFamily: "cursive",
        }}
      >
        API-first. Event-driven. Secure by design.
      </MotionTypography>
    </Box>
  );
};

export default SkillText;
