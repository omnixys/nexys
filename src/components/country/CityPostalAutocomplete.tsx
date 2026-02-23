"use client";

import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client/react";

import {
  GET_CITIES_BY_POSTAL,
  GET_CITIES_BY_STATE,
} from "@/graphql/address/city.queries";
import {
  GET_POSTAL_BY_CITY,
  GET_POSTAL_BY_STATE,
} from "@/graphql/address/postal.queries";

type Props = {
  idx: number;
};

type City = {
  id: string;
  name: string;
};

type Postal = {
  id: string;
  zip: string;
};

export default function CityPostalAutocomplete({ idx }: Props) {
  const { control, setValue } = useFormContext();

  const stateId = useWatch({
    control,
    name: `addresses.${idx}.stateId`,
  }) as string;

  const cityId = useWatch({
    control,
    name: `addresses.${idx}.cityId`,
  }) as string;

  const postalCodeId = useWatch({
    control,
    name: `addresses.${idx}.postalCodeId`,
  }) as string;

  // -----------------------------
  // Base Queries
  // -----------------------------

  const { data: citiesStateData, loading: citiesStateLoading } = useQuery(
    GET_CITIES_BY_STATE,
    {
      variables: { stateId },
      skip: !stateId,
    },
  );

  const { data: postalStateData, loading: postalStateLoading } = useQuery(
    GET_POSTAL_BY_STATE,
    {
      variables: { stateId },
      skip: !stateId,
    },
  );

  // -----------------------------
  // Dependent Queries
  // -----------------------------

  const { data: citiesPostalData } = useQuery(GET_CITIES_BY_POSTAL, {
    variables: { postalCodeId },
    skip: !postalCodeId,
  });

  const { data: postalCityData } = useQuery(GET_POSTAL_BY_CITY, {
    variables: { cityId },
    skip: !cityId,
  });

  // -----------------------------
  // Option Logic
  // -----------------------------

  const cityOptions: City[] = useMemo(() => {
    if (postalCodeId && citiesPostalData?.getCitiesByPostalCode) {
      return [citiesPostalData.getCitiesByPostalCode];
    }
    return citiesStateData?.getCitiesByState ?? [];
  }, [postalCodeId, citiesPostalData, citiesStateData]);

  const postalOptions: Postal[] = useMemo(() => {
    if (cityId && postalCityData?.getPostalCodesByCity) {
      return postalCityData.getPostalCodesByCity;
    }
    return postalStateData?.getPostalCodesByState ?? [];
  }, [cityId, postalCityData, postalStateData]);

  // -----------------------------
  // Reset when state changes
  // -----------------------------

  useEffect(() => {
    setValue(`addresses.${idx}.cityId`, null);
    setValue(`addresses.${idx}.postalCodeId`, null);
  }, [stateId, idx, setValue]);

  const disabled = !stateId;

  // -----------------------------
  // Render
  // -----------------------------

  return (
    <Box display="flex" gap={3}>
      {/* ZIP */}
      <Box flex={1}>
        <Controller
          name={`addresses.${idx}.postalCodeId`}
          control={control}
          render={({ field }) => {
            const selected =
              postalOptions.find((p) => p.id === field.value) ?? null;

            return (
              <Autocomplete
                freeSolo
                options={postalOptions}
                loading={postalStateLoading}
                value={selected}
                disabled={disabled || !postalOptions.length}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.zip
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, value) => {
                  if (typeof value === "string") {
                    field.onChange(value);
                  } else {
                    field.onChange(value?.id ?? null);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ZIP"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {postalStateLoading && <CircularProgress size={18} />}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            );
          }}
        />
      </Box>

      {/* CITY */}
      <Box flex={1}>
        <Controller
          name={`addresses.${idx}.cityId`}
          control={control}
          render={({ field }) => {
            const selected =
              cityOptions.find((c) => c.id === field.value) ?? null;

            return (
              <Autocomplete
                freeSolo
                options={cityOptions}
                loading={citiesStateLoading}
                value={selected}
                disabled={disabled || !cityOptions.length}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.name
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, value) => {
                  if (typeof value === "string") {
                    field.onChange(value);
                  } else {
                    field.onChange(value?.id ?? null);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {citiesStateLoading && <CircularProgress size={18} />}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            );
          }}
        />
      </Box>
    </Box>
  );
}
