/**
 * @file ProfileIdentityCard.tsx
 * @description Left-top identity card with avatar above identity pill
 */

"use client";

import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { User } from "@/types/user/user.type";

type Props = {
  user: User;
};

const MotionBox = motion(Box);

export default function ProfileIdentityCard({ user }: Props) {
  const theme = useTheme();

  return (
    <MotionBox
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      sx={{
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        textAlign: "center",
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          width: 96,
          height: 96,
          fontSize: 36,
          fontWeight: 700,
          bgcolor: theme.palette.primary.main,
        }}
      >
        {user?.personalInfo.firstName[0]}
        {user?.personalInfo.lastName[0]}
      </Avatar>

      {/* <Typography
        fontWeight={700}
        color={theme.palette.text.primary}
        variant={"body1"}
      >
        {user?.personalInfo.firstName} {user?.personalInfo.lastName}
      </Typography>

      <Typography
        fontWeight={700}
        color={theme.palette.text.primary}
        variant={"body2"}
      >
        {user?.personalInfo.email}
      </Typography> */}

      {/* Identity Pill */}
      <Box
        sx={{
          width: "100%",
          bgcolor: theme.palette.divider,
          borderRadius: 3,
          px: 2,
          py: 1.5,
        }}
      >
        <Stack spacing={0.5}>
          {/* Username – top left (visuell dominant) */}
          <Typography
            variant="body2"
            fontWeight={700}
            color="text.primary"
            textAlign="left"
          >
            @{user?.username}
          </Typography>

          {/* Bottom row */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="caption" color="text.secondary">
              {user?.personalInfo.email}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              since {new Date(user?.createdAt).toLocaleDateString()}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </MotionBox>
  );
}
