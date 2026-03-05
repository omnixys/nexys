"use client";

import {
  Box,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  InputBase,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { Controller, useFormContext } from "react-hook-form";
import { useQuery } from "@apollo/client/react";
import { useMemo, useState } from "react";

import {
  GetAllInterestCategoriesDocument,
  GetAllInterestCategoriesQuery,
  ContactOptionsType,
  GetAllInterestCategoriesQueryVariables,
} from "@/generated/graphql";

import { SignUpFormValues } from "@/schemas/sign-up.schema";
import { InterestCategory } from "@/graphql/graphql.type";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

const MotionChip = motion(Chip);
const MotionBox = motion(Box);

// ----------------------------------
// Contact Labels
// ----------------------------------

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
  const [search, setSearch] = useState("");

  const { data } = useQuery<
    GetAllInterestCategoriesQuery,
    GetAllInterestCategoriesQueryVariables
  >(GetAllInterestCategoriesDocument, {
    fetchPolicy: "cache-first",
    context: {
      fetchOptions: {
        credentials: "include",
      },
    },
  });

  const categories: InterestCategory[] = data?.getAllInterestCategories ?? [];

  // ----------------------------------
  // Filtered Categories
  // ----------------------------------

const filteredCategories = useMemo(() => {
  const normalized = categories.map((cat) => ({
    ...cat,
    interests: (cat.interests ?? []).filter(Boolean),
  }));

  if (!search.trim()) return normalized;

  const lower = search.toLowerCase();

  return normalized
    .map((cat) => {
      const interests = cat.interests.filter((i) =>
        i.key.toLowerCase().includes(lower),
      );

      if (!interests.length) return null;

      return { ...cat, interests };
    })
    .filter(Boolean);
}, [categories, search]);

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700 }} mb={2}>
        Interessen & Kontakt
      </Typography>

      {/* ========================= */}
      {/* Search */}
      {/* ========================= */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1,
          mb: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.04)",
        }}
      >
        <SearchIcon sx={{ mr: 1, opacity: 0.6 }} />
        <InputBase
          placeholder="Interessen durchsuchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
      </Box>

      {/* ========================= */}
      {/* Interests Grouped */}
      {/* ========================= */}

      <Controller
        name="customer.interestIds"
        control={control}
        render={({ field }) => {
          const selected: string[] = field.value ?? [];

          const toggle = (key: string) => {
            const exists = selected.includes(key);
            field.onChange(
              exists ? selected.filter((v) => v !== key) : [...selected, key],
            );
          };

          return (
            <>
              {filteredCategories.map((category) => (
                <MotionBox
                  key={category?.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  mb={4}
                >
                  {/* Category Header */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.2,
                      mb: 1.5,
                    }}
                  >
                    {category?.icon && (
                      <DynamicIcon
                        name={category.icon}
                        size={18}
                        strokeWidth={1.8}
                      />
                    )}

                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {category?.key}
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 2, opacity: 0.2 }} />

                  {/* Interests */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1.2,
                    }}
                  >
                    {category?.interests.map((interest) => {
                      const isSelected = selected.includes(interest.id);

                      return (
                        <MotionChip
                          key={interest.id}
                          whileTap={{ scale: 0.94 }}
                          icon={
                            interest.icon ? (
                              <DynamicIcon
                                name={interest.icon}
                                size={16}
                                strokeWidth={1.8}
                              />
                            ) : undefined
                          }
                          label={interest.key}
                          clickable
                          onClick={() => toggle(interest.id)}
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
                </MotionBox>
              ))}
            </>
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
            field.onChange(
              exists ? selected.filter((v) => v !== val) : [...selected, val],
            );
          };

          return (
            <Box mt={4}>
              <Typography variant="subtitle2" mb={1}>
                Bevorzugte Kontaktwege *
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2 }}>
                {Object.entries(contactLabels).map(([key, label]) => {
                  const typedKey = key as ContactOptionsType;
                  const isSelected = selected.includes(typedKey);

                  return (
                    <MotionChip
                      key={key}
                      whileTap={{ scale: 0.94 }}
                      label={label}
                      clickable
                      onClick={() => toggle(typedKey)}
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
      {/* Newsletter */}
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
