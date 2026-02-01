"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { alpha, useTheme } from "@mui/material/styles";
import { Experience } from "./experience";

interface Props {
  open: boolean;
  experience: Experience | null;
  onClose: () => void;
}

export function ExperienceDialog({ open, experience, onClose }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AnimatePresence>
      {open && experience && (
        <>
          {/* BACKDROP */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1400,
              background: "rgba(0,0,0,0.25)",
              backdropFilter: "blur(8px)",
            }}
          />

          {/* DIALOG */}
          <motion.div
            initial={{
              opacity: 0,
              y: isMobile ? 48 : 24,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: isMobile ? 48 : 24,
              scale: 0.96,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1500,
              display: "flex",
              alignItems: isMobile ? "flex-end" : "center",
              justifyContent: "center",
              padding: 16,
            }}
          >
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                width: "100%",
                maxWidth: 560,
                borderRadius: 4,
                background: alpha("#fff", 0.78),
                backdropFilter: "blur(28px)",
                boxShadow:
                  "0 30px 90px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.65)",
                overflow: "hidden",
              }}
            >
              {/* HEADER */}
              <Box
                sx={{
                  px: 3,
                  pt: 3,
                  pb: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Typography
                    fontSize="0.7rem"
                    sx={{
                      letterSpacing: "0.14em",
                      opacity: 0.6,
                      mb: 0.5,
                    }}
                  >
                    EXPERIENCE
                  </Typography>

                  <Typography
                    fontSize="1.4rem"
                    fontWeight={600}
                    letterSpacing="-0.01em"
                  >
                    {experience.title}
                  </Typography>

                  <Typography fontSize="0.95rem" sx={{ opacity: 0.75 }}>
                    {experience.company}
                  </Typography>
                </Box>

                <IconButton
                  onClick={onClose}
                  sx={{
                    color: "rgba(0,0,0,0.6)",
                    "&:hover": {
                      background: alpha("#000", 0.06),
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* DATE */}
              <Box sx={{ px: 3, pb: 2 }}>
                <Typography fontSize="0.75rem" sx={{ opacity: 0.5 }}>
                  {experience.date}
                </Typography>
              </Box>

              {/* CONTENT */}
              <Box sx={{ px: 3, pb: 3 }}>
                <Typography
                  fontSize="1rem"
                  lineHeight={1.7}
                  sx={{ color: "rgba(0,0,0,0.8)" }}
                >
                  {experience.description}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
