"use client";

import { Box } from "@mui/material";
import { useTransform } from "framer-motion";
import { BrainProps } from "./types";
import BrainDefs from "./BrainDefs";
import BrainMain from "./BrainMain";
import BrainCogs from "./BrainCogs";
import BrainLinks from "./BrainLinks";

export default function Brain({ scrollYProgress }: BrainProps) {
  const rotates = {
    f1: useTransform(scrollYProgress, [0, 1], [0, 360]),
    f2: useTransform(scrollYProgress, [0, 1], [0, 180]),
    f3: useTransform(scrollYProgress, [0, 1], [0, 90]),
    f4: useTransform(scrollYProgress, [0, 1], [0, 45]),
    b1: useTransform(scrollYProgress, [0, 1], [0, -360]),
    b2: useTransform(scrollYProgress, [0, 1], [0, -180]),
    b3: useTransform(scrollYProgress, [0, 1], [0, -90]),
    b4: useTransform(scrollYProgress, [0, 1], [0, -45]),
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <svg width="100%"
        height="100%"
        viewBox="0 0 650 800"
        preserveAspectRatio="xMidYMid meet">
        <BrainDefs />
        <g >
          <g >
            <BrainMain />
            <BrainCogs rotates={rotates} />
            <BrainLinks rotates={rotates} />
          </g>
        </g>
      </svg>
    </Box>
  );
}
