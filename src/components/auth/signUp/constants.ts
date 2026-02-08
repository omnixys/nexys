import Image from "next/image";


export const STEPS = [
  "Personal Info",
  "Address",
  "Security Contact",
  "Password",
  "Review",
  "Terms",
  "Success",
];

export const STEP_VARIANTS = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};
