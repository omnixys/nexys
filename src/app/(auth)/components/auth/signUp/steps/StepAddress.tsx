import { TextField } from "@mui/material";

export default function StepAddress({ update }: any) {
  return (
    <>
      <TextField
        label="Street"
        fullWidth
        sx={{ mb: 2 }}
        onChange={update("street")}
      />
      <TextField
        label="City"
        fullWidth
        sx={{ mb: 2 }}
        onChange={update("city")}
      />
      <TextField
        label="ZIP Code"
        fullWidth
        sx={{ mb: 2 }}
        onChange={update("zip")}
      />
      <TextField label="Country" fullWidth onChange={update("country")} />
    </>
  );
}
