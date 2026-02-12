"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const MotionBox = motion(Box);

export default function Homepage() {
  return (
    <MotionBox
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
      sx={{ height: "100%", pt: 10 }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          gap: 10,
          flexDirection: { xs: "column", lg: "row" },
          px: { xs: 2, sm: 4, md: 6, lg: 10, xl: 24 },
        }}
      >
        {/* IMAGE CONTAINER */}
        <Box
          sx={{
            height: { xs: "50%", lg: "100%" },
            width: { lg: "50%" },
            position: "relative",
          }}
        >
          <Image
            src="/about/me/hero.webp"
            alt=""
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* TEXT CONTAINER */}
        <Box
          sx={{
            height: { xs: "50%", lg: "100%" },
            width: { lg: "50%" },
            display: "flex",
            flexDirection: "column",
            gap: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* TITLE */}
          <Typography
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: "2.25rem", // text-4xl
                md: "3.75rem", // text-6xl
              },
              textAlign: "center",
            }}
          >
            Crafting Digital Experiences, Designing Tomorrow.
          </Typography>

          {/* DESCRIPTION */}
          <Typography
            sx={{
              fontSize: { md: "1.25rem" }, // md:text-xl
              textAlign: "center",
              maxWidth: 720,
            }}
          >
            Welcome to my digital canvas, where innovation and creativity
            converge. With a keen eye for aesthetics and a mastery of code, my
            portfolio showcases a diverse collection of projects that reflect my
            commitment to excellence.
          </Typography>

          {/* BUTTONS */}
          <Box sx={{ width: "100%", display: "flex", gap: 2, zIndex: 1300 }}>
            <Button
              component={Link}
              href="/about/me/portfolio"
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "black",
                color: "white",
                fontWeight: 600,
                border: "1px solid black",
                "&:hover": {
                  bgcolor: "rgb(31 31 31)",
                },
              }}
            >
              View My Work
            </Button>

            <Button
              component={Link}
              href="/about/me/about"
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "transparent",
                color: "black",
                fontWeight: 600,
                border: "1px solid black",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.04)",
                },
              }}
            >
              More about me
            </Button>

            <Button
              component={Link}
              href="/about/me/contact"
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "transparent",
                color: "black",
                fontWeight: 600,
                border: "1px solid black",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.04)",
                },
              }}
            >
              Contact Me
            </Button>
          </Box>
        </Box>
      </Box>
    </MotionBox>
  );
}
