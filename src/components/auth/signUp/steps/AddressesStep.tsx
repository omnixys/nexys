"use client";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box, Button, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { SignUpFormValues } from "@/schemas/sign-up.schema";
import { Country } from "@/types/address/address.type";
import AddressCard from "../address/AddressCard";

type Props = {
  countries: Country[];
  defaultCountry?: string;
};

export default function AddressesStep({ countries, defaultCountry }: Props) {
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
      addressType: "",
      additionalInfo: "",

      formatted: "",
      lat: null,
      lon: null,
    });
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Address
        </Typography>

        <Button
          variant="outlined"
          startIcon={<AddRoundedIcon />}
          onClick={handleAddAddress}
        >
          Add address
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
