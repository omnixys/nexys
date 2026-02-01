"use client";

import { Box, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <Box
      id="projects"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: "80px", // py-20
        width: "100%",
      }}
    >
      {/* Section Title */}
      <Typography
        sx={{
          fontSize: "40px",
          fontWeight: 600,
          py: "80px", // py-20
          background: "linear-gradient(to right, #a855f7, #06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
        }}
      >
        My Projects
      </Typography>

      {/* Cards */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "40px", // gap-10
          px: "40px", // px-10
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        <ProjectCard
          src="/home/NextWebsite.png"
          title="Modern Next.js Portfolio"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />

        <ProjectCard
          src="/home/CardImage.png"
          title="Interactive Website Cards"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />

        <ProjectCard
          src="/home/SpaceWebsite.png"
          title="Space Themed Website"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </Box>
    </Box>
  );
};

export default Projects;
