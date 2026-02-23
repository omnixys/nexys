"use client";

import { Autocomplete, TextField, Stack, Box, Typography } from "@mui/material";

type Country = {
    id: string;
    name: string;
    flagSvg?: string;
    flagPng?: string;
};

type Props = {
    countries: Country[];
    value: string | null;
    onChange: (value: string | null) => void;
};

export default function CountryAutocomplete({
                                                countries,
                                                value,
                                                onChange,
                                            }: Props) {
    const selected = countries.find((c) => c.id === value) ?? null;

    return (
        <Autocomplete
            options={countries}
            value={selected}
            getOptionLabel={(o) => o.name}
            isOptionEqualToValue={(a, b) => a.id === b.id}
            onChange={(_, v) => onChange(v?.id ?? null)}
            renderOption={(props, option) => (
                <li {...props}>
                    <Stack direction="row" spacing={2}>
                        <Box
                            component="img"
                            src={option.flagSvg || option.flagPng}
                            sx={{ width: 22, height: 16 }}
                        />
                        <Typography>{option.name}</Typography>
                    </Stack>
                </li>
            )}
            renderInput={(params) => <TextField {...params} label="Country" />}
        />
    );
}