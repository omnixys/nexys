import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Experience } from "./experience";

interface Props {
  experience: Experience;
  onSelect: (experience: Experience) => void;
}

export function ExperienceItem({ experience, onSelect }: Props) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Box
        onClick={() => onSelect(experience)}
        sx={{
          cursor: "pointer",
          p: 2,
          borderRadius: 2,
          transition: "all 0.25s ease",
          "&:hover": {
            background: "rgba(0,0,0,0.04)",
          },
        }}
      >
        <Typography fontWeight={600}>{experience.title}</Typography>

        <Typography fontSize="0.875rem" sx={{ opacity: 0.7 }}>
          {experience.company}
        </Typography>

        <Typography fontSize="0.75rem" sx={{ opacity: 0.5, mt: 0.5 }}>
          {experience.date}
        </Typography>
      </Box>
    </motion.div>
  );
}
