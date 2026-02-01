"use client";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Danke für deine Anmeldung, ${email}!`);
    setEmail("");
  };

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard
            variant="strong"
            density="normal"
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ color: "#fff", mb: 1 }}
            >
              📬 Immer up-to-date bleiben
            </Typography>

            <Typography sx={{ color: "rgba(255,255,255,0.75)", mb: 4 }}>
              Melde dich für den Omnixys-Newsletter an und erfahre als Erste:r
              von neuen Modulen, Releases & Innovationen.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                type="email"
                required
                placeholder="Deine E-Mail"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  width: { xs: "100%", sm: 280 },
                  input: {
                    color: "#fff",
                  },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(6px)",
                    borderRadius: 2,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(168,62,180,0.6)",
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: 3,
                  height: 40,
                  fontWeight: 600,
                  background:
                    "linear-gradient(90deg, rgba(168,62,180,1), rgba(112,66,248,1))",
                  boxShadow: "0 0 20px rgba(168,62,180,0.45)",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, rgba(168,62,180,1), rgba(112,66,248,1))",
                    boxShadow: "0 0 28px rgba(168,62,180,0.65)",
                  },
                }}
              >
                Jetzt abonnieren
              </Button>
            </Box>
          </GlassCard>
        </motion.div>
      </Container>
    </Box>
  );
}
