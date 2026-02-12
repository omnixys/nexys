"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Box, Button, TextField, Typography } from "@mui/material";
import TypingWord from "@/components/ui/typo/TypingWord";
import { SocialLink } from "@/components/ui/social/SocialLink";
import { Checkmark } from "@/components/ui/Checkmark";

const MotionBox = motion(Box);

export default function ContactPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    // später EmailJS / API
    setTimeout(() => {
      setSuccess(true);
      formRef.current?.reset();
    }, 800);
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        px: { xs: 2, md: 6, lg: 12 },
        py: { xs: 8, lg: 10 },
        gap: 8,
        background:
          "radial-gradient(circle at top, rgba(168,62,180,0.12), transparent 60%), #000",
        color: "#fff",
      }}
    >
      {/* LEFT — INTRO */}
      <MotionBox
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Typography variant="h2" fontWeight={700}>
            Let’s build something
          </Typography>
          <TypingWord
            words={["meaningful", "amazing", "great", "impactful"]}
            variant="h2"
            fontWeight={700}
            typingSpeed={110}
            deletingSpeed={60}
            pauseAfterType={1400}
            pauseAfterDelete={500}
            sx={{
              background: "linear-gradient(90deg, #a855f7, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          />
          .
        </motion.div>

        <Typography variant="body1" sx={{ opacity: 0.75, maxWidth: 520 }}>
          I’m always open for collaboration, bold ideas or thoughtful
          conversations. If you have something in mind — feel free to reach out.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 3, zIndex: 1300 }}>
          <SocialLink
            href="https://github.com/omnixys"
            label="GitHub (Omnixys)"
          />
          <SocialLink
            href="https://github.com/caleb-script"
            label="GitHub (Caleb)"
          />
          <SocialLink
            href="https://linkedin.com/in/deinprofil"
            label="LinkedIn"
          />
        </Box>
      </MotionBox>

      {/* RIGHT — FORM */}
      <MotionBox
        component="form"
        ref={formRef}
        onSubmit={sendEmail}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        sx={{
          flex: 1,
          maxWidth: 520,
          mx: "auto",
          p: 4,
          borderRadius: 3,
          backdropFilter: "blur(14px)",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          zIndex: 100,
        }}
      >

          <Typography fontWeight={600}>Send me a message</Typography>

          <TextField
            name="user_message"
            label="Your message"
            autoComplete="email"
            inputProps={{ inputMode: "email" }}
            multiline
            rows={5}
            required
            fullWidth
            sx={glassFieldStyle}
          />

          <TextField
            name="user_message"
            autoComplete="off"
            label="Your email"
            type="email"
            required
            fullWidth
            sx={glassFieldStyle}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              py: 1.2,
              fontWeight: 600,
              borderRadius: 999,
              background: "linear-gradient(90deg, #a855f7, #06b6d4)",
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            Send message
          </Button>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Checkmark />
                <Typography color="success.main">
                  Message sent successfully
                </Typography>
              </Box>
            </motion.div>
          )}

          {error && (
            <Typography color="error.main" fontWeight={500}>
              Something went wrong. Please try again.
            </Typography>
          )}
    
      </MotionBox>
    </Box>
  );
}

/* ---------------- STYLES ---------------- */

const glassFieldStyle = {
  "& .MuiOutlinedInput-root": {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(8px)",
    color: "#fff",
    borderRadius: 2,
  },
  "& label": {
    color: "rgba(255,255,255,0.6)",
  },
  "& label.Mui-focused": {
    color: "#a855f7",
  },
  "& fieldset": {
    borderColor: "rgba(255,255,255,0.18)",
  },
};
