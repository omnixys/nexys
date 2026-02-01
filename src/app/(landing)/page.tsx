"use client";

import { Box } from "@mui/material";
import BlogPreview from "@/components/landing/BlogPreview";
import ChatWidget from "@/components/landing/ChatWidget";
import Encryption from "@/components/landing/Encryption";
import FeatureTimeline from "@/components/landing/FeatureTimeline";
import Hero from "@/components/landing/Hero";
import KPISection from "@/components/landing/KPISection";
import ModuleCarousel from "@/components/landing/ModuleCarousel";
import NewsletterSection from "@/components/landing/NewsletterSection";
import Skills from "@/components/landing/Skills";
import StickyCTA from "@/components/landing/StickyCTA";
import USPGrid from "@/components/landing/USPGrid";

const MODULES = [
  { title: "Shop", image: "/omnixys-original.png", subtitle: "kp" },
  { title: "Bank", image: "/omnixys-original.png", subtitle: "kp" },
  { title: "Immobilien", image: "/omnixys-original.png", subtitle: "kp" },
  { title: "Auktion", image: "/omnixys-original.png", subtitle: "kp" },
  { title: "Reisen", image: "/omnixys-original.png", subtitle: "kp" },
  { title: "Kino", image: "/omnixys-original.png", subtitle: "kp" },
  { title: "Auto", image: "/omnixys-original.png", subtitle: "kp" },
  { title: "Aktivitäten", image: "/omnixys-original.png", subtitle: "kp" },
  { title: "Social Feed", image: "/omnixys-original.png", subtitle: "kp" },
];

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "80px", // gap-20
        }}
      >
        <Hero />
        <Skills />
        <USPGrid />

        {/* <ProgressBanner /> */}
        {/* <TrustBadges /> */}

        <Encryption />

        <ModuleCarousel modules={MODULES} />
        <FeatureTimeline />

        <KPISection />
        {/* <Projects /> */}

        <BlogPreview />

        <NewsletterSection />

        {/* Sticky Call-to-Action Banner */}
        <StickyCTA />

        <ChatWidget />
      </Box>
    </Box>
  );
}
