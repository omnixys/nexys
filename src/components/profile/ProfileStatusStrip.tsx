"use client";

import { Box, Divider, Stack, useTheme } from "@mui/material";
import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";
import { useDevice } from "@/providers/DeviceProvider";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DonutSmallOutlinedIcon from "@mui/icons-material/DonutSmallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { User } from "../../types/user/user.type";
import { IconLabelValue } from "../ui/value/IconLabelValue";
import {
  formatUserStatus,
  getStatusIcon,
  getStatusValueColor,
} from "../../utils/enums/userStatusType.utils";
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
  const { isMobile } = useDevice();
  const containerRef = useRef<HTMLDivElement>(null);

  const tUser = useTranslations("user");
  const tProfile = useTranslations("profile");
  const tSecurity = useTranslations("security");

  const contacts = user?.contacts?.length ?? 0;
  const addresses = user?.addresses?.length ?? 0;

  const statusLabel = formatUserStatus(user?.status, tUser);
  const statusIcon = getStatusIcon(user?.status, theme);
  const statusValueColor = getStatusValueColor(user?.status, theme);
  const userTypeLabel = formatUserType(user?.userType, tUser);

  /* =========================================
     AUTO LOOP SCROLL (ONLY MOBILE)
  ========================================= */

  useAnimationFrame((_, delta) => {
    if (!isMobile || !containerRef.current) return;

    containerRef.current.scrollLeft += delta * 0.03;

    // Reset for seamless loop
    if (
      containerRef.current.scrollLeft >=
      containerRef.current.scrollWidth / 2
    ) {
      containerRef.current.scrollLeft = 0;
    }
  });

  const Content = (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      divider={
        <Divider orientation="vertical" flexItem sx={{ opacity: 0.3 }} />
      }
      sx={{
        whiteSpace: "nowrap",
      }}
    >
      <IconLabelValue
        icon={<DonutSmallOutlinedIcon color="primary" />}
        label={`${tProfile("labels.profile")}:`}
        value={`${completeness}%`}
      />

      <IconLabelValue
        icon={<ContactsOutlinedIcon />}
        label={tUser("labels.contacts")}
        value={contacts}
      />

      <IconLabelValue
        icon={<HomeOutlinedIcon />}
        label={tUser("labels.addresses")}
        value={addresses}
      />

      <IconLabelValue
        icon={
          secure ? (
            <CheckCircleOutlineIcon color="success" />
          ) : (
            <WarningAmberOutlinedIcon color="error" />
          )
        }
        label={tSecurity("labels.securityLevel")}
        value={
          secure
            ? tSecurity("values.secure")
            : tSecurity("values.actionRequired")
        }
      />

      <IconLabelValue
        icon={<AccountCircleOutlinedIcon />}
        label={tUser("labels.type")}
        value={userTypeLabel}
      />

      <IconLabelValue
        icon={statusIcon}
        label={tUser("labels.status")}
        value={statusLabel}
        valueSx={{ color: statusValueColor }}
      />
    </Stack>
  );

  return (
    <MotionBox
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      sx={{ width: "100%" }}
    >
      {isMobile ? (
        <Box
          ref={containerRef}
          sx={{
            overflow: "hidden",
            display: "flex",
            gap: 4,
          }}
        >
          {/* duplicated content for seamless loop */}
          {Content}
          {Content}
        </Box>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem sx={{ mx: 2 }} />}
        >
          {Content}
        </Stack>
      )}
    </MotionBox>
  );
}
