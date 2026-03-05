"use client";

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { useAddressAutocomplete } from "@/hooks/useAddressAutocomplete";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

type Suggestion = {
  formatted: string;
  street?: string;
  houseNumber?: string;
  confidence?: number;
  lat?: number;
  lon?: number;
};

type Props = {
  idx: number;
};

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

export default function StreetAutocomplete({ idx }: Props) {
  const { setValue, control } = useFormContext();

  const t = useTypedTranslations("signup.address.street");

  const street = useWatch({
    control,
    name: `addresses.${idx}.street`,
  }) as string;

  const houseNumber = useWatch({
    control,
    name: `addresses.${idx}.houseNumber`,
  }) as string;

  const isFinal = !!street && !!houseNumber;

  const [inputValue, setInputValue] = useState("");
  const debounced = useDebouncedValue(inputValue, 400);

  const [load, { data, loading }] = useAddressAutocomplete();

  const options: Suggestion[] = useMemo(
    () => data?.addressAutocomplete ?? [],
    [data],
  );

  useEffect(() => {
    if (!debounced || debounced.length < 3) return;

    load({
      variables: { text: debounced },
    });
  }, [debounced, load]);

  /**
   * FINAL MODE
   * Street + HouseNumber locked
   */
  if (isFinal) {
    return (
      <Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            value={street}
            label={t("fields.street")}
            fullWidth
            disabled
          />

          <TextField
            value={houseNumber}
            label={t("fields.houseNumber")}
            sx={{ width: 140 }}
            disabled
          />
        </Stack>

        <Box mt={1}>
          <Button
            size="small"
            onClick={() => {
              setValue(`addresses.${idx}.street`, "");
              setValue(`addresses.${idx}.houseNumber`, "");
              setValue(`addresses.${idx}.formatted`, "");
              setValue(`addresses.${idx}.lat`, null);
              setValue(`addresses.${idx}.lon`, null);
              setInputValue("");
            }}
          >
            {t("change")}
          </Button>
        </Box>
      </Box>
    );
  }

  /**
   * AUTOCOMPLETE MODE
   */
  return (
    <Autocomplete
      options={options}
      loading={loading}
      inputValue={inputValue}
      onInputChange={(_, value) => {
        setInputValue(value);
      }}
      getOptionLabel={(o) => o.formatted ?? ""}
      filterOptions={(x) => x}
      onChange={(_, selected) => {
        if (!selected) return;

        if (selected.street) {
          setValue(`addresses.${idx}.street`, selected.street);
        }

        if (selected.houseNumber) {
          setValue(`addresses.${idx}.houseNumber`, selected.houseNumber);
        }

        setValue(`addresses.${idx}.formatted`, selected.formatted ?? "");
        setValue(`addresses.${idx}.lat`, selected.lat ?? null);
        setValue(`addresses.${idx}.lon`, selected.lon ?? null);
      }}
      renderOption={(props, option) => (
        <li {...props}>
          <Stack>
            <Typography variant="body2">{option.formatted}</Typography>

            {option.confidence != null && (
              <Typography variant="caption" color="text.secondary">
                {t("confidence")} {Math.round(option.confidence * 100)}%
              </Typography>
            )}
          </Stack>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t("fields.streetHouse")}
          placeholder={t("placeholder")}
          helperText={t("helper")}
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
}
