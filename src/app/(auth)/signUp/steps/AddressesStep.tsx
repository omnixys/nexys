"use client";

import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import type { SignUpFormValues } from "../SignUpWizard";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { WidthFull } from '@mui/icons-material';

const COUNTRIES = [
  { code: "DE", label: "Germany" },
  { code: "AT", label: "Austria" },
  { code: "CH", label: "Switzerland" },
  { code: "US", label: "United States" },
];

const STATES: Record<string, string[]> = {
  DE: [
    "Baden-Württemberg",
    "Bayern",
    "Berlin",
    "Brandenburg",
    "Hamburg",
    "Hessen",
    "Nordrhein-Westfalen",
  ],
  AT: ["Wien", "Salzburg", "Tirol", "Steiermark"],
  CH: ["Zürich", "Bern", "Genf", "Basel"],
  US: ["California", "Texas", "New York", "Florida"],
};

export default function AddressesStep() {
  const { control, watch } = useFormContext<SignUpFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Address
        </Typography>

        <Button
          variant="outlined"
          startIcon={<AddRoundedIcon />}
          onClick={() =>
            append({
              street: "",
              houseNumber: "",
              zipCode: "",
              city: "",
              state: "",
              country: "DE",
              additionalInfo: "",
            })
          }
        >
          Add address
        </Button>
      </Box>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Used for identity checks and contracts.
      </Typography>

      {fields.map((f, idx) => {
        const selectedCountry = watch(`addresses.${idx}.country`);
        const availableStates = STATES[selectedCountry] || [];

        return (
          <Box
            key={f.id}
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              mb: 3,
              position: "relative",
            }}
          >
            {fields.length > 1 && (
              <IconButton
                onClick={() => remove(idx)}
                size="small"
                sx={{ position: "absolute", top: 10, right: 10 }}
              >
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            )}

            <Stack spacing={3}>
              <Stack direction={"row"} spacing={3}>
                <Controller
                  name={`addresses.${idx}.street`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Street" />
                  )}
                />

                <Controller
                  name={`addresses.${idx}.houseNumber`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="House Number"  />
                  )}
                />
              </Stack>

              <Stack direction={"row"} spacing={3}>
                <Controller
                  name={`addresses.${idx}.zipCode`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="ZIP" />
                  )}
                />

                <Controller
                  name={`addresses.${idx}.city`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="City" />
                  )}
                />
              </Stack>

              {/* Country */}
              <Stack direction={"row"} spacing={3}>
                <Controller
                  name={`addresses.${idx}.country`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select fullWidth label="Country">
                      {COUNTRIES.map((c) => (
                        <MenuItem key={c.code} value={c.code}>
                          {c.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <Controller
                  name={`addresses.${idx}.state`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label="State"
                      disabled={availableStates.length === 0}
                    >
                      {availableStates.length === 0 ? (
                        <MenuItem value="">Not applicable</MenuItem>
                      ) : (
                        availableStates.map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))
                      )}
                    </TextField>
                  )}
                />
              </Stack>


                <Controller
                  name={`addresses.${idx}.additionalInfo`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Additional info (optional)"
                    />
                  )}
                />
  
            </Stack>
          </Box>
        );
      })}
    </>
  );
}
