"use client";

import { SignUpFormValues } from "@/schemas/sign-up.schema";

import { Box, Chip, Divider, Typography } from "@mui/material";

import { useFormContext } from "react-hook-form";
import { useMemo } from "react";

import { formatAddressLines } from "../../../../utils/formatAddress";

import {
  GetAllInterestCategoriesDocument,
  GetAllInterestCategoriesQuery,
  GetAllInterestCategoriesQueryVariables,
} from "@/generated/graphql";

import { useQuery } from "@apollo/client/react";

import { useTypedTranslations } from "@/i18n/useTypedTranslations";

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box display="flex" justifyContent="space-between" gap={2} py={1}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>

      <Typography variant="body2" sx={{ fontWeight: 600, textAlign: "right" }}>
        {value || "—"}
      </Typography>
    </Box>
  );
}

export default function SummaryStep() {
  const { getValues } = useFormContext<SignUpFormValues>();
  const v = getValues();

  const t = useTypedTranslations("signup");
  const enumT = useTypedTranslations("enums");

  const { data } = useQuery<
    GetAllInterestCategoriesQuery,
    GetAllInterestCategoriesQueryVariables
  >(GetAllInterestCategoriesDocument, {
    fetchPolicy: "cache-first",
  });

  // ---------------------------
  // Interest Map
  // ---------------------------

  const interestMap = useMemo(() => {
    const map = new Map<string, string>();

    data?.getAllInterestCategories?.forEach((cat) => {
      cat.interests?.forEach((i) => {
        map.set(i.id, enumT(`interest.${i.key}`));
      });
    });

    return map;
  }, [data]);

  return (
    <>
      {/* TITLE */}

      <Typography variant="h5" sx={{ fontWeight: 700 }} mb={2}>
        {t("summary.title")}
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        {t("summary.description")}
      </Typography>

      <Box
        sx={{
          p: 3,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        {/* ACCOUNT */}

        <Typography variant="h6" sx={{ fontWeight: 700 }} mb={1.5}>
          {t("summary.sections.account")}
        </Typography>

        <Row label={t("summary.fields.username")} value={v.username} />

        <Divider sx={{ my: 2 }} />

        {/* PERSONAL */}

        <Typography variant="h6" sx={{ fontWeight: 700 }} mb={1.5}>
          {t("summary.sections.personal")}
        </Typography>

        <Row
          label={t("summary.fields.name")}
          value={`${v.personalInfo.firstName} ${v.personalInfo.lastName}`}
        />

        <Row label={t("summary.fields.email")} value={v.personalInfo.email} />

        <Row label={t("summary.fields.birthDate")} value={v.personalInfo.birthDate} />

        <Row
          label={t("summary.fields.gender")}
          value={enumT(`gender.${v.personalInfo.gender}`)}
        />

        <Row
          label={t("summary.fields.maritalStatus")}
          value={enumT(`maritalStatus.${v.personalInfo.maritalStatus}`)}
        />

        <Divider sx={{ my: 2 }} />

        {/* ADDRESSES */}

        <Typography variant="h6" sx={{ fontWeight: 700 }} mb={1.5}>
          {t("summary.sections.addresses")}
        </Typography>

        {(v.addresses ?? []).map((addr, i) => (
          <Box key={i} mb={2}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {t("summary.fields.address")} {i + 1}
            </Typography>

            {formatAddressLines(addr).map((line, idx) => (
              <Typography key={idx} variant="body2" color="text.secondary">
                {line}
              </Typography>
            ))}
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* PHONE NUMBERS */}

        <Typography variant="h6" sx={{ fontWeight: 700 }} mb={1.5}>
          {t("summary.sections.phoneNumbers")}
        </Typography>

        {(v.phoneNumbers ?? []).length === 0 && (
          <Typography variant="body2" color="text.secondary">
            —
          </Typography>
        )}

        {(v.phoneNumbers ?? []).map((p, i) => (
          <Box key={i} mb={1}>
            <Typography variant="body2">
              {p.countryCode} {p.number}
              {p.label ? ` (${p.label})` : ""}
              {p.isPrimary && ` • ${t("summary.primary")}`}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* SECURITY QUESTIONS */}

        <Typography variant="h6" sx={{ fontWeight: 700 }} mb={1.5}>
          {t("summary.sections.securityQuestions")}
        </Typography>

        {(v.securityQuestions ?? []).map((q, i) => (
          <Box key={i} mb={1}>
            <Typography variant="body2">
              {enumT(`securityQuestion.${q.questionKey}`)}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* PREFERENCES */}

        <Typography variant="h6" sx={{ fontWeight: 700 }} mb={1.5}>
          {t("summary.sections.preferences")}
        </Typography>

        {/* INTERESTS */}

        <Box mb={1}>
          <Typography variant="body2" color="text.secondary">
            {t("summary.fields.interests")}
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={1} mt={0.5}>
            {(v.customer?.interestIds ?? []).map((id) => (
              <Chip key={id} label={interestMap.get(id) ?? id} size="small" />
            ))}
          </Box>
        </Box>

        {/* CONTACT OPTIONS */}

        <Box mb={1}>
          <Typography variant="body2" color="text.secondary">
            {t("summary.fields.contactOptions")}
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={1} mt={0.5}>
            {(v.customer?.contactOptions ?? []).map((c) => (
              <Chip key={c} label={enumT(`contactOptions.${c}`)} size="small" />
            ))}
          </Box>
        </Box>

        <Row
          label={t("summary.fields.newsletter")}
          value={
            v.customer?.subscribed
              ? t("summary.values.subscribed")
              : t("summary.values.notSubscribed")
          }
        />

        <Divider sx={{ my: 2 }} />

        <Row
          label={t("summary.fields.terms")}
          value={
            v.acceptedTerms ? t("summary.values.accepted") : t("summary.values.notAccepted")
          }
        />
      </Box>
    </>
  );
}
