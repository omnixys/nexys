/**
 * @file ProfileKpiGrid.tsx
 * @description Grid layout for profile KPI cards
 */

"use client";

import { Grid, useTheme } from "@mui/material";
import ProfileKpiCard from "./ProfileKpiCard";
import { User } from "@/types/user/user.type";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DonutSmallOutlinedIcon from "@mui/icons-material/DonutSmallOutlined";

type Props = {
  user: User;
  profileCompleteness: number;
};

export default function ProfileKpiGrid({ user, profileCompleteness }: Props) {
  const theme = useTheme();

  return (
    <Grid container spacing={2} mb={4}>
      <Grid item xs={12} sm={6} md={3}>
        <ProfileKpiCard
          label="Profile"
          value={`${profileCompleteness}%`}
          hint="Completeness"
          icon={
            <DonutSmallOutlinedIcon
              sx={{ color: theme.palette.primary.main }}
            />
          }
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <ProfileKpiCard
          label="Contacts"
          value={user?.contacts.length}
          hint="Saved contacts"
          icon={
            <ContactsOutlinedIcon
              sx={{ color: theme.palette.secondary.main }}
            />
          }
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <ProfileKpiCard
          label="Addresses"
          value={user?.address?.length}
          hint="Registered locations"
          icon={
            <HomeOutlinedIcon sx={{ color: theme.palette.omnixys.primary }} />
          }
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <ProfileKpiCard
          label="Security"
          value={user.securityQuestions.length >= 2 ? "Secure" : "Incomplete"}
          hint={`${user.securityQuestions.length} questions set`}
          icon={
            <CheckCircleOutlineIcon
              sx={{
                color:
                  user.securityQuestions.length >= 2
                    ? theme.palette.success.main
                    : theme.palette.text.secondary,
              }}
            />
          }
        />
      </Grid>
    </Grid>
  );
}
