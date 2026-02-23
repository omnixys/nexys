"use client";

import {
  Autocomplete,
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useMemo } from "react";
import { GroupHeader, GroupItems } from "./styles/GroupStyles";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

export type UniversalOption = {
  id: string;
  label: string;
  secondLabel?: string;
  flagSrc?: string;
  category?: string;
};

type FilterMode = "contains" | "startsWith";

type Props = {
  label: string;
  options: UniversalOption[];

  valueId?: string | null;
  onChange: (option: UniversalOption | null) => void;

  valueText?: string;
  onInputTextChange?: (text: string) => void;

  loading?: boolean;
  disabled?: boolean;

  withFlag?: boolean;
  withSecondLabel?: boolean;
  withCategory?: boolean;

  filterMode?: FilterMode;
  includeInputInList?: boolean;
  disableClearable?: boolean;
  freeSolo?: boolean;
  multiple?: boolean;

  placeholder?: string;
  helperText?: string;

  sort?: boolean;
};

export default function UniversalAutocomplete({
  label,
  options,

  valueId,
  onChange,

  valueText,
  onInputTextChange,
  loading = false,
  disabled = false,
  withFlag = false,
  withSecondLabel = false,
  withCategory = false,
  filterMode = "contains",
  includeInputInList = false,
  disableClearable = false,
  freeSolo = false,
  multiple = false,
  placeholder,
  helperText,
  sort = false,
}: Props) {
  const processedOptions = useMemo(() => {
    if (!sort) return options;

    const copy = [...options];

    copy.sort((a, b) => {
      // Wenn grouping aktiv ist → erst nach category sortieren
      if (withCategory) {
        const catCompare = (a.category ?? "").localeCompare(
          b.category ?? "",
          "de",
        );

        if (catCompare !== 0) return catCompare;
      }

      // Danach alphabetisch nach label
      return a.label.localeCompare(b.label, "de");
    });

    return copy;
  }, [options, sort, withCategory]);

  // IMPORTANT:
  // - For freeSolo we control via inputValue/valueText (string)
  // - For non-freeSolo we control via selected option (object)
  const selected = useMemo(() => {
    if (multiple) return undefined;

    if (freeSolo) {
      // Autocomplete `value` can be a string in freeSolo mode
      return valueText ?? "";
    }

    return processedOptions.find((o) => o.id === valueId) ?? null;
  }, [multiple, freeSolo, valueText, processedOptions, valueId]);


  const customFilter = (
    opts: UniversalOption[],
    state: { inputValue: string },
  ) => {
    const input = state.inputValue.toLowerCase();

    return opts.filter((o) => {
      const target = `${o.label} ${o.secondLabel ?? ""}`.toLowerCase();

      if (filterMode === "startsWith") {
        return target.startsWith(input);
      }

      return target.includes(input);
    });
  };

  const getLabel = (option: UniversalOption | string) => {
    return typeof option === "string" ? option : option.label;

    // switch (displayFormat) {
    //   case "userId":
    //     return option.userId; // Nur Benutzer-ID anzeigen
    //   case "nameOnly":
    //     return `${option.profile?.lastName} ${option.profile?.firstName}`; // Nur Vor- und Nachname anzeigen
    //   case "full":
    //   default:
    //     return `${option.profile?.lastName} ${option.profile?.firstName} (${option.userId})`; // Vollständige Anzeige
    // }
  };

  return (
    <Autocomplete
      options={processedOptions}
      value={selected as any}
      inputValue={freeSolo ? (valueText ?? "") : undefined}
      onInputChange={(_, newValue, reason) => {
        if (!freeSolo) return;

        // When user clicks clear icon, MUI will fire onInputChange with reason === "clear"
        onInputTextChange?.(newValue);

        if (reason === "clear") {
          // guarantee downstream logic: treat as "no addressType"
          onChange(null);
        }
      }}
      loading={loading}
      disabled={disabled}
      freeSolo={freeSolo}
      multiple={multiple}
      includeInputInList={includeInputInList}
      disableClearable={disableClearable}
      filterOptions={customFilter}
      getOptionLabel={getLabel}
      groupBy={withCategory ? (option) => option.category ?? "" : undefined}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      isOptionEqualToValue={(a, b) => {
        // NOTE: in freeSolo `value` can be string; in that case this comparator is not used.
        if (!a || !b) return false;
        if (typeof b === "string") return false;
        return a.id === b.id;
      }}
      onChange={(_, value, reason) => {
        // TIP: this is the most reliable debugging point
        console.log("UA onChange:", { value, reason, type: typeof value });

        if (Array.isArray(value)) return;

        if (!value) {
          onChange(null);
          return;
        }

        if (typeof value === "string") {
          // user typed and pressed Enter / blur with autoSelect etc.
          onChange({ id: value, label: value });
          return;
        }

        onChange(value);
      }}
      renderOption={(props, option, state) => {
        const inputValue = state.inputValue ?? "";
        const label = option.label;

        const matches = match(label, inputValue, {
          insideWords: true,
        });

        const parts = parse(label, matches);

        return (
          <li {...props}>
            <Stack direction="row" spacing={2} alignItems="center">
              {withFlag && option.flagSrc && (
                <Box
                  component="img"
                  src={option.flagSrc}
                  sx={{
                    width: 22,
                    height: 16,
                    borderRadius: "2px",
                  }}
                />
              )}

              <Box>
                <Typography variant="body2">
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </Typography>

                {withSecondLabel && option.secondLabel && (
                  <Typography variant="caption" color="text.secondary">
                    {option.secondLabel}
                  </Typography>
                )}
              </Box>
            </Stack>
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          helperText={helperText}
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
}
