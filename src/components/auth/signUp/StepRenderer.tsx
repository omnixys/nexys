import { AnimatePresence, motion } from "framer-motion";
import { STEP_VARIANTS } from "./constants";
import { SignUpForm } from "./types";

import StepPersonal from "./steps/StepPersonal";
import StepAddress from "./steps/StepAddress";
import StepContact from "./steps/StepContact";
import StepPassword from "./steps/StepPassword";
import StepReview from "./steps/StepReview";
import StepTerms from "./steps/StepTerms";
import StepSuccess from "./steps/StepSuccess";


type Props = {
  step: number;
  form: SignUpForm;
  update: any;
  acceptedTnc: boolean;
  setAcceptedTnc: (v: boolean) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
};

export default function StepRenderer(props: Props) {
  const { step } = props;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        variants={STEP_VARIANTS}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {step === 0 && <StepPersonal {...props} />}
        {step === 1 && <StepAddress {...props} />}
        {step === 2 && <StepContact {...props} />}
        {step === 3 && <StepPassword {...props} />}
        {step === 4 && <StepReview {...props} />}
        {step === 5 && <StepTerms {...props} />}
        {step === 6 && <StepSuccess />}
      </motion.div>
    </AnimatePresence>
  );
}
