"use client";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import DonutSmallOutlinedIcon from "@mui/icons-material/DonutSmallOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { Box, Divider, Stack, useTheme } from "@mui/material";
import { motion, useAnimationFrame } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import type { User } from "@/graphql/graphql.type";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { useDevice } from "@/providers/DeviceProvider";
import {
  formatUserStatus,
  getStatusIcon,
  getStatusValueColor,
} from "@/utils/enums/userStatus.utils";

import { formatUserType } from "@/utils/enums/userType.utils";
import { IconLabelValue } from "../ui/value/IconLabelValue";

const MotionBox = motion(Box);

type Props = {
  user: User;
  completeness: number;
  secure: boolean;
};

export default function ProfileStatusStrip({ completeness, secure, user }: Props) {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState(false);
  const t = useTypedTranslations("profile");
  const enumT = useTypedTranslations("enums");

  const contacts = user?.contacts?.length || 0;

  const statusLabel = formatUserStatus(user?.status, enumT);
  const statusIcon = getStatusIcon(user?.status, theme);
  const statusColor = getStatusValueColor(user?.status, theme);
  const userTypeLabel = formatUserType(user?.userType, enumT);

  const securityIcon = secure ? (
    <CheckCircleOutlineIcon color="success" />
  ) : (
    <WarningAmberOutlinedIcon color="error" />
  );

  /*
   AUTO LOOP SCROLL
  */

  useAnimationFrame((_, delta) => {
    const el = containerRef.current;

    if (!el || hovered) return;
    const speed = 25;
    el.scrollLeft += (speed * delta) / 1000;
    const half = el.scrollWidth / 2;

    if (el.scrollLeft >= half) {
      el.scrollLeft -= half;
    }
  });

  const content = useMemo(
    () => (
      <Stack
        direction="row"
        alignItems="center"
        spacing={3}
        divider={<Divider orientation="vertical" flexItem sx={{ opacity: 0.25 }} />}
        sx={{ whiteSpace: "nowrap", px: 1 }}
      >
        <IconLabelValue
          icon={<DonutSmallOutlinedIcon color="primary" />}
          label={`${t("label.profile-score")}:`}
          value={`${completeness}%`}
        />

        <IconLabelValue
          icon={<ContactsOutlinedIcon />}
          label={t("label.contacts")}
          value={contacts}
        />
        {/* TODO */}
        {/* <IconLabelValue
          icon={<HomeOutlinedIcon />}
          label={t("label.addresses")}
          value={addresses}
        /> */}

        <IconLabelValue
          icon={securityIcon}
          label={t("label.securityLevel")}
          value={secure ? t("value.secure") : t("value.actionRequired")}
        />

        <IconLabelValue
          icon={<AccountCircleOutlinedIcon />}
          label={t("label.type")}
          value={userTypeLabel}
        />

        <IconLabelValue
          icon={statusIcon}
          label={t("label.status")}
          value={statusLabel}
          valueSx={{ color: statusColor }}
        />
      </Stack>
    ),
    [
      t,
      completeness,
      contacts,
      secure,
      statusIcon,
      statusLabel,
      statusColor,
      userTypeLabel,
      securityIcon,
    ],
  );

  return (
    <MotionBox
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      sx={{ width: "100%" }}
    >
      <MotionBox
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: -1000, right: 0 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          gap: 6,
          cursor: "grab",
        }}
      >
        {content}
        {content}
        {content}
        {content}
        {content}
        {content}
        {content}
      </MotionBox>
    </MotionBox>
  );
}
