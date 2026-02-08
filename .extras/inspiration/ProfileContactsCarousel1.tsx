/**
 * @file ProfileContactsCarousel.tsx
 * @description Horizontal contacts carousel (read-only)
 */

"use client";

import { Box, Stack, Typography, Chip, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { User } from "@/types/user/user.type";

type Props = {
  user: User;
};

const MotionBox = motion(Box);

export default function ProfileContactsCarousel({ user }: Props) {
  const theme = useTheme();
  const contacts = user?.contacts ?? [];

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: theme.shape.borderRadius,
        p: 3,
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Typography fontWeight={700} sx={{ mb: 2, ml: 12 }}>
        Contacts
      </Typography>

      {contacts.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No contacts added yet.
        </Typography>
      ) : (
        <MotionBox
          drag="x"
          dragConstraints={{ left: -((contacts.length - 1) * 260), right: 0 }}
          dragElastic={0.12}
          style={{ cursor: "grab" }}
        >
          <Stack direction="row" spacing={2}>
            {contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </Stack>
        </MotionBox>
      )}
    </Box>
  );
}

/* ------------------------------------------------------------ */
/* Card                                                         */
/* ------------------------------------------------------------ */

function ContactCard({ contact }: { contact: User["contacts"][number] }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minWidth: 240,
        maxWidth: 240,
        borderRadius: 3,
        p: 2,
        bgcolor: theme.palette.divider,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      {/* Header */}
      <Stack spacing={0.5}>
        <Typography fontWeight={600}>Contact</Typography>

        <Typography variant="caption" color="text.secondary">
          {contact.relationship}
        </Typography>
      </Stack>

      {/* Meta */}
      <Stack spacing={0.5}>
        {contact.emergency && (
          <Chip
            size="small"
            label="Emergency"
            sx={{
              bgcolor: theme.palette.error.main + "22",
              color: theme.palette.error.main,
              fontWeight: 600,
              width: "fit-content",
            }}
          />
        )}

        <Typography variant="body2">
          Limit: €{contact.withdrawalLimit}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Since {new Date(contact.startDate).toLocaleDateString()}
        </Typography>
      </Stack>
    </Box>
  );
}
