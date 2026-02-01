"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { alpha, useTheme } from "@mui/material/styles";
import Image from "next/image";
import { Skill } from "./types";

type Props = {
  open: boolean;
  skill: Skill | null;
  onClose: () => void;
};

export default function SkillDialog({ open, skill, onClose }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AnimatePresence>
      {open && skill && (
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
              backdropFilter: "blur(6px)",
            }}
          />

          {/* DIALOG */}
          <motion.div
            initial={{
              opacity: 0,
              y: isMobile ? 40 : 20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: isMobile ? 40 : 20,
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
                maxWidth: 520,
                borderRadius: 4,
                background: alpha("#fff", 0.75),
                backdropFilter: "blur(24px)",
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.7)",
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
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    fontSize="0.75rem"
                    sx={{
                      letterSpacing: "0.14em",
                      opacity: 0.6,
                      mb: 0.5,
                    }}
                  >
                    {skill.category.toUpperCase()}
                  </Typography>

                  <Typography
                    fontSize="1.4rem"
                    fontWeight={600}
                    letterSpacing="-0.01em"
                  >
                    {skill.label}
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

              {/* IMAGE */}
              {skill.image && (
                <Box sx={{ px: 3, pb: 2 }}>
                  <Box
                    sx={{
                      position: "relative",
                      height: 140,
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={skill.image}
                      alt={skill.label}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                </Box>
              )}

              {/* CONTENT */}
              <Box sx={{ px: 3, pb: 3 }}>
                <Typography
                  fontSize="1rem"
                  lineHeight={1.7}
                  sx={{ color: "rgba(0,0,0,0.8)" }}
                >
                  {skill.description}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
