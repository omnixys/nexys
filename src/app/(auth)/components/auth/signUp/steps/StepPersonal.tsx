import { TextField } from "@mui/material";

export default function StepPersonal({ update }: any) {
  return (
    <>
      <TextField
        label="First Name"
        fullWidth
        sx={{ mb: 2 }}
        onChange={update("firstName")}
      />
      <TextField
        label="Last Name"
        fullWidth
        sx={{ mb: 2 }}
        onChange={update("lastName")}
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        onChange={update("email")}
      />
    </>
  );
}
