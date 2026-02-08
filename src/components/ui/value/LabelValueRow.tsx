import { Box, Typography } from "@mui/material";

export function LabelValue({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>

      <Typography variant="body2" fontWeight={500}>
        {children}
      </Typography>
    </Box>
  );
}
