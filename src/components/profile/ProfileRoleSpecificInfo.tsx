/**
 * @file ProfileRoleSpecificInfo.tsx
 * @description Customer interests panel (role-specific info)
 */

"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { UserType } from "@/generated/graphql";
import type { User } from "@/graphql/graphql.type";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import CustomerInterestSpectrum from "../profile/SpectrumRow";

type Props = {
  user: User;
};

export default function ProfileRoleSpecificInfo({ user }: Props) {
  const theme = useTheme();
  const tProfile = useTypedTranslations("profile");
  const tSection = useTypedTranslations("profile");

  const interests = user?.customer?.customerInterest ?? [];
  const isCustomer = user?.userType === UserType.Customer;

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        height: "100%",
        px: 10,
        py: 2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          mb: 3,
          background: "linear-gradient(90deg, #2196F3 0%, #00BCD4 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {tSection("section.interests")}
      </Typography>

      {!isCustomer ? (
        <Typography variant="body2" color="text.secondary">
          {tProfile("value.interestsOnlyForCustomers")}
        </Typography>
      ) : interests.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {tProfile("value.noInterests")}
        </Typography>
      ) : (
        <Stack spacing={2}>
          <CustomerInterestSpectrum interests={interests} />
        </Stack>
      )}
    </Box>
  );
}
