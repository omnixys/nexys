"use client";

import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import type { SignUpFormValues } from "../SignUpWizard";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { PhoneNumberType } from "../../../../types/user/user-enum-type";

const COUNTRY_CODES = [
  { code: "+49", label: "Germany (+49)" },
  { code: "+43", label: "Austria (+43)" },
  { code: "+41", label: "Switzerland (+41)" },
  { code: "+1", label: "USA (+1)" },
  { code: "+44", label: "UK (+44)" },
];

export default function PhoneNumbersStep() {
  const { control } = useFormContext<SignUpFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700 }} mb={2}>
        Telefonnummern
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={4}>
        Optional, aber empfohlen für Sicherheit & Verifizierung.
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
            <Stack direction={"row"} spacing={3}>
              <Controller
                name={`phoneNumbers.${idx}.type`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} select fullWidth label="Typ">
                    {Object.values(PhoneNumberType).map((t) => (
                      <MenuItem key={t} value={t}>
                        {t}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <Controller
                name={`phoneNumbers.${idx}.label`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Bezeichnung (optional)"
                  />
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
                    label="Primäre Nummer"
                  />
                )}
              />
            </Stack>

            <Stack direction={"row"} spacing={3}>
              <Controller
                name={`phoneNumbers.${idx}.countryCode`}
                control={control}
                defaultValue="+49"
                render={({ field }) => (
                  <TextField {...field} select fullWidth label="Vorwahl">
                    {COUNTRY_CODES.map((c) => (
                      <MenuItem key={c.code} value={c.code}>
                        {c.label}
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
                    label="Nummer"
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

      {/* ================= ADD BUTTON ================= */}
      <Box>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddRoundedIcon />}
          onClick={() =>
            append({
              type: PhoneNumberType.MOBILE,
              number: "",
              label: "",
              countryCode: "+49",
              isPrimary: fields.length === 0,
            })
          }
          sx={{
            py: 1.5,
            borderStyle: "dashed",
          }}
        >
          Weitere Nummer hinzufügen
        </Button>
      </Box>
    </>
  );
}
