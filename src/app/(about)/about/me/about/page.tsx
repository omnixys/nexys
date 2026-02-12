"use client";

import Brain from "@/components/about/me/about/brain/Brain";
import { Box, Button, Typography } from "@mui/material";
import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Experience } from "@/mocks/experience";
import { ExperienceDialog } from "@/components/about/me/about/ExperienceDialog";
import { ExperienceTimeline } from "@/components/about/me/about/ExperienceTimeline";
import SkillDialog from "@/components/about/me/about/SkillDialog";
import { categoryLabels, Skill } from "@/components/about/me/about/types";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export const skillList: Skill[] = [
  // =====================
  // LANGUAGES
  // =====================
  {
    label: "JavaScript",
    category: "Language",
    icon: "js",
    description:
      "JavaScript forms the foundation of my frontend and backend work. I use it confidently for building interactive UIs, APIs and tooling, with a strong understanding of asynchronous behavior and modern ES standards.",
  },
  {
    label: "TypeScript",
    category: "Language",
    icon: "typescript",
    description:
      "TypeScript is a core part of my daily development workflow. I’ve built multiple microservices and frontend applications with a strong focus on type safety, clear contracts and long-term maintainability.",
  },
  {
    label: "Java",
    category: "Language",
    icon: "java",
    description:
      "I use Java mainly for backend development with Spring Boot. My focus lies on clean architecture, structured code, reliability and building services that scale and remain maintainable over time.",
  },

  // =====================
  // FRONTEND
  // =====================
  {
    label: "React",
    category: "Frontend",
    icon: "react",
    description:
      "I build component-based user interfaces with React, focusing on clarity, reusability and predictable state management. I care about readable component structure and long-term maintainability.",
    image: "/skills/react.webp",
  },
  {
    label: "Next.js",
    category: "Frontend",
    icon: "nextjs",
    description:
      "Next.js is my primary framework for modern web applications. I use it for server-side rendering, routing, API integration and performance-oriented frontend architectures.",
    image: "/skills/nextjs.webp",
  },
  {
    label: "Framer Motion",
    category: "Frontend",
    icon: "motion",
    description:
      "I use Framer Motion to add subtle, meaningful animations that improve user experience without overwhelming the interface. My focus is on restraint, clarity and intent.",
  },
  {
    label: "Three.js",
    category: "Frontend",
    icon: "threejs",
    description:
      "I experiment with Three.js and WebGL to create interactive 3D visuals and experiences. I mainly use it for visual storytelling, motion-driven interfaces and exploratory UI concepts.",
  },

  // =====================
  // BACKEND
  // =====================
  {
    label: "Node.js",
    category: "Backend",
    icon: "nodejs",
    description:
      "I use Node.js to build scalable backend services and APIs. My focus is on clean async flows, structured services and predictable runtime behavior.",
  },
  {
    label: "NestJS",
    category: "Backend",
    icon: "nestjs",
    description:
      "I’ve built backend microservices with NestJS, leveraging dependency injection, modular architecture and clear separation of concerns to create maintainable and testable systems.",
  },
  {
    label: "Spring Boot",
    category: "Backend",
    icon: "spring",
    description:
      "With Spring Boot, I focus on building robust backend services using established patterns, strong typing and clean layering. I value clarity and explicit structure over shortcuts.",
  },
  {
    label: "GraphQL",
    category: "Backend",
    icon: "graphql",
    description:
      "I use GraphQL to design explicit, client-driven APIs. My experience includes schema design, resolvers, pagination and integrating GraphQL into modern frontend architectures.",
  },
  {
    label: "Apollo",
    category: "Backend",
    icon: "apollo",
    description:
      "I work with Apollo on both client and server side to manage GraphQL data flows, caching strategies and API integration in frontend applications.",
  },

  // =====================
  // DATABASES
  // =====================
  {
    label: "PostgreSQL",
    category: "Database",
    icon: "postgresql",
    description:
      "PostgreSQL is my primary relational database. I use it for structured data models, relational integrity and reliable persistence in backend systems.",
  },
  {
    label: "MongoDB",
    category: "Database",
    icon: "mongodb",
    description:
      "I use MongoDB when flexible schemas and document-based storage are beneficial. I have experience designing collections and working with data-heavy applications.",
  },

  // =====================
  // MESSAGING
  // =====================
  {
    label: "Apache Kafka",
    category: "Messaging",
    icon: "kafka",
    description:
      "I’ve used Kafka for event-driven communication between microservices. This includes working with producers, consumers, topic design and understanding decoupled system architectures.",
  },

  // =====================
  // DEVOPS
  // =====================
  {
    label: "Docker",
    category: "DevOps",
    icon: "docker",
    description:
      "I containerize applications using Docker to ensure consistent development environments, reproducible builds and simplified deployments across different systems.",
  },
  {
    label: "Git",
    category: "Tooling",
    icon: "git",
    description:
      "Git is an essential part of my workflow. I work confidently with branching strategies, pull requests, code reviews and collaborative version control.",
  },

  // =====================
  // DESIGN
  // =====================
  {
    label: "Figma",
    category: "Design",
    icon: "figma",
    description:
      "I use Figma to explore layouts, UI concepts and design systems. It helps me bridge the gap between design and implementation more effectively.",
  },
];

