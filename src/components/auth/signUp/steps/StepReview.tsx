import { Box, Typography } from "@mui/material";
import { SignUpForm } from "../types";

type Props = {
  form: SignUpForm;
};

export default function StepReview({ form }: Props) {
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Review your data
      </Typography>

      {Object.entries(form).map(([key, value]) => (
        <Typography key={key} variant="body2" sx={{ mb: 0.5 }}>
          <strong>{key}:</strong> {value || "-"}
        </Typography>
      ))}
    </Box>
  );
}
