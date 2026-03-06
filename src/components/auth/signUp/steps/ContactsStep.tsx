"use client";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

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

import { SignUpFormValues } from "@/schemas/sign-up.schema";
import { RelationshipType } from "@/generated/graphql";

import { useTypedTranslations } from "@/i18n/useTypedTranslations";

export default function ContactsStep() {
  const { control } = useFormContext<SignUpFormValues>();

  const t = useTypedTranslations("signup");
  const enumT = useTypedTranslations("enums");

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
          {t("contacts.title")}
        </Typography>

        <Button
          variant="outlined"
          startIcon={<AddRoundedIcon />}
          onClick={() =>
            append({
              contactId: "",
              relationship: RelationshipType.Other,
              withdrawalLimit: 0,
              emergency: false,
              startDate: "",
              endDate: "",
            })
          }
        >
          {t("contacts.add")}
        </Button>
      </Box>

      <Typography variant="body2" color="text.secondary" mb={3}>
        {t("contacts.description")}
      </Typography>

      {fields.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {t("contacts.empty")}
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
              {/* CONTACT ID */}

              <Grid sx={{ xs: 12, md: 6 }}>
                <Controller
                  name={`contacts.${idx}.contactId`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={t("contacts.fields.contactId")}
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error?.message ??
                        t("contacts.helpers.contactId")
                      }
                    />
                  )}
                />
              </Grid>

              {/* RELATIONSHIP */}
              <Grid sx={{ xs: 12, md: 6 }}>
                <Controller
                  name={`contacts.${idx}.relationship`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label={t("contacts.fields.relationship")}
                    >
                      {Object.values(RelationshipType).map((r) => (
                        <MenuItem key={r} value={r}>
                          {enumT(`relationshipType.${r}`)}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              {/* WITHDRAWAL LIMIT */}
              <Grid sx={{ xs: 12, md: 6 }}>
                <Controller
                  name={`contacts.${idx}.withdrawalLimit`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      fullWidth
                      label={t("contacts.fields.withdrawalLimit")}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : null,
                        )
                      }
                    />
                  )}
                />
              </Grid>

              {/* EMERGENCY */}

              <Grid sx={{ xs: 12, md: 6 }}>
                <Controller
                  name={`contacts.${idx}.emergency`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      fullWidth
                      label={t("contacts.fields.emergency")}
                      value={String(!!field.value)}
                      onChange={(e) =>
                        field.onChange(e.target.value === "true")
                      }
                    >
                      <MenuItem value="false">{t("contacts.no")}</MenuItem>

                      <MenuItem value="true">{t("contacts.yes")}</MenuItem>
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
