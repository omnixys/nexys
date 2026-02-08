/**
 * @file ProfileContactsCarousel.tsx
 * @description Luxury interactive contacts carousel with glassmorphism
 */

"use client";

import {
  Box,
  Stack,
  Typography,
  Chip,
  IconButton,
  alpha,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { User } from "@/types/user/user.type";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmergencyIcon from "@mui/icons-material/Emergency";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import BusinessIcon from "@mui/icons-material/Business";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type Props = {
  user: User;
};

type Contact = User["contacts"][number];

export default function ProfileContactsCarousel({ user }: Props) {
  const theme = useTheme();
  const contacts: Contact[] = user?.contacts ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying || contacts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % contacts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, contacts.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % contacts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + contacts.length) % contacts.length);
  };

  const getRelationshipIcon = (type: string) => {
    switch (type) {
      case "FAMILY":
      case "PARENT":
      case "SIBLING":
      case "CHILD":
      case "RELATIVE":
        return <FamilyRestroomIcon />;
      case "BUSINESS_PARTNER":
      case "COLLEAGUE":
        return <BusinessIcon />;
      case "PARTNER":
        return <FavoriteIcon />;
      default:
        return <ContactPhoneIcon />;
    }
  };

  const getRelationshipColor = (type: string) => {
    switch (type) {
      case "FAMILY":
        return "#FF6B6B";
      case "PARTNER":
        return "#FF4081";
      case "BUSINESS_PARTNER":
        return "#2196F3";
      case "COLLEAGUE":
        return "#4CAF50";
      case "FRIEND":
        return "#9C27B0";
      default:
        return "#757575";
    }
  };

  if (contacts.length === 0) {
    return (
      <Box
        sx={{
          borderRadius: 4,
          p: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: "rgba(33,150,243,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <ContactPhoneIcon sx={{ fontSize: 40, color: "primary.main" }} />
        </Box>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          No Contacts Yet
        </Typography>
        <Typography variant="caption" color="text.secondary" textAlign="center">
          Add trusted contacts for emergency access
        </Typography>
      </Box>
    );
  }

  const currentContact = contacts[currentIndex];

  return (
    <Box
      sx={{
        borderRadius: 4,
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(33,150,243,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            fontWeight={800}
            sx={{
              mb: 0.5,
              background: "linear-gradient(90deg, #2196F3 0%, #00BCD4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
            }}
          >
            Trusted Contacts
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            {contacts.length} trusted connections • Emergency access enabled
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => setIsPlaying(!isPlaying)}
            sx={{
              bgcolor: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <Chip
            label={`${currentIndex + 1}/${contacts.length}`}
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "text.primary",
            }}
          />
        </Box>
      </Box>

      {/* Main Carousel */}
      <Box
        ref={containerRef}
        sx={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <motion.div
          key={currentContact.id}
          initial={{ opacity: 0, scale: 0.9, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: -100 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ContactCard
            contact={currentContact}
            index={currentIndex}
            total={contacts.length}
            color={getRelationshipColor(currentContact.relationship)}
            icon={getRelationshipIcon(currentContact.relationship)}
          />
        </motion.div>

        {/* Navigation Arrows */}
        {contacts.length > 1 && (
          <>
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: 16,
                bgcolor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.25)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s",
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: 16,
                bgcolor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.25)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s",
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        )}
      </Box>

      {/* Pagination & Footer */}
      <Box
        sx={{
          mt: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Pagination Dots */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mb: 2,
          }}
        >
          {contacts.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: index === currentIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor:
                  index === currentIndex
                    ? getRelationshipColor(contacts[index].relationship)
                    : "rgba(255,255,255,0.2)",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  bgcolor:
                    index === currentIndex
                      ? getRelationshipColor(contacts[index].relationship)
                      : "rgba(255,255,255,0.3)",
                },
              }}
            />
          ))}
        </Box>

        {/* Stats Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: 2,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Total Withdrawal Limit: €
            {contacts
              .reduce((sum, c) => sum + c.withdrawalLimit, 0)
              .toLocaleString()}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {contacts.filter((c) => c.emergency).length} emergency contacts
          </Typography>
        </Box>

        {/* Keyboard Hint */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 1,
            opacity: 0.7,
          }}
        >
          Use ← → keys to navigate • Space to play/pause
        </Typography>
      </Box>
    </Box>
  );
}

function ContactCard({
  contact,
  index,
  total,
  color,
  icon,
}: {
  contact: Contact;
  index: number;
  total: number;
  color: string;
  icon: React.ReactNode;
}) {
  const theme = useTheme();
  const startDate = new Date(contact.startDate);
  const endDate = contact.endDate ? new Date(contact.endDate) : null;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        borderRadius: 4,
        p: 3,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.25)",
        boxShadow: `
          0 20px 60px rgba(0,0,0,0.15),
          0 0 0 1px rgba(255,255,255,0.1)
        `,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.5)} 100%)`,
        },
      }}
    >
      {/* Card Background Effect */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(color, 0.2)} 0%, transparent 70%)`,
          filter: "blur(20px)",
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* Card Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 8px 32px ${alpha(color, 0.3)}`,
              }}
            >
              {icon}
            </Box>
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 600, letterSpacing: "1px" }}
              >
                {contact.relationship.replace("_", " ")}
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                Contact #{index + 1}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            {contact.emergency && (
              <Chip
                size="small"
                icon={<EmergencyIcon />}
                label="Emergency"
                sx={{
                  bgcolor: alpha("#FF5252", 0.2),
                  border: `1px solid ${alpha("#FF5252", 0.3)}`,
                  color: "#FF5252",
                  fontWeight: 600,
                }}
              />
            )}
            <IconButton
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Contact Details */}
        <Stack spacing={2.5}>
          {/* Withdrawal Limit */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "rgba(255,255,255,0.05)",
              p: 2,
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Withdrawal Limit
              </Typography>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  background: `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                €{contact.withdrawalLimit.toLocaleString()}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Max per transaction
            </Typography>
          </Box>

          {/* Dates */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Active Since
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {startDate.toLocaleDateString()}
              </Typography>
            </Box>

            {endDate && (
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Valid Until
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {endDate.toLocaleDateString()}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Duration */}
          <Box
            sx={{
              bgcolor: "rgba(255,255,255,0.05)",
              p: 2,
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Relationship Duration
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {Math.floor(
                (new Date().getTime() - startDate.getTime()) /
                  (1000 * 60 * 60 * 24 * 30),
              )}{" "}
              months
            </Typography>
          </Box>
        </Stack>

        {/* Card Footer */}
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            ID: {contact.id.slice(0, 8)}
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              label="Active"
              size="small"
              color="success"
              sx={{
                bgcolor: alpha("#4CAF50", 0.2),
                color: "#4CAF50",
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
