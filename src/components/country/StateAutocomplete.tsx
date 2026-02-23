"use client";

import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useMemo } from "react";
import { useStates } from "@/hooks/useStates";

type Props = {
  idx: number;
  countryId?: string | null;
};

type State = {
  id: string;
  name: string;
};

export default function StateAutocomplete({ idx, countryId }: Props) {
  const { control } = useFormContext();

  const { data, loading } = useStates(countryId, {
    skip: !countryId,
  });

  const states: State[] = useMemo(() => {
    return data?.getStatesByCountry ?? [];
  }, [data]);

  return (
    <Controller
      name={`addresses.${idx}.stateId`}
      control={control}
      render={({ field }) => {
        const selected = states.find((s) => s.id === field.value) ?? null;

        return (
          <Autocomplete
            freeSolo
            options={states}
            loading={loading}
            value={selected}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.name
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_, value) => {
              if (typeof value === "string") {
                // Free input → store raw string
                field.onChange(value);
              } else {
                field.onChange(value?.id ?? null);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="State"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading && <CircularProgress size={18} />}
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
  );
}
