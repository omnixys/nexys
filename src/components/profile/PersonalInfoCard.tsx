/**
 * @file ProfilePersonalInfo.tsx
 * @description Luxury identity-style personal profile (read-only)
 */

"use client";

import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";

import { User } from "@/types/user/user.type";
import { formatEnum } from "@/utils/format-enum";
import {
  GENDER_I18N,
  MARITAL_STATUS_I18N,
  PHONE_NUMBER_TYPE_I18N,
} from "@/types/user/enum-translations";
import { getAgeYears } from "../../utils/enums/date.utils";

type Props = {
  user: User;
  isAdmin: boolean;
};

export default function ProfilePersonalInfo({ user, isAdmin }: Props) {
  const theme = useTheme();

  const tCommon = useTranslations("common");
  const tUser = useTranslations("user");
  const locale = useLocale();

  const info = user?.personalInfo;

const birthDateObj = info?.birthDate ? new Date(info.birthDate) : null;

const birthDate = birthDateObj
  ? new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(birthDateObj)
  : null;

  const ageYears = birthDateObj ? getAgeYears(birthDateObj) : null;
  
  const bornPart =
    birthDate && ageYears !== null
      ? tUser("personal.values.bornOnWithAge", {
          date: birthDate,
          age: ageYears,
        })
      : birthDate
        ? tUser("personal.values.bornOn", { date: birthDate })
        : null;



  // Translated gender / maritalStatus (fallback to "—" if missing)
  const genderLabel = info?.gender
    ? formatEnum(tUser, GENDER_I18N, info.gender)
    : tCommon("values.notAvailable");

  const maritalLabel = info?.maritalStatus
    ? formatEnum(tUser, MARITAL_STATUS_I18N, info.maritalStatus)
    : tCommon("values.notAvailable");

  // Access label (admin vs standard)
  const accessLabel = isAdmin
    ? tUser("employee.values.admin")
    : tUser("employee.values.standard");
  
    const headlineParts = [
      bornPart,
      info?.gender ? genderLabel : null,
      info?.maritalStatus ? maritalLabel : null,
    ]
      .filter(Boolean)
      .join(" · ");



  return (
    <Box
      sx={{
        px: isAdmin ? 1 : 5,
        py: isAdmin ? 4 : 2,
        height: "100%",
      }}
    >
      {/* Section title */}
      {/* <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mb: 1, letterSpacing: 0.6 }}
      >
        {tUser("personal.labels.title")}
      </Typography> */}

      {/* Identity */}
      <Stack spacing={1.2}>
        <Stack spacing={0.5}>
          <Stack
            direction="row"
            alignItems="baseline"
            spacing={1}
            flexWrap="wrap"
          >
            {/* Access badge (admin vs standard) */}

            {user.employee && (
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{
                  backgroundImage: isAdmin
                    ? "linear-gradient(90deg, #a855f7, #06b6d4)"
                    : "linear-gradient(90deg, #64748b, #94a3b8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {accessLabel}
              </Typography>
            )}

            <Typography variant="h4" fontWeight={700}>
              {info?.firstName} {info?.lastName}
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            @{user?.username} · {info?.email}
          </Typography>
        </Stack>

        {!!headlineParts && (
          <Typography variant="body2" color="text.secondary">
            {headlineParts}
          </Typography>
        )}
      </Stack>

      {/* Contact */}
      {info?.phoneNumbers?.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 1, display: "block", letterSpacing: 0.6 }}
          >
            {tUser("personal.titles.contact")}
          </Typography>

          <Stack spacing={0.75}>
            {info.phoneNumbers.map((phone) => {
              const phoneTypeLabel = phone.type
                ? formatEnum(tUser, PHONE_NUMBER_TYPE_I18N, phone.type)
                : null;

              return (
                <Typography key={phone.id} variant="body2" fontWeight={500}>
                  {phoneTypeLabel && (
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ mr: 0.5 }}
                    >
                      {phoneTypeLabel}
                      {" · "}
                    </Typography>
                  )}
                  {phone.number}
                </Typography>
              );
            })}
          </Stack>

          {/* <InfoRow
            label="Hire date"
            value={new Date(user?.employee.hireDate).toLocaleDateString()}
          /> */}
        </Box>
      )}
    </Box>
  );
}
