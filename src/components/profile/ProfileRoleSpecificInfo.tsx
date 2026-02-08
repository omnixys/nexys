/**
 * @file ProfileRoleSpecificInfo.tsx
 * @description Customer interests panel (role-specific info)
 */

"use client";

import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";

import { User } from "@/types/user/user.type";
import { UserType } from "@/types/user/user-enum-type";
import CustomerInterestSpectrum from "../profile/SpectrumRow";

type Props = {
  user: User;
};

export default function ProfileRoleSpecificInfo({ user }: Props) {
  const theme = useTheme();
  const tProfile = useTranslations("profile");
      const tSection = useTranslations("sections");


  const interests = user?.customer?.interests ?? [];
  const isCustomer = user?.userType === UserType.CUSTOMER;

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
                     background:
                       "linear-gradient(90deg, #2196F3 0%, #00BCD4 100%)",
                     WebkitBackgroundClip: "text",
                     WebkitTextFillColor: "transparent",
                   }}
                 >
                   {tSection("interests")}
                 </Typography>

      {!isCustomer ? (
        <Typography variant="body2" color="text.secondary">
          {tProfile("messages.interestsOnlyForCustomers")}
        </Typography>
      ) : interests.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {tProfile("messages.noInterests")}
        </Typography>
      ) : (
        <Stack spacing={2}>
          <CustomerInterestSpectrum interests={interests} />
        </Stack>
      )}
    </Box>
  );
}
