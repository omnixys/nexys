/**
 * @file ProfileStatusStrip.tsx
 * @description Horizontal profile status strip (read-only system status)
 */

"use client";

import { Box, Divider, Stack, useTheme } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DonutSmallOutlinedIcon from "@mui/icons-material/DonutSmallOutlined";
import { motion } from "framer-motion";
import { User } from "../../types/user/user.type";
import { IconLabelValue } from "../ui/value/IconLabelValue";
import { formatUserStatus, getStatusIcon, getStatusValueColor } from "../../utils/enums/userStatusType.utils";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { formatUserType } from "../../utils/enums/userType.utils";
import { useTranslations } from "next-intl";


type Props = {
  user: User;
  completeness: number;
  secure: boolean;
};

const MotionBox = motion(Box);

export default function ProfileStatusStrip({
  completeness,
  secure,
  user,
}: Props) {
  const theme = useTheme();

    const tCommon = useTranslations("common");
  const tUser = useTranslations("user");
  const tProfile = useTranslations("profile");
     const tSecurity = useTranslations("security");

  const contacts = user?.contacts?.length ?? 0;
  const addresses = user?.addresses?.length ?? 0;

  // UserType
  const userTypeIcon = (
    <AccountCircleOutlinedIcon sx={{ color: theme.palette.text.secondary }} />
  );

  const statusLabel = formatUserStatus(user?.status, tUser);
  const statusIcon = getStatusIcon(user?.status, theme);
  const statusValueColor = getStatusValueColor(user?.status, theme);
  const userTypeLabel = formatUserType(user?.userType, tUser);

  return (
    <MotionBox
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      sx={{ display: "flex", alignItems: "center", height: "100%" }}
    >
      <Stack
        direction="row"
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem sx={{ mx: 2 }} />}
        spacing={2}
        sx={{ flexWrap: "wrap" }}
      >
        <IconLabelValue
          icon={
            <DonutSmallOutlinedIcon
              sx={{ color: theme.palette.primary.main }}
            />
          }
          label={`${tProfile("labels.profile")}:`}
          value={`${completeness}%`}
        />

        <IconLabelValue
          icon={
            <ContactsOutlinedIcon
              sx={{ color: theme.palette.text.secondary }}
            />
          }
          label={tUser("labels.contacts")}
          value={contacts}
        />

        <IconLabelValue
          icon={
            <HomeOutlinedIcon sx={{ color: theme.palette.text.secondary }} />
          }
          label={tUser("labels.addresses")}
          value={addresses}
        />

        <IconLabelValue
          icon={
            secure ? (
              <CheckCircleOutlineIcon
                sx={{ color: theme.palette.success.main }}
              />
            ) : (
              <WarningAmberOutlinedIcon
                sx={{ color: theme.palette.error.main }}
              />
            )
          }
          label={tSecurity("labels.securityLevel")}
          value={
            secure
              ? tSecurity("values.secure")
              : tSecurity("values.actionRequired")
          }
        />

        {/* --- User Type --- */}
        <IconLabelValue
          icon={userTypeIcon}
          label={tUser("labels.type")}
          value={userTypeLabel}
        />

        {/* --- Status --- */}
        <IconLabelValue
          icon={statusIcon}
          label={tUser("labels.status")}
          value={statusLabel}
          valueSx={{ color: statusValueColor }}
        />
      </Stack>
    </MotionBox>
  );
}
