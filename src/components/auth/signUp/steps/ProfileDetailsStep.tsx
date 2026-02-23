"use client";

/**
 * @file ProfileDetailsStep.tsx
 * @description Interests & contact preferences using MUI Chip selector (RHF controlled).
 */

import {
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { Controller, useFormContext } from "react-hook-form";
import { SignUpFormValues } from "@/schemas/sign-up.schema";
import {
  ContactOptionsType,
  InterestType,
} from "../../../../types/user/user-enum-type";

const MotionChip = motion(Chip);

// ----------------------------------
// Labels
// ----------------------------------

const interestLabels: Record<InterestType, string> = {
  SPORTS: "🏅 Sport",
  MUSIC: "🎵 Musik",
  TRAVEL: "✈️ Reisen",
  TECHNOLOGY: "💻 Technologie",
  INVESTMENTS: "📈 Investments",
  SAVING_AND_FINANCE: "💰 Sparen & Finanzen",
  CREDIT_AND_DEBT: "💳 Kredit",
  REAL_ESTATE: "🏠 Immobilien",
  INSURANCE: "🛡️ Versicherung",
  SUSTAINABLE_FINANCE: "🌱 Nachhaltige Finanzen",
  TECHNOLOGY_AND_INNOVATION: "🚀 Tech & Innovation",
  BANK_PRODUCTS_AND_SERVICES: "🏦 Bankprodukte",
};

const contactLabels: Record<ContactOptionsType, string> = {
  EMAIL: "📧 E-Mail",
  PHONE: "📞 Telefon",
  SMS: "💬 SMS",
  WHATSAPP: "📱 WhatsApp",
  LETTER: "✉️ Brief",
};

// ----------------------------------
// Component
// ----------------------------------

export default function ProfileDetailsStep() {
  const { control } = useFormContext<SignUpFormValues>();

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700 }} mb={2}>
        Interessen & Kontakt
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={4}>
        Personalisieren Sie Ihr Erlebnis.
      </Typography>

      {/* ========================= */}
      {/* Interests */}
      {/* ========================= */}
      <Controller
        name="customer.interests"
        control={control}
        render={({ field }) => {
          const selected = field.value ?? [];

          const toggle = (val: InterestType) => {
            const exists = selected.includes(val);
            const next = exists
              ? selected.filter((v: InterestType) => v !== val)
              : [...selected, val];

            field.onChange(next);
          };

          return (
            <Box mb={4}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Interessen *
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2 }}>
                {Object.entries(interestLabels).map(([key, label]) => {
                  const isSelected = selected.includes(key as InterestType);

                  return (
                    <MotionChip
                      key={key}
                      whileTap={{ scale: 0.94 }}
                      label={label}
                      clickable
                      onClick={() => toggle(key as InterestType)}
                      variant={isSelected ? "filled" : "outlined"}
                      color={isSelected ? "primary" : "default"}
                      sx={{
                        borderRadius: "999px",
                        fontWeight: 500,
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          );
        }}
      />

      {/* ========================= */}
      {/* Contact Options */}
      {/* ========================= */}
      <Controller
        name="customer.contactOptions"
        control={control}
        render={({ field }) => {
          const selected = field.value ?? [];

          const toggle = (val: ContactOptionsType) => {
            const exists = selected.includes(val);
            const next = exists
              ? selected.filter((v: ContactOptionsType) => v !== val)
              : [...selected, val];

            field.onChange(next);
          };

          return (
            <Box mb={4}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Bevorzugte Kontaktwege *
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2 }}>
                {Object.entries(contactLabels).map(([key, label]) => {
                  const isSelected = selected.includes(
                    key as ContactOptionsType,
                  );

                  return (
                    <MotionChip
                      key={key}
                      whileTap={{ scale: 0.94 }}
                      label={label}
                      clickable
                      onClick={() => toggle(key as ContactOptionsType)}
                      variant={isSelected ? "filled" : "outlined"}
                      color={isSelected ? "primary" : "default"}
                      sx={{
                        borderRadius: "999px",
                        fontWeight: 500,
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          );
        }}
      />

      {/* ========================= */}
      {/* Newsletter Checkbox */}
      {/* ========================= */}
      <Controller
        name="customer.subscribed"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label="Newsletter abonnieren"
          />
        )}
      />
    </>
  );
}
