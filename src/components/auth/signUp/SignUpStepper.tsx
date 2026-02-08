import { Stepper, Step, StepLabel } from "@mui/material";
import { STEPS } from "./constants";

export default function SignUpStepper({ step }: { step: number }) {
  return (
    <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
      {STEPS.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
