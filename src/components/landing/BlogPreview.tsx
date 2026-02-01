"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

export default function BlogPreview() {
  const articles = [
    {
      title: "Die Zukunft modularer Plattformen",
      desc: "Wie OmnixysSphere Unternehmen revolutioniert.",
      href: "#",
    },
    {
      title: "Vergleich: Monolith vs. Microservices",
      desc: "Warum modulare Architekturen gewinnen.",
      href: "#",
    },
    {
      title: "Sicherheit & Compliance bei Omnixys",
      desc: "Unsere Standards für dein Vertrauen.",
      href: "#",
    },
  ];

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Typography
          sx={{ color: "#fff" }}
          variant="h4"
          fontWeight={700}
          gutterBottom
        >
          Insights & Artikel
        </Typography>
        <Typography
          sx={{ color: "rgba(255,255,255,0.75)", mb: 5 }}
          variant="body1"
        >
          Bleibe auf dem Laufenden mit unseren neuesten Entwicklungen.
        </Typography>

        {/* Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 4,
          }}
        >
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard
                variant="soft"
                density="normal"
                whileHover={{
                  y: -6,
                  boxShadow: "0 0 32px rgba(168,62,180,0.45)",
                }}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{ color: "#fff" }}
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                >
                  {article.title}
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.75)",
                    flexGrow: 1,
                  }}
                  variant="body2"
                >
                  {article.desc}
                </Typography>

                <Link href={article.href} passHref>
                  <Button
                    variant="text"
                    color="secondary"
                    sx={{
                      mt: 2,
                      alignSelf: "flex-start",
                      fontWeight: 500,
                    }}
                  >
                    Weiterlesen →
                  </Button>
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
