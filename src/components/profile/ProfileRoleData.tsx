"use client";

import { Box, Button, Chip, Stack, Typography, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import NotificationsOffOutlinedIcon from "@mui/icons-material/NotificationsOffOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

import {
  USER_CUSTOMER_CONTACT_OPTION_I18N,
  USER_CUSTOMER_TIER_I18N,
} from "@/types/user/enum-translations";
import { UserType } from "@/types/user/user-enum-type";
import { User } from "@/types/user/user.type";
import { formatEnum } from "@/utils/format-enum";
import { useRotatingValue } from "../../hooks/useRotatingValue";
import { IconLabelValueRow } from "../ui/value/IconLabelValueRow";

type Props = {
  user: User;
  isAdmin: boolean;
};

const MotionSpan = motion.span;

export default function ProfileRoleData({ user, isAdmin }: Props) {
  const theme = useTheme();
  const tUser = useTranslations("user");

  const type = user?.userType;

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 3,
        height: "100%",
      }}
    >
      <Typography fontWeight={700} sx={{ mb: 2 }}>
        {useTranslations("sections")("roleData")}
      </Typography>

      {type === UserType.GUEST && <GuestBlock tUser={tUser} />}
      {type === UserType.CUSTOMER && (
        <CustomerBlock user={user} tUser={tUser} theme={theme} />
      )}
      {type === UserType.EMPLOYEE && (
        <EmployeeBlock
          user={user}
          tUser={tUser}
          theme={theme}
          isAdmin={isAdmin}
        />
      )}
    </Box>
  );
}

/* ------------------------------------------------------------ */
/* Blocks                                                       */
/* ------------------------------------------------------------ */

function CustomerBlock({
  user,
  tUser,
  theme,
}: {
  user: User;
  tUser: ReturnType<typeof useTranslations>;
  theme: any;
}) {
  const subscribed = !!user?.customer?.subscribed;

  const contactOptions = user?.customer?.contactOptions ?? [];
  const rotatingContact = useRotatingValue(contactOptions, 2200);

  return (
    <Stack spacing={2}>
      {/* Role (KC role) */}
      <IconLabelValueRow
        // icon={<BadgeOutlinedIcon fontSize="small" color="disabled" />}
        icon={
          <WorkspacePremiumOutlinedIcon fontSize="small" color="disabled" />
        }
        label={tUser("customer.labels.tier")}
        rootSx={{ gap: 0 }}
      >
        <Chip
          label={formatEnum(tUser, USER_CUSTOMER_TIER_I18N, user?.role)}
          size="small"
          sx={{
            bgcolor: theme.palette.secondary.main + "22",
            color: theme.palette.secondary.main,
            fontWeight: 600,
          }}
        />
      </IconLabelValueRow>

      {/* Subscription */}
      <IconLabelValueRow
        icon={
          subscribed ? (
            <NotificationsActiveOutlinedIcon
              fontSize="small"
              sx={{ color: theme.palette.success.main }}
            />
          ) : (
            <NotificationsOffOutlinedIcon fontSize="small" color="disabled" />
          )
        }
        label={tUser("customer.labels.subscription")}
        rootSx={{ gap: 0 }}
      >
        <Chip
          label={
            subscribed
              ? tUser("customer.values.subscribed")
              : tUser("customer.values.notSubscribed")
          }
          size="small"
          sx={{
            bgcolor: subscribed
              ? theme.palette.success.main + "22"
              : theme.palette.divider,
            color: subscribed
              ? theme.palette.success.main
              : theme.palette.text.secondary,
            fontWeight: 600,
          }}
        />
      </IconLabelValueRow>

      {/* Contact Options (rotating fade) */}
      <IconLabelValueRow
        icon={<AlternateEmailOutlinedIcon fontSize="small" color="disabled" />}
        label={tUser("customer.labels.contactOptions")}
        rootSx={{ gap: 0 }}
      >
        {contactOptions.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            —
          </Typography>
        ) : (
          <Stack direction="row" spacing={1} alignItems="center">
            <AnimatePresence mode="wait">
              <MotionSpan
                key={rotatingContact ?? "none"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <Chip
                  // label={formatContactOption(rotatingContact, tUser)}
                  label={formatEnum(
                    tUser,
                    USER_CUSTOMER_CONTACT_OPTION_I18N,
                    rotatingContact?.toString(),
                  )}
                  size="small"
                  sx={{
                    bgcolor: theme.palette.info.main + "22",
                    color: theme.palette.info.main,
                    fontWeight: 600,
                  }}
                />
              </MotionSpan>
            </AnimatePresence>

            <Typography variant="caption" color="text.secondary">
              ({contactOptions.length})
            </Typography>
          </Stack>
        )}
      </IconLabelValueRow>
    </Stack>
  );
}

function EmployeeBlock({
  user,
  tUser,
  theme,
}: {
  user: User;
  tUser: ReturnType<typeof useTranslations>;
  theme: any;
}) {
  const emp = user?.employee;

  return (
    <Stack spacing={1}>
      <IconLabelValueRow
        icon={<BusinessOutlinedIcon fontSize="small" color="disabled" />}
        label={tUser("employee.labels.department")}
        labelWidth={100}
      >
        <Typography variant="body2" fontWeight={600}>
          {emp?.department ?? "—"}
        </Typography>
      </IconLabelValueRow>

      <IconLabelValueRow
        icon={<WorkOutlineOutlinedIcon fontSize="small" color="disabled" />}
        label={tUser("employee.labels.position")}
        labelWidth={100}
      >
        <Typography variant="body2" fontWeight={600}>
          {emp?.position ?? "—"}
        </Typography>
      </IconLabelValueRow>

      {/* Job role/function */}
      <IconLabelValueRow
        icon={<BadgeOutlinedIcon fontSize="small" color="disabled" />}
        label={tUser("employee.labels.role")}
        labelWidth={100}
      >
        <Typography variant="body2" fontWeight={600}>
          {emp?.role ?? tUser("employee.values.notAvailable")}
        </Typography>
      </IconLabelValueRow>

      <IconLabelValueRow
        icon={<BadgeOutlinedIcon fontSize="small" color="disabled" />}
        label={tUser("employee.labels.isExternal")}
        labelWidth={100}
      >
        <Chip
          label={
            emp?.isExternal
              ? tUser("employee.values.external")
              : tUser("employee.values.internal")
          }
          size="small"
          sx={{
            bgcolor: emp?.isExternal
              ? theme.palette.warning.main + "22"
              : theme.palette.success.main + "22",
            color: emp?.isExternal
              ? theme.palette.warning.main
              : theme.palette.success.main,
            fontWeight: 600,
          }}
        />
      </IconLabelValueRow>
    </Stack>
  );
}

function GuestBlock({ tUser }: { tUser: ReturnType<typeof useTranslations> }) {
  return (
    <Stack spacing={2}>
      <Typography variant="body2" color="text.secondary">
        {tUser("guest.messages.guestRoleDataUnavailable")}
      </Typography>

      <Button variant="contained" size="small">
        {tUser("guest.actions.createAccount")}
      </Button>
    </Stack>
  );
}
