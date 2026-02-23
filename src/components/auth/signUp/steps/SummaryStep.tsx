"use client";

import { Box, Chip, Divider, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { SignUpFormValues } from "@/schemas/sign-up.schema";
import { formatAddressLines } from "../../../../utils/formatAddress";

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

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700 }} mb={2}>
        Summary
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Please review your information before creating your account.
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
          Account
        </Typography>
        <Row label="Username" value={v.username} />

        <Divider sx={{ my: 2 }} />

        {/* PERSONAL */}
        <Typography variant="h6" sx={{ fontWeight: 700 }} mb={1.5}>
          Personal Information
        </Typography>

        <Row
          label="Name"
          value={`${v.personalInfo.firstName} ${v.personalInfo.lastName}`}
        />
        <Row label="Email" value={v.personalInfo.email} />
        <Row label="Birth Date" value={v.personalInfo.birthDate} />
        <Row label="Gender" value={v.personalInfo.gender} />
        <Row label="Marital Status" value={v.personalInfo.maritalStatus} />

        <Divider sx={{ my: 2 }} />

        {/* ADDRESSES */}
        <Typography variant="h6" sx={{ fontWeight: 700 }} mb={1.5}>
          Addresses
        </Typography>

        {(v.addresses ?? []).map((addr, i) => (
          <Box key={i} mb={2}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Address {i + 1}
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
          Phone Numbers
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
              {p.isPrimary && " • Primary"}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* SECURITY QUESTIONS */}
        <Typography variant="h6" sx={{ fontWeight: 700 }} mb={1.5}>
          Security Questions
        </Typography>

        {(v.securityQuestions ?? []).map((q, i) => (
          <Box key={i} mb={1}>
            <Typography variant="body2">{q.question}</Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* PREFERENCES */}
        <Typography variant="h6" sx={{ fontWeight: 700 }} mb={1.5}>
          Preferences
        </Typography>

        <Box mb={1}>
          <Typography variant="body2" color="text.secondary">
            Interests
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} mt={0.5}>
            {(v.customer?.interests ?? []).map((i) => (
              <Chip key={i} label={i} size="small" />
            ))}
          </Box>
        </Box>

        <Box mb={1}>
          <Typography variant="body2" color="text.secondary">
            Contact Options
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} mt={0.5}>
            {(v.customer?.contactOptions ?? []).map((c) => (
              <Chip key={c} label={c} size="small" />
            ))}
          </Box>
        </Box>

        <Row
          label="Newsletter"
          value={v.customer?.subscribed ? "Subscribed" : "Not subscribed"}
        />

        <Divider sx={{ my: 2 }} />

        <Row label="Terms accepted" value={v.termsAccepted ? "Yes" : "No"} />
      </Box>
    </>
  );
}
