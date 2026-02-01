import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Experience } from "./experience";
import { experiences } from "./experience";
import { ExperienceItem } from "./ExperienceItem";

const MotionBox = motion(Box);

interface Props {
  inView: boolean;
  onSelect: (experience: Experience) => void;
}

export function ExperienceTimeline({ inView, onSelect }: Props) {
  return (
    <MotionBox
      initial={{ x: -300, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      {experiences.map((exp) => (
        <ExperienceItem key={exp.id} experience={exp} onSelect={onSelect} />
      ))}
    </MotionBox>
  );
}
