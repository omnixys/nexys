"use client";

import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";


      //  <Box right={650} top={0} sx={{ position: "relative" }}>
      //    <Typography
      //      color="#fff"
      //      variant="body1"
      //      sx={{ maxWidth: 640, mx: "auto", opacity: 0.8 }}
      //    >
      //      Willkommen bei der modularen Plattform für moderne Geschäftsprozesse.
      //      Entdecke unsere Services für Shop, Bank, Immobilien, Auktionen,
      //      Reisen und mehr.
      //    </Typography>
      //  </Box>;


import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

const HeroContent = () => {
  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        px: "80px", // px-20
        mt: "160px", // mt-40
        width: "100%",
        zIndex: 20,
      }}
    >
      {/* LEFT CONTENT */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px", // gap-5
          justifyContent: "center",
          margin: "auto",
          textAlign: "left",
        }}
      >
        {/* Welcome Badge */}
        <MotionBox
          variants={slideInFromTop}
          sx={{
            px: "7px",
            py: "8px",
            border: "1px solid rgba(112,66,248,0.55)",
            borderRadius: "8px",
            opacity: 0.9,
            width: "fit-content",
          }}
        >
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#fff",
              letterSpacing: "0.3px",
            }}
          >
            {/* Fullstack Developer Portfolio */}
            NEXYS · Modular Enterprise Platform
          </Typography>
        </MotionBox>

        {/* Headline */}
        <MotionTypography
          variants={slideInFromLeft(0.5)}
          sx={{
            mt: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            fontSize: "3.75rem", // text-6xl
            fontWeight: 700,
            color: "#fff",
            maxWidth: "600px",
          }}
        >
          <span>
            {/* Providing{" "} */}
            Build, scale and operate{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(to right, #a855f7, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {/* the best */}
              modular digital businesses
            </Box>{" "}
            {/* project experience */}
          </span>
        </MotionTypography>

        {/* Description */}
        <MotionTypography
          variants={slideInFromLeft(0.8)}
          sx={{
            fontSize: "1.125rem", // text-lg
            color: "grey.400",
            my: "20px",
            maxWidth: "600px",
          }}
        >
          Nexys is the modular digital platform by Omnixys. It unifies commerce,
          banking, finance, identity and analytics into a secure, event-driven
          and API-first architecture.
        </MotionTypography>

        {/* CTA */}
        <MotionButton
          variants={slideInFromLeft(1)}
          sx={{
            py: "8px",
            px: "16px",
            maxWidth: "200px",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 500,
            color: "#fff",
            background:
              "linear-gradient(to right, rgba(112,66,248,1), rgba(6,182,212,1))",
            "&:hover": {
              opacity: 0.9,
              background:
                "linear-gradient(to right, rgba(112,66,248,1), rgba(6,182,212,1))",
            },
          }}
        >
          Get started
        </MotionButton>
      </Box>
      {/* RIGHT IMAGE */}
      <MotionBox
        variants={slideInFromRight(0.8)}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src="/landing/mainIconsdark.svg"
          alt="work icons"
          width={650}
          height={650}
        />
      </MotionBox>
    </MotionBox>
  );
};

export default HeroContent;
