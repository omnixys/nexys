import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { ExperienceItem } from "./ExperienceItem";

const MotionBox = motion(Box);

interface ExperienceTimelineProps {
  inView: boolean;
}

export function ExperienceTimeline({ inView }: ExperienceTimelineProps) {
  return (
    <MotionBox
      initial={{ x: -300 }}
      animate={inView ? { x: 0 } : {}}
      transition={{ delay: 0.2 }}
    >
      <ExperienceItem
        side="left"
        title="Senior JavaScript Engineer"
        description="I led web development, offering expertise in JavaScript frameworks."
        date="2024 - Present"
        company="Apple"
      />

      <ExperienceItem
        side="right"
        title="Senior React Developer"
        description="I spearheaded React-based application development, leveraging advanced skills."
        date="2019 - 2024"
        company="Microsoft"
      />

      <ExperienceItem
        side="left"
        title="Freelancer"
        description="I provided web solutions, applying a range of technologies to address client requirements."
        date="2010 - 2019"
      />
    </MotionBox>
  );
}
