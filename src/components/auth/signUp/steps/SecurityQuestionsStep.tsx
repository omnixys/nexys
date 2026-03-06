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

import { useTypedTranslations } from "@/i18n/useTypedTranslations";

export default function SecurityQuestionsStep() {
  const { control, watch, setValue } = useFormContext<SignUpFormValues>();

  const t = useTypedTranslations("signup");
  const enumT = useTypedTranslations("enums");

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

  const selectedQuestions = new Set(
    watch("securityQuestions")?.map((q) => q.questionId) ?? [],
  );

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700 }} mb={2}>
        {t("security.title")}
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={4}>
        {t("security.description")}
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
            {/* QUESTION */}
            <Controller
              name={`securityQuestions.${idx}.questionId`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  value={field.value ?? ""}
                  select
                  fullWidth
                  label={t("security.fields.question")}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message ?? " "}
                  onChange={(e) => {
                    const id = e.target.value;

                    const selected = questions.find((q) => q.id === id);

                    field.onChange(id);

                    setValue(
                      `securityQuestions.${idx}.questionKey`,
                      selected?.key ?? "",
                    );
                  }}
                >
                  <MenuItem value="">{t("security.select")}</MenuItem>

                  {questions
                    .filter(
                      (q) =>
                        !selectedQuestions.has(q.id) || field.value === q.id,
                    )
                    .map((q) => (
                      <MenuItem key={q.id} value={q.id}>
                        {enumT(`securityQuestion.${q.key}`)}
                      </MenuItem>
                    ))}
                </TextField>
              )}
            />

            {/* ANSWER */}
            <Controller
              name={`securityQuestions.${idx}.answer`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t("security.fields.answer")}
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
        onClick={() =>
          append({
            questionId: "",
            questionKey: "",
            answer: "",
          })
        }
        disabled={loading || fields.length >= questions.length}
        sx={{
          py: 1.5,
          borderStyle: "dashed",
        }}
      >
        {t("security.add")}
      </Button>
    </>
  );
}
