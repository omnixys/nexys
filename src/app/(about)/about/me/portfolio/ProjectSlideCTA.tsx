"use client";

import Link from "next/link";
import { Box, Button } from "@mui/material";
import { ctaLabelByDomain, PortfolioItem} from "./projects";

export interface ProjectSlideProps {
  project: PortfolioItem;
}
export function ProjectSlideCTA({ project }: ProjectSlideProps) {
  if (!project) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        right: 48,
        bottom: 48,
        zIndex: 9999,
        pointerEvents: "auto",
      }}
    >
      <Link href={project.link}>
        <Button
          sx={{
            bgcolor: "white",
            color: "rgb(75 85 99)",
            fontWeight: 600,
            px: 4,
            py: 2,
            fontSize: "1.125rem",
            borderRadius: 2,
            "&:hover": {
              bgcolor: "rgb(243 244 246)",
            },
          }}
        >
          {ctaLabelByDomain[project.domain]}
        </Button>
      </Link>
    </Box>
  );
}
