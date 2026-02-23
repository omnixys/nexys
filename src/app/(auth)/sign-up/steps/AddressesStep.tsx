"use client";

import { Box, Button, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { SignUpFormValues } from "../SignUpWizard";
import AddressCard from "../../../../components/country/AddressCard";
import { useCountries } from "../../../../hooks/useCountries";

type Props = {
  defaultCountry?: string;
};

export default function AddressesStep({ defaultCountry }: Props) {
  const { control } = useFormContext<SignUpFormValues>();

  const { data, loading, error } = useCountries();
  const countries = data?.getAllCountries ?? [];

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

  if (loading) {
    return <Typography>Loading countries...</Typography>;
  }

  if (error) {
    return <Typography color="error">Failed to load countries.</Typography>;
  }

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
