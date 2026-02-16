"use client";

import {
  Box,
  Button,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import type { SignUpFormValues } from "../SignUpWizard";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const SUGGESTED_QUESTIONS = [
  "Wie hieß Ihr erstes Haustier?",
  "In welcher Stadt wurden Sie geboren?",
  "Wie lautet der Mädchenname Ihrer Mutter?",
  "Was war Ihr Lieblingsfach in der Schule?",
  "Wie hieß Ihr bester Freund in der Kindheit?",
];

export default function SecurityQuestionsStep() {
  const { control } = useFormContext<SignUpFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "securityQuestions",
  });

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700 }} mb={2}>
        Sicherheitsfragen
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={4}>
        Diese dienen als letzte Wiederherstellungsoption für Ihr Konto.
      </Typography>

      {fields.map((f, idx) => (
        <Box
          key={f.id}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            mb: 3,
            position: "relative",
          }}
        >
          {fields.length > 1 && (
            <IconButton
              onClick={() => remove(idx)}
              size="small"
              sx={{ position: "absolute", top: 10, right: 10 }}
              aria-label="remove question"
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          )}

          <Stack spacing={3}>
            {/* ===== Question Select ===== */}
            <Controller
              name={`securityQuestions.${idx}.question`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Frage"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message ?? " "}
                >
                  <MenuItem value="">Bitte wählen</MenuItem>

                  {SUGGESTED_QUESTIONS.map((q) => (
                    <MenuItem key={q} value={q}>
                      {q}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* ===== Answer ===== */}
            <Controller
              name={`securityQuestions.${idx}.answer`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Antwort"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message ?? " "}
                />
              )}
            />
          </Stack>
        </Box>
      ))}

      {/* ===== Add Button Below ===== */}
      <Button
        fullWidth
        variant="outlined"
        startIcon={<AddRoundedIcon />}
        onClick={() => append({ question: "", answer: "" })}
        sx={{
          py: 1.5,
          borderStyle: "dashed",
        }}
      >
        Weitere Frage hinzufügen
      </Button>
    </>
  );
}
