"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, color } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";
import { CircularCTA } from "../../../../../components/ui/cta/CircularCTA";
import { ctaLabelByDomain, PROJECTS } from "./projects";
import { ProjectSlide } from "./ProjectSlide";

const MotionBox = motion(Box);


export default function PortfolioPage() {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <MotionBox
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
      sx={{ height: "100%" }}
    >
      {/* SCROLL SECTION */}
      <Box ref={ref} sx={{ height: "600vh", position: "relative" }}>
        <Box
          sx={{
            width: "100vw",
            height: "calc(100vh - 6rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "6rem",
            textAlign: "center",
            bgcolor: "#000",
            color: "#fff",
            // color: "linear-gradient(to right, #a855f7, #06b6d4)",
          }}
        >
          My Works
        </Box>

        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#000",
            color: "#fff",
            gap: 3,
            textAlign: "center",
          }}
        >
          <Typography fontSize="3rem" fontWeight={600}>
            Domain-Driven Projects
          </Typography>

          <Typography maxWidth={640} sx={{ opacity: 0.75 }}>
            A curated selection of platform, security, finance and product
            systems designed with a strong focus on architecture, clarity and
            long-term maintainability.
          </Typography>
        </Box>


          <Box
            sx={{
              position: "sticky",
              top: 0,
              height: "100vh",
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              gap: 2,
            }}
          >
            <MotionBox sx={{ display: "flex" }} style={{ x }}>
              {/* INTRO SLIDE */}

              <Box
                sx={{
                  height: "100vh",
                  width: "100vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // background:"linear-gradient(to right, rgb(216 180 254), rgb(252 165 165))",
                  bgcolor: "#000",
                }}
              />
              <Box
                sx={{
                  height: "100vh",
                  width: "100vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // background:"linear-gradient(to right, rgb(216 180 254), rgb(252 165 165))",
                  bgcolor: "#000",
                }}
              />
              <Box
                sx={{
                  height: "100vh",
                  width: "100vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // background:"linear-gradient(to right, rgb(216 180 254), rgb(252 165 165))",
                  bgcolor: "#000",
                }}
              />

              {/* PROJECT SLIDES */}
              {PROJECTS.map((item) => (
                <ProjectSlide key={item.id} project={item} />
              ))}

              <Box
                sx={{
                  height: "100vh",
                  width: "100vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // background:"linear-gradient(to right, rgb(216 180 254), rgb(252 165 165))",
                  bgcolor: "#000",
                }}
              />
            </MotionBox>

        </Box>
      </Box>

      {/* CTA SECTION */}
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          bgcolor: "#000",
        }}
      >
        <Typography color={"#fff"} fontSize="6rem">
          Do you have a project?
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: { xs: 6, md: 12 },
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap", // mobile fallback
            background: "#000",
            zIndex: 1300,
          }}
        >
          <CircularCTA
            label="Hire Me"
            href="/about/me/contact"
            text="Front-end Developer · UI Designer · Freelancer"
          />

          <CircularCTA
            label="About Me"
            href="/about/me/about"
            text="Experience · Skills · Background · Vision"
          />
        </Box>
      </Box>
    </MotionBox>
  );
}
