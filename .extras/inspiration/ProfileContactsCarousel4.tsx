/**
 * @file ProfileContactsCarousel.tsx
 * @description Minimal luxury contacts grid
 */

"use client";

import { Box, Grid, Typography, Chip, alpha, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { User } from "@/types/user/user.type";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmergencyIcon from "@mui/icons-material/Emergency";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";

type Props = {
  user: User;
};

type Contact = User["contacts"][number];

export default function ProfileContactsCarousel({ user }: Props) {
  const theme = useTheme();
  const contacts: Contact[] = user?.contacts ?? [];

  const getContactIcon = (contact: Contact) => {
    const type = contact.relationship;
    switch (type) {
      case "FAMILY":
      case "PARENT":
      case "SIBLING":
      case "CHILD":
      case "RELATIVE":
        return <FamilyRestroomIcon />;
      case "BUSINESS_PARTNER":
        return <BusinessIcon />;
      case "COLLEAGUE":
        return <WorkIcon />;
      case "PARTNER":
        return <FavoriteIcon />;
      default:
        return <ContactPhoneIcon />;
    }
  };

  const getContactColor = (contact: Contact) => {
    const type = contact.relationship;
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
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <ContactPhoneIcon sx={{ fontSize: 28, opacity: 0.7 }} />
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
          No contacts
        </Typography>
        <Typography variant="caption" color="text.secondary" textAlign="center">
          Add your first trusted contact
        </Typography>
      </Box>
    );
  }

  const totalLimit = contacts.reduce((sum, c) => sum + c.withdrawalLimit, 0);
  const emergencyCount = contacts.filter((c) => c.emergency).length;

  return (
    <Box
      sx={{
        borderRadius: 4,
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
          backgroundSize: "30px 30px",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ mb: 0.5, letterSpacing: "-0.3px" }}
          >
            Trust Network
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ letterSpacing: "0.3px" }}
            >
              {contacts.length} connections
            </Typography>
            <Box
              sx={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.3)",
              }}
            />
            <Typography variant="caption" color="text.secondary">
              €{totalLimit.toLocaleString()} total limit
            </Typography>
            {emergencyCount > 0 && (
              <>
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    bgcolor: "rgba(255,255,255,0.3)",
                  }}
                />
                <Typography variant="caption" color="error">
                  {emergencyCount} emergency
                </Typography>
              </>
            )}
          </Box>
        </Box>

        {/* Contacts Grid */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            pr: 1,
            "&::-webkit-scrollbar": {
              width: 4,
            },
            "&::-webkit-scrollbar-track": {
              background: alpha("#000", 0.1),
              borderRadius: 2,
            },
            "&::-webkit-scrollbar-thumb": {
              background: alpha("#2196F3", 0.3),
              borderRadius: 2,
            },
          }}
        >
          <Grid container spacing={2}>
            {contacts.map((contact, index) => (
              <Grid item xs={6} key={contact.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ContactCard
                    contact={contact}
                    color={getContactColor(contact)}
                    icon={getContactIcon(contact)}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Footer Stats */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            Avg. limit: €
            {(totalLimit / contacts.length).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            Last updated: Today
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function ContactCard({
  contact,
  color,
  icon,
}: {
  contact: Contact;
  color: string;
  icon: React.ReactNode;
}) {
  const startDate = new Date(contact.startDate);
  const duration = Math.floor(
    (new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30),
  );

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        transition: "all 0.3s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          borderColor: color,
          transform: "translateY(-4px)",
          background: "rgba(255,255,255,0.05)",
          boxShadow: `0 8px 32px ${alpha(color, 0.1)}`,
        },
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(color, 0.1),
              color: color,
              border: `1px solid ${alpha(color, 0.2)}`,
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              {contact.relationship.replace("_", " ")}
            </Typography>
          </Box>
        </Box>

        {contact.emergency && (
          <EmergencyIcon sx={{ fontSize: 16, color: "#FF5252" }} />
        )}
      </Box>

      {/* Limit */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
        €{contact.withdrawalLimit.toLocaleString()}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
        Withdrawal limit
      </Typography>

      {/* Dates */}
      <Box
        sx={{
          mt: "auto",
          pt: 2,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ mb: 0.5 }}
        >
          Active {duration} months
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Since{" "}
          {startDate.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </Typography>
      </Box>
    </Box>
  );
}
