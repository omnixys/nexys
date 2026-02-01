"use client";

import { TextField, TextFieldProps } from "@mui/material";

export default function GlassTextField(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(6px)",
          color: "#fff",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(255,255,255,0.2)",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(168,62,180,0.6)",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "secondary.main",
          boxShadow: "0 0 12px rgba(168,62,180,0.6)",
        },
        "& .MuiInputLabel-root": {
          color: "rgba(255,255,255,0.6)",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "secondary.main",
        },
        "& input, & textarea": {
          color: "#fff",
        },
        ...props.sx,
      }}
    />
  );
}
