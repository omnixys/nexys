"use client";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box, Button, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { AddressType } from "@/generated/graphql";
import type { Country } from "@/graphql/graphql.type";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import type { SignUpFormValues } from "@/schemas/sign-up.schema";
import AddressCard from "../address/AddressCard";

type Props = {
  countries: Country[];
  defaultCountry?: string;
};

export default function AddressesStep({ countries, defaultCountry }: Props) {
  const t = useTypedTranslations("signup");

  const { control } = useFormContext<SignUpFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const handleAddAddress = () => {
    append({
      countryId: "",
      country: defaultCountry ?? "",
      stateId: "",
      state: "",
      cityId: "",
      city: "",
      postalCodeRequired: true,
      postalCodeId: "",
      postalCode: "",
      street: "",
      houseNumber: "",
      addressType: AddressType.Home,
      additionalInfo: "",
      formatted: "",
      lat: null,
      lon: null,
    });
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {t("address.title")}
        </Typography>

        <Button variant="outlined" startIcon={<AddRoundedIcon />} onClick={handleAddAddress}>
          {t("address.add")}
        </Button>
      </Box>

      {fields.map((field, idx) => (
        <Box key={field.id} mb={3}>
          <AddressCard
            idx={idx}
            countries={countries}
            canRemove={fields.length > 1}
            onRemove={remove}
          />
        </Box>
      ))}
    </>
  );
}
