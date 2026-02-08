import { TextField } from "@mui/material";

export default function StepContact({ update }: any) {
  return (
    <TextField label="Phone Number" fullWidth onChange={update("phone")} />
  );
}
