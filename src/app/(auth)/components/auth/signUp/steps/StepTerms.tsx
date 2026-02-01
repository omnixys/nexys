import { Checkbox, FormControlLabel } from "@mui/material";

type Props = {
  acceptedTnc: boolean;
  setAcceptedTnc: (v: boolean) => void;
};

export default function StepTerms({ acceptedTnc, setAcceptedTnc }: Props) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={acceptedTnc}
          onChange={(e) => setAcceptedTnc(e.target.checked)}
        />
      }
      label="I accept the Terms & Conditions"
    />
  );
}
