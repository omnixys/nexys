"use client";

import { Box } from "@mui/material";

import {
  Backend_skill,
  Frontend_skill,
  Full_stack,
  Other_skill,
  Skill_data,
} from "@/constants/skills";
import SkillDataProvider from "./SkillDataProvider";
import SkillText from "./SkillText";

const Skills = () => {
  return (
    <Box
      component="section"
      id="skills"
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        minHeight: "100vh",
        overflow: "hidden",
        pt: "80px",
        pb: "320px",
        transform: "scale(0.9)",
        backgroundColor: "transparent",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 20 }}>
        {/* Section Header */}
        <SkillText />

        {/* Skill Rows */}
        <SkillRow data={Skill_data} />
        <SkillRow data={Frontend_skill} />
        <SkillRow data={Backend_skill} />
        <SkillRow data={Full_stack} />
        <SkillRow data={Other_skill} />
      </Box>
      {/* Background Video */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="video"
            src="/landing/cards-video.webm"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.3,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

type SkillRowProps = {
  data: {
    Image: string;
    width: number;
    height: number;
  }[];
};

const SkillRow = ({ data }: SkillRowProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        mt: "16px", // mt-4
        gap: "20px", // gap-5
        width: "100%",
      }}
    >
      {data.map((image, index) => (
        <SkillDataProvider
          key={index}
          src={image.Image}
          width={image.width}
          height={image.height}
          index={index}
        />
      ))}
    </Box>
  );
};

export default Skills;
