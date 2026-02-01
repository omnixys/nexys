"use client";

import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

interface Props {
  src: string;
  title: string;
  description: string;
}

const ProjectCard = ({ src, title, description }: Props) => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px", // rounded-lg
        border: "1px solid #2A0E61",
        boxShadow: "0 12px 32px rgba(0,0,0,0.45)", // shadow-lg
        backgroundColor: "transparent",
        width: "100%",
      }}
    >
      {/* Image */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
        }}
      >
        <Image
          src={src}
          alt={title}
          width={1000}
          height={1000}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          p: "16px", // p-4
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem", // text-2xl
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: "8px", // mt-2
            color: "grey.300",
            fontSize: "0.95rem",
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProjectCard;
