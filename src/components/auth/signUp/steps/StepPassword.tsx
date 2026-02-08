import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type Props = {
  update: any;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
};

export default function StepPassword({
  update,
  showPassword,
  setShowPassword,
}: Props) {
      const theme = useTheme();
  
  return (
    <FormControl fullWidth>
      <InputLabel>Password</InputLabel>
      <OutlinedInput
        type={showPassword ? "text" : "password"}
        onChange={update("password")}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((v) => !v)}
              edge="end"
              sx={{ color: theme.palette.text.secondary }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}
