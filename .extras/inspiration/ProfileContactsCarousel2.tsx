/**
 * @file ProfileContactsCarousel.tsx
 * @description Luxurious contacts carousel with glassmorphism + staggered animations
 */

"use client";

import { Box, Stack, Typography, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { User } from "@/types/user/user.type";
import { RelationshipType } from "@/types/contact.type";

const MotionBox = motion(Box);

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

type Props = { user: User };

export default function ProfileContactsCarousel({ user }: Props) {
  const theme = useTheme();
  const contacts = user?.contacts ?? [];

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: alpha(theme.palette.background.paper, 0.6),
        backdropFilter: "blur(24px)",
        border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
        boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.25)}`,
      }}
    >
      {/* Gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(160deg, ${alpha(theme.palette.primary.main, 0.04)} 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      <Box sx={{ position: "relative", p: 3, height: "100%" }}>
        <Typography
          variant="overline"
          sx={{
            letterSpacing: 2,
            color: theme.palette.text.secondary,
            mb: 3,
            display: "block",
          }}
        >
          Contacts
        </Typography>

        {contacts.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "calc(100% - 60px)",
              opacity: 0.5,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No contacts added yet.
            </Typography>
          </Box>
        ) : (
          <MotionBox
            drag="x"
            dragConstraints={{ left: -((contacts.length - 1) * 280), right: 0 }}
            dragElastic={0.08}
            whileTap={{ cursor: "grabbing" }}
            style={{ cursor: "grab" }}
          >
            <MotionBox
              component={Stack}
              direction="row"
              spacing={2.5}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </MotionBox>
          </MotionBox>
        )}
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------ */
/* Card                                                         */
/* ------------------------------------------------------------ */

function ContactCard({ contact }: { contact: User["contacts"][number] }) {
  const theme = useTheme();

  return (
    <MotionBox
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      sx={{
        minWidth: 260,
        maxWidth: 260,
        borderRadius: 3,
        p: 2.5,
        bgcolor: alpha(theme.palette.background.default, 0.5),
        backdropFilter: "blur(12px)",
        border: `1px solid ${alpha(theme.palette.common.white, 0.06)}`,
        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.2)}`,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        userSelect: "none",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography fontWeight={600} sx={{ mb: 0.25 }}>
            {formatRelationship(contact.relationship)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Since {new Date(contact.startDate).toLocaleDateString()}
          </Typography>
        </Box>

        {contact.emergency && (
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.error.main, 0.15),
              border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: theme.palette.error.light,
                letterSpacing: 0.5,
              }}
            >
              Emergency
            </Typography>
          </Box>
        )}
      </Stack>

      {/* Divider */}
      <Box
        sx={{
          height: 1,
          background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.3)}, transparent)`,
        }}
      />

      {/* Limit */}
      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mb: 0.5 }}
        >
          Withdrawal Limit
        </Typography>
        <Typography variant="h6" fontWeight={600}>
          €{contact.withdrawalLimit.toLocaleString()}
        </Typography>
      </Box>
    </MotionBox>
  );
}

/* ------------------------------------------------------------ */
/* Helper                                                       */
/* ------------------------------------------------------------ */

function formatRelationship(type: RelationshipType): string {
  return type
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
}
