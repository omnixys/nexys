'use client';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  ListItemButton,
  ListItemText,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';

type ChatMessage = {
  sender: 'user' | 'bot';
  text: string;
};


const faqs = [
  {
    question: 'Wie starte ich mit Omnixys?',
    answer:
      "Klicke auf 'Loslegen' und registriere dich kostenlos im Dashboard.",
  },
  {
    question: 'Ist Omnixys DSGVO-konform?',
    answer:
      'Ja, alle Daten werden in sicheren Rechenzentren in der EU verarbeitet.',
  },
  {
    question: 'Gibt es eine mobile App?',
    answer: 'Ja! Du findest sie im App Store und auf Google Play.',
  },
];

const smartPrompts = [
  '🔐 Wie funktioniert die Authentifizierung?',
  '📦 Was sind Module in Omnixys?',
  '💡 Wie kann ich meine Daten importieren?',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userInput.trim() },
    ]);
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = `OmniBot: Danke für deine Nachricht – wir melden uns bald!`;
      setChatMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ email: '', subject: '', message: '' });
    setSubmitted(true);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1300,
      }}
    >
      <Snackbar
        open={submitted}
        autoHideDuration={4000}
        onClose={() => setSubmitted(false)}
      >
        <Alert severity="success" variant="filled">
          Danke für deine Nachricht!
        </Alert>
      </Snackbar>

      {open ? (
        <GlassCard
          variant="strong"
          sx={{
            width: 340,
            maxHeight: 520,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography sx={{ color: "#fff", fontWeight: 600 }}>
              OmniBot · Hilfe & Support
            </Typography>

            <IconButton
              size="small"
              onClick={() => setOpen(false)}
              sx={{ color: "#fff" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Scrollbarer Inhalt */}
          <Box sx={{ flex: 1, overflowY: "auto", px: 2, pb: 2 }}>
            {/* Smart Prompts */}
            <Typography
              variant="body2"
              color={"#fff"}
              fontWeight={600}
              gutterBottom
            >
              💡 Beliebte Themen
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mb: 2,
              }}
            >
              {smartPrompts.map((prompt, i) => (
                <Button
                  key={i}
                  size="small"
                  variant="outlined"
                  fullWidth
                  onClick={() => setUserInput(prompt.replace(/^[^ ]+ /, ""))}
                  sx={{
                    justifyContent: "flex-start",
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.25)",
                    "&:hover": {
                      borderColor: "secondary.main",
                      background: "rgba(168,62,180,0.12)",
                    },
                  }}
                >
                  {prompt}
                </Button>
              ))}
            </Box>

            {/* FAQ */}
            <Typography
              variant="body2"
              color={"#fff"}
              fontWeight={600}
              gutterBottom
            >
              📋 Häufige Fragen
            </Typography>
            {faqs.map((faq, i) => (
              <Box key={i}>
                <ListItemButton
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  sx={{
                    borderRadius: 1,
                    color: "#fff",
                    "&:hover": {
                      background: "rgba(168,62,180,0.15)",
                    },
                  }}
                >
                  <ListItemText
                    primary={faq.question}
                    primaryTypographyProps={{
                      sx: {
                        color: "#fff",
                        fontWeight: 500,
                      },
                    }}
                  />
                  {openFaqIndex === i ? (
                    <ExpandLessIcon fontSize="small" sx={{ color: "#fff" }} />
                  ) : (
                    <ExpandMoreIcon fontSize="small" sx={{ color: "#fff" }} />
                  )}
                </ListItemButton>

                <Collapse in={openFaqIndex === i} timeout="auto" unmountOnExit>
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 1,
                      mx: 1,
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </Box>
                </Collapse>
              </Box>
            ))}

            {/* Chatverlauf */}
            <Typography
              variant="body2"
              fontWeight={600}
              gutterBottom
              sx={{ mt: 3 }}
              color={"#fff"}
            >
              💬 Chat mit OmniBot
            </Typography>
            <Box
              sx={{
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(6px)",
                borderRadius: 2,
                p: 1,
                mb: 1,
                maxHeight: 120,
                overflowY: "auto",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {chatMessages.map((msg, idx) => (
                <Box
                  key={idx}
                  sx={{
                    textAlign: msg.sender === "user" ? "right" : "left",
                    my: 0.5,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      display: "inline-block",
                      px: 1.5,
                      py: 0.75,
                      borderRadius: 2,
                      background:
                        msg.sender === "user"
                          ? "linear-gradient(90deg, rgba(168,62,180,0.8), rgba(112,66,248,0.8))"
                          : "rgba(255,255,255,0.12)",
                      color: "#fff",
                      boxShadow:
                        msg.sender === "user"
                          ? "0 0 12px rgba(168,62,180,0.6)"
                          : "none",
                    }}
                  >
                    {msg.text}
                  </Typography>
                </Box>
              ))}
              {isTyping && (
                <Typography
                  variant="caption"
                  color={"#fff"}
                  sx={{ opacity: 0.6 }}
                >
                  OmniBot tippt...
                </Typography>
              )}
            </Box>

            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
              <TextField
                size="small"
                fullWidth
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Nachricht schreiben…"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(6px)",
                    color: "#fff",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.2)",
                  },
                  "& input": {
                    color: "#fff",
                  },
                }}
              />

              <Button variant="contained" onClick={handleSendMessage}>
                Senden
              </Button>
            </Box>

            {/* Kontaktformular */}
            <Typography
              variant="body2"
              color={"#fff"}
              fontWeight={600}
              gutterBottom
            >
              ✉️ Direktnachricht senden
            </Typography>
            <Box
              component="form"
              onSubmit={handleFormSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}
            >
              <TextField
                label="Deine E-Mail"
                name="email"
                size="small"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                sx={glassInputSx}
              />

              <TextField
                label="Betreff"
                name="subject"
                size="small"
                required
                value={formState.subject}
                onChange={(e) =>
                  setFormState({ ...formState, subject: e.target.value })
                }
                sx={glassInputSx}
              />

              <TextField
                label="Nachricht"
                name="message"
                multiline
                rows={3}
                required
                size="small"
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                sx={glassInputSx}
              />

              <Button variant="contained" type="submit" size="small">
                Absenden
              </Button>
            </Box>
          </Box>

          {/* Footer Hinweis */}
          <Box sx={{ px: 2, py: 1, borderTop: "1px solid #eee" }}>
            <Typography variant="caption" sx={{ opacity: 0.6, color: "#fff" }}>
              Deine Nachricht wird vertraulich übermittelt.
            </Typography>
          </Box>
        </GlassCard>
      ) : (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              width: 56,
              height: 56,
              backdropFilter: "blur(12px)",
              background: "rgba(20,12,40,0.85)",
              borderTop: "1px solid rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              boxShadow: "0 0 24px rgba(168,62,180,0.6)",
              "&:hover": {
                boxShadow: "0 0 36px rgba(168,62,180,0.85)",
              },
            }}
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
        </motion.div>
      )}
    </Box>
  );
}
