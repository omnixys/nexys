/**
 * @file ProfilePersonalInfo.tsx
 * @description Luxury identity-style personal profile (read-only)
 */

"use client";

import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";

import {
  GENDER_I18N,
  MARITAL_STATUS_I18N,
  PHONE_NUMBER_TYPE_I18N,
} from "@/types/user/enum-translations";
import { getAgeYears } from "../../utils/enums/date.utils";
import { User } from "@/graphql/graphql.type";
import { formatEnum } from "@/i18n/format-enum";
import { GenderType } from "@/generated/graphql";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

type Props = {
  user: User;
  isAdmin: boolean;
};

export default function ProfilePersonalInfo({ user, isAdmin }: Props) {
  const theme = useTheme();

  const tCommon = useTranslations("common");
  const tUser = useTypedTranslations("profile");
  const tEnum = useTypedTranslations('enums');
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
      ? tUser("personal.bornOnWithAge", {
          date: birthDate,
          age: ageYears,
        })
      : birthDate
        ? tUser("personal.bornOn", { date: birthDate })
        : null;



  // Translated gender / maritalStatus (fallback to "—" if missing)
  const genderLabel = info?.gender
    ? formatEnum(tEnum, 'gender', info.gender)
    : tCommon("values.notAvailable");

  const maritalLabel = info?.maritalStatus
    ? formatEnum(tEnum,'maritalStatus', info.maritalStatus)
    : tCommon("values.notAvailable");

  // Access label (admin vs standard)
  const accessLabel = isAdmin
    ? tUser("employee.admin")
    : tUser("employee.standard");
  
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
        {tUser("user.personal.labels.title")}
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
      {info?.phoneNumbers?.length && info?.phoneNumbers?.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 1, display: "block", letterSpacing: 0.6 }}
          >
            {tUser("label.contact")}
          </Typography>

          <Stack spacing={0.75}>
            {info?.phoneNumbers?.map((phone) => {
              const phoneTypeLabel = phone.type
                ? formatEnum(tEnum, "phoneType", phone.type)
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