export default function AboutPage() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const skillRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ container: containerRef });

  const isSkillInView = useInView(skillRef, { margin: "-100px" });
  const isExperienceInView = useInView(experienceRef, { margin: "-100px" });

  const skillsByCategory = skillList.reduce<Record<string, Skill[]>>(
    (acc, skill) => {
      acc[skill.category] = acc[skill.category] || [];
      acc[skill.category].push(skill);
      return acc;
    },
    {},
  );

  return (
    <MotionBox
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
      sx={{ height: "100%", pt: 20 }}
    >
      {/* CONTAINER */}
      <Box
        ref={containerRef}
        sx={{
          height: "100%",
          // overflow: "scroll",
          overflowY: "auto",
          overflowX: "visible",
          display: { lg: "flex" },
        }}
      >
        {/* TEXT CONTAINER */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            pr: { lg: 0 },

            width: { lg: "60%", xl: "45%" },

            p: {
              xs: 2,
              sm: 3,
              md: 4,
              lg: 6,
              xl: 10,
            },

            gap: { xs: 5, md: 6, lg: 8, xl: 10 },
          }}
        >
          {/* BIOGRAPHY */}
          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            sx={{ zIndex: 1300 }}
          >
            <Button component={Link} href="/about/me" sx={subtleButtonSx}>
              ← Back
            </Button>

            <Image
              src="/about/me/me.webp"
              alt="Caleb Gyamfi"
              width={112}
              height={112}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            <Typography variant="h5" fontWeight="bold" letterSpacing="0.08em">
              BIOGRAPHY
            </Typography>

            <Typography fontSize="1.125rem" lineHeight={1.6}>
              I’m a software developer with a strong interest in how complex
              systems are designed, built and maintained. My focus lies in
              creating software that is not only functional, but structured,
              understandable and built for long-term use.
            </Typography>

            <Typography fontStyle="italic" sx={{ opacity: 0.75 }}>
              I believe good software is the result of thoughtful decisions, not
              shortcuts.
            </Typography>

            {/* SIGNATURE */}
            <Box
              alignSelf="flex-end"
              sx={{
                mt: 2,
                opacity: 0.85,
              }}
            >
              {/* SCROLL ICON */}
              <motion.svg
                initial={{ opacity: 0.2, y: 0 }}
                animate={{ opacity: 1, y: "10px" }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                width={50}
                height={50}
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 15C5 18.9 8.1 22 12 22C15.9 22 19 18.9 19 15V9C19 5.1 15.9 2 12 2C8.1 2 5 5.1 5 9V15Z"
                  stroke="black"
                />
              </motion.svg>

              <Image
                src="/about/me/sign.svg"
                alt="Signature"
                width={185}
                height={100}
                style={{
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>

          {/* SKILLS */}
          <MotionTypography
            fontSize="1rem"
            sx={{
              opacity: 0.75,
              maxWidth: 520,
            }}
            initial={{ x: -300 }}
            animate={isSkillInView ? { x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            A selection of technologies I’ve worked with in real projects and
            continuous learning.
          </MotionTypography>

          <Box
            ref={skillRef}
            display="flex"
            flexDirection="column"
            gap={5}
            sx={{ zIndex: 1300 }}
          >
            <MotionTypography
              variant="h5"
              fontWeight="bold"
              initial={{ x: -300 }}
              animate={isSkillInView ? { x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              SKILLS
            </MotionTypography>

            {Object.entries(skillsByCategory).map(
              ([category, skills], index) => (
                <MotionBox
                  key={category}
                  initial={{ x: -200, opacity: 0 }}
                  animate={isSkillInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.25 + index * 0.08 }}
                  display="flex"
                  flexDirection="column"
                  gap={1.5}
                >
                  {/* CATEGORY TITLE */}
                  <Typography
                    fontSize="0.75rem"
                    fontWeight={600}
                    letterSpacing="0.14em"
                    sx={{ opacity: 0.6 }}
                  >
                    {categoryLabels[category] ?? category.toUpperCase()}
                  </Typography>

                  {/* SKILL TAGS */}
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {skills.map((skill) => (
                      <Box
                        key={skill.label}
                        onClick={() => setSelectedSkill(skill)}
                        sx={{
                          px: 1.25,
                          py: 0.5,
                          fontSize: "0.875rem",
                          borderRadius: 999,
                          cursor: "pointer",
                          bgcolor: "black",
                          color: "white",
                          transition: "all 0.25s ease",
                          "&:hover": {
                            bgcolor: "white",
                            color: "black",
                            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                          },
                        }}
                      >
                        {skill.label}
                      </Box>
                    ))}
                  </Box>
                </MotionBox>
              ),
            )}
          </Box>

          {/* EXPERIENCE */}

          <MotionTypography
            fontSize="1rem"
            sx={{
              opacity: 0.75,
              maxWidth: 520,
            }}
            initial={{ x: -300 }}
            animate={isExperienceInView ? { x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Each step represents practical learning, responsibility and
            continuous growth as a software developer.
          </MotionTypography>

          <Box
            ref={experienceRef}
            display="flex"
            flexDirection="column"
            gap={3}
            pb={24}
            sx={{ zIndex: 1300 }}
          >
            <MotionTypography
              variant="h5"
              fontWeight="bold"
              initial={{ x: -300 }}
              animate={isExperienceInView ? { x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              EXPERIENCE
            </MotionTypography>

            <ExperienceTimeline
              inView={isExperienceInView}
              onSelect={setSelectedExperience}
            />

            <MotionTypography
              fontSize="1rem"
              sx={{
                opacity: 0.75,
                maxWidth: 520,
                mt: 2,
              }}
              initial={{ opacity: 0 }}
              animate={isExperienceInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              Every step so far has shaped how I think, learn and build software
              today.
            </MotionTypography>

            <Button
              component={Link}
              href="/about/me/portfolio"
              sx={{
                ...subtleButtonSx,
                mt: 2,
                borderColor: "rgba(112, 66, 248, 0.35)",
                color: "rgb(112, 66, 248)",
                "&:hover": {
                  backgroundColor: "rgba(112, 66, 248, 0.08)",
                  borderColor: "rgba(112, 66, 248, 0.6)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              View My Projects →
            </Button>
          </Box>
        </Box>

        {/* BRAIN */}
        <Box
          sx={{
            display: { xs: "none", lg: "block" },
            position: "sticky",
            top: 0,
            zIndex: 1300,

            width: { lg: "100%", xl: "55%" },

            overflow: "visible",
          }}
        >
          <Brain scrollYProgress={scrollYProgress} />
        </Box>
      </Box>

      <SkillDialog
        open={Boolean(selectedSkill)}
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />

      <ExperienceDialog
        open={Boolean(selectedExperience)}
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </MotionBox>
  );
}

const subtleButtonSx = {
  alignSelf: "flex-start",
  px: 2.5,
  py: 0.75,
  borderRadius: 999,
  textTransform: "none",
  fontSize: "0.875rem",
  fontWeight: 500,
  letterSpacing: "0.04em",
  color: "text.primary",
  border: "1px solid rgba(0,0,0,0.12)",
  backgroundColor: "transparent",
  backdropFilter: "blur(6px)",
  transition: "all 0.25s ease",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.04)",
    borderColor: "rgba(0,0,0,0.25)",
    transform: "translateY(-1px)",
  },
};
