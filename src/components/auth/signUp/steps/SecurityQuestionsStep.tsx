"use client";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { useQuery } from "@apollo/client/react";

import { SignUpFormValues } from "@/schemas/sign-up.schema";

import {
  GetSecurityQuestionsDocument,
  GetSecurityQuestionsQuery,
} from "@/generated/graphql";

export default function SecurityQuestionsStep() {
  const { control, watch } = useFormContext<SignUpFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "securityQuestions",
  });

  const { data, loading } = useQuery<GetSecurityQuestionsQuery>(
    GetSecurityQuestionsDocument,
    {
      fetchPolicy: "cache-first",
      context: {
        fetchOptions: {
          credentials: "include",
        },
      },
    },
  );

  const questions = data?.getSecurityQuestions ?? [];

  const selectedQuestions = watch("securityQuestions")?.map((q) => q.question);

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
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          )}

          <Stack spacing={3}>
            {/* Question */}
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

                  {questions
                    .filter(
                      (q) =>
                        !selectedQuestions?.includes(q.id) ||
                        field.value === q.id,
                    )
                    .map((q) => (
                      <MenuItem key={q.id} value={q.id}>
                        {q.question}
                      </MenuItem>
                    ))}
                </TextField>
              )}
            />

            {/* Answer */}
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

      <Button
        fullWidth
        variant="outlined"
        startIcon={<AddRoundedIcon />}
        onClick={() => append({ question: "", answer: "" })}
        disabled={loading || fields.length >= questions.length}
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
