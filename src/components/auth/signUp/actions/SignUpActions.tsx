"use client";

import { Box, Button } from "@mui/material";

type Props = {
  step: number;
  back: () => void;
  next: () => void;
  acceptedTnc: boolean;
  createUser: () => Promise<void>;
};

export default function SignUpActions({
  step,
  back,
  next,
  acceptedTnc,
  createUser,
}: Props) {
  // No actions on success step
  if (step >= 6) return null;

  return (
    <Box display="flex" justifyContent="space-between" mt={4} sx={{zIndex: 1300}}>
      <Button disabled={step === 0} onClick={back}>
        Back
      </Button>

      {step === 5 ? (
        <Button
          variant="contained"
          disabled={!acceptedTnc}
          onClick={createUser}
        >
          Create Account
        </Button>
      ) : (
        <Button variant="contained" onClick={next}>
          Next
        </Button>
      )}
    </Box>
  );
}
