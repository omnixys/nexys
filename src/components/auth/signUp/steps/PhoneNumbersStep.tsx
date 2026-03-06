"use client";

/**
 * @file PhoneNumbersStep.tsx
 * @description Phone numbers step
 */

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import Image from "next/image";

import { Country } from "@/graphql/graphql.type";
import { SignUpFormValues } from "@/schemas/sign-up.schema";
import { PhoneNumberType } from "@/generated/graphql";

import { useTypedTranslations } from "@/i18n/useTypedTranslations";

type Props = {
  countries: Country[];
  defaultCountry?: string;
};

export default function PhoneNumbersStep({
  countries,
  defaultCountry = "+49",
}: Props) {
  const t = useTypedTranslations("signup");
  const enumT = useTypedTranslations("enums");

  const { control } = useFormContext<SignUpFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700 }} mb={2}>
        {t("phoneNumbers.title")}
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={4}>
        {t("phoneNumbers.description")}
      </Typography>

      {fields.map((f, idx) => (
        <Box
          key={f.id}
          sx={{
            p: 3,
            borderRadius: 1,
            border: "1px solid",
            borderColor: "divider",
            mb: 3,
            position: "relative",
          }}
        >
          <IconButton
            onClick={() => remove(idx)}
            size="small"
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>

          <Stack spacing={3}>
            {/* =========================
                TYPE / LABEL / PRIMARY
            ========================= */}
            <Stack direction="row" spacing={3}>
              <Controller
                name={`phoneNumbers.${idx}.type`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label={t("phoneNumbers.fields.type")}
                  >
                    {Object.values(PhoneNumberType).map((type) => (
                      <MenuItem key={type} value={type}>
                        {enumT(`phoneNumberType.${type}`)}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <Controller
                name={`phoneNumbers.${idx}.label`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label={t("phoneNumbers.fields.label")} />
                )}
              />

              <Controller
                name={`phoneNumbers.${idx}.isPrimary`}
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label={t("phoneNumbers.fields.primary")}
                  />
                )}
              />
            </Stack>

            {/* =========================
                COUNTRY + NUMBER
            ========================= */}
            <Stack direction="row" spacing={3}>
              <Controller
                name={`phoneNumbers.${idx}.countryCode`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label={t("phoneNumbers.fields.countryCode")}
                  >
                    {countries.map((c) => (
                      <MenuItem key={c.iso2} value={c?.callingCode?.code}>
                        <Stack direction="row" spacing={2}>
                          {c.flagSvg && (
                            <Image
                              src={c.flagSvg}
                              width={24}
                              height={24}
                              alt={`Flag of ${c.name}`}
                            />
                          )}

                          <Typography>
                            {c.name} ({c?.callingCode?.code})
                          </Typography>
                        </Stack>
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <Controller
                name={`phoneNumbers.${idx}.number`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("phoneNumbers.fields.number")}
                    placeholder="17612345678"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                  />
                )}
              />
            </Stack>
          </Stack>
        </Box>
      ))}

      {/* =========================
          ADD PHONE NUMBER
      ========================= */}
      <Box>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddRoundedIcon />}
          onClick={() =>
            append({
              type: PhoneNumberType.Mobile,
              number: "",
              label: "",
              countryCode: defaultCountry,
              isPrimary: fields.length === 0,
            })
          }
          sx={{
            py: 1.5,
            borderStyle: "dashed",
          }}
        >
          {t("phoneNumbers.add")}
        </Button>
      </Box>
    </>
  );
}
