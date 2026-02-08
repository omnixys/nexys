/**
 * @file ProfilePageSkeleton.tsx
 * @description Loading skeleton for profile page layout
 */

"use client";

import React from "react";
import { Box, Skeleton, Stack, useTheme } from "@mui/material";

export default function ProfilePageSkeleton() {
  const theme = useTheme();

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 3 } }}>
      {/* Title + subtitle */}
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Skeleton variant="text" width={520} height={52} />
        <Skeleton variant="text" width={360} height={26} />
      </Stack>

      {/* Status strip */}
      <Box
        sx={{
          borderRadius: 999,
          p: 2,
          bgcolor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
          mb: 3,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Skeleton variant="circular" width={22} height={22} />
          <Skeleton variant="text" width={120} height={24} />
          <Skeleton variant="text" width={100} height={24} />
          <Skeleton variant="text" width={90} height={24} />
          <Skeleton variant="text" width={160} height={24} />
        </Stack>
      </Box>

      {/* Grid cards (match your profile layout) */}
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", md: "1fr 1.6fr" },
          alignItems: "stretch",
        }}
      >
        {/* Left card */}
        <Box
          sx={{
            borderRadius: 4,
            p: 3,
            bgcolor: "background.paper",
            border: `1px solid ${theme.palette.divider}`,
            minHeight: 180,
          }}
        >
          <Stack spacing={2}>
            <Skeleton variant="text" width={140} height={24} />
            <Skeleton variant="rounded" width="100%" height={36} />
            <Skeleton variant="rounded" width="100%" height={36} />
            <Skeleton variant="rounded" width="90%" height={36} />
          </Stack>
        </Box>

        {/* Right card */}
        <Box
          sx={{
            borderRadius: 4,
            p: 3,
            bgcolor: "background.paper",
            border: `1px solid ${theme.palette.divider}`,
            minHeight: 180,
          }}
        >
          <Stack spacing={2}>
            <Skeleton variant="text" width={180} height={24} />
            <Skeleton variant="text" width={320} height={44} />
            <Skeleton variant="text" width={260} height={26} />
            <Skeleton variant="text" width={420} height={26} />
          </Stack>
        </Box>
      </Box>

      {/* Lower section placeholder */}
      <Box sx={{ mt: 3 }}>
        <Box
          sx={{
            borderRadius: 4,
            p: 3,
            bgcolor: "background.paper",
            border: `1px solid ${theme.palette.divider}`,
            minHeight: 260,
          }}
        >
          <Stack spacing={2}>
            <Skeleton variant="text" width={220} height={24} />
            <Skeleton variant="rounded" width="100%" height={180} />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
