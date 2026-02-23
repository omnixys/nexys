"use client";

import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import type { SignUpFormValues } from "../SignUpWizard";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { RelationshipType } from "../../../../types/user/user-enum-type";

export default function ContactsStep() {
  const { control } = useFormContext<SignUpFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Trusted Contacts (optional)
        </Typography>

        <Button
          variant="outlined"
          startIcon={<AddRoundedIcon />}
          onClick={() =>
            append({
              contactId: "",
              relationship: RelationshipType.OTHER,
              withdrawalLimit: null,
              emergency: false,
              startDate: null,
              endDate: null,
            })
          }
        >
          Add contact
        </Button>
      </Box>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Add trusted contacts for emergency handling or authorization policies.
      </Typography>

      {fields.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No contacts added.
        </Typography>
      ) : (
        fields.map((f, idx) => (
          <Box
            key={f.id}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              mb: 2,
              position: "relative",
            }}
          >
            <IconButton
              onClick={() => remove(idx)}
              size="small"
              sx={{ position: "absolute", top: 10, right: 10 }}
              aria-label="remove contact"
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  name={`contacts.${idx}.contactId`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Contact User ID"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error?.message ??
                        "Existing userId / personId"
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name={`contacts.${idx}.relationship`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select fullWidth label="Relationship">
                      {Object.values(RelationshipType).map((r) => (
                        <MenuItem key={r} value={r}>
                          {r}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name={`contacts.${idx}.withdrawalLimit`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      fullWidth
                      label="Withdrawal limit (optional)"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : null,
                        )
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name={`contacts.${idx}.emergency`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label="Emergency"
                      value={String(!!field.value)}
                      onChange={(e) =>
                        field.onChange(e.target.value === "true")
                      }
                    >
                      <MenuItem value="false">No</MenuItem>
                      <MenuItem value="true">Yes</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        ))
      )}
    </>
  );
}
