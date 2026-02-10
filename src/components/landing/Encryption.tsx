"use client";

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { slideInFromTop } from "@/utils/motion";

const MotionDiv = motion.div;

const Encryption = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          zIndex: 5,
          width: "auto",
          height: "auto",
        }}
      >
        <MotionDiv variants={slideInFromTop}>
          <Typography
            sx={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 500,
              textAlign: "center",
              color: "grey.300",
            }}
          >
            Performance{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(to right, #a855f7, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              &amp;
            </Box>{" "}
            Security
          </Typography>
        </MotionDiv>
      </Box>

      {/* Lock + Badge */}
      <Box
        sx={{
          position: "absolute",
          zIndex: 20,
          transform: "translateY(-50px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Lock */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            "&:hover .lock-top": {
              transform: "translateY(44px)",
            },
          }}
        >
          <Box
            className="lock-top"
            sx={{
              transform: "translateY(20px)",
              transition: "transform 200ms ease",
            }}
          >
            <Image
              src="/landing/LockTop.png"
              alt="Lock top"
              width={50}
              height={50}
            />
          </Box>

          <Box sx={{ zIndex: 10 }}>
            <Image
              src="/landing/LockMain.png"
              alt="Lock main"
              width={70}
              height={70}
            />
          </Box>
        </Box>

        {/* Encryption Badge */}
        <Box
          sx={{
            mt: "20px",
            px: "15px",
            py: "4px",
            border: "1px solid rgba(112,66,248,0.55)",
            borderRadius: "8px",
            opacity: 0.9,
            zIndex: 20,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: 0.5,
            }}
            color="#fff"
          >
            Encryption
          </Typography>
        </Box>
      </Box>

      {/* Bottom Text */}
      <Box
        sx={{
          position: "absolute",
          bottom: "10px",
          px: "5px",
          zIndex: 20,
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 500,
            textAlign: "center",
            color: "grey.400",
            fontStyle: "italic",
            letterSpacing: "0.02em",
          }}
        >
          Secure your data with end-to-end encryption
        </Typography>
      </Box>

      {/* Background Video */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          zIndex: 0,
        }}
      >
        <Box
          component="video"
          src="/landing/encryption.webm"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      </Box>
    </Box>
  );
};

export default Encryption;
