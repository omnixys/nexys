"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";
import { ProjectSlideProps } from "./ProjectSlideCTA";
import { ctaLabelByDomain } from "@/mocks/projects";

export function ProjectSlide({ project }: ProjectSlideProps) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#000",
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          color: "white",
        }}
      >
        {/* DOMAIN */}
        <Typography
          fontSize="0.75rem"
          letterSpacing="0.18em"
          sx={{ opacity: 0.6 }}
        >
          {project.domain.toUpperCase()}
        </Typography>

        {/* TITLE */}
        <Typography
          fontWeight="bold"
          sx={{
            fontSize: {
              xs: "1.25rem",
              md: "2.25rem",
              lg: "3.75rem",
              xl: "6rem",
            },
          }}
        >
          {project.title}
        </Typography>

        {/* IMAGE */}
        <Box
          sx={{
            position: "relative",
            width: {
              xs: 320,
              md: 384,
              lg: 500,
              xl: 600,
            },
            height: {
              xs: 224,
              md: 256,
              lg: 350,
              xl: 420,
            },
          }}
        >
          <Image
            src={project.img}
            alt={project.title}
            fill
            style={{ objectFit: "cover", borderRadius: 8 }}
          />
        </Box>

        {/* DESCRIPTION */}
        <Typography
          sx={{
            width: {
              xs: 320,
              md: 384,
              lg: 500,
              xl: 600,
            },
            fontSize: { lg: "1.125rem" },
            opacity: 0.9,
          }}
        >
          {project.desc}
        </Typography>

        {/* CTA */}
        <Box sx={{ zIndex: 1300 }}>
          <Box sx={{ zIndex: 1300 }}>
            <Box display="flex" justifyContent="flex-end" sx={{ zIndex: 1300 }}>
              <Link href={project.link}>
                <Button
                  sx={{
                    zIndex: 1300,
                    bgcolor: "white",
                    color: "rgb(75 85 99)",
                    fontWeight: 600,
                    p: { xs: 1, md: 2, lg: 4 },
                    fontSize: {
                      xs: "0.875rem",
                      md: "1rem",
                      lg: "1.125rem",
                    },
                    borderRadius: 2,
                    m: 2,
                    "&:hover": {
                      bgcolor: "rgb(243 244 246)",
                    },
                  }}
                >
                  <Box sx={{zIndex: 1300}}>{ctaLabelByDomain[project.domain]}</Box>
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
