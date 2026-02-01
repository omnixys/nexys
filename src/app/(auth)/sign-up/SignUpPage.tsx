/**
 * @file SignUpPage.tsx
 * @description Omnixys Sign-Up Flow
 * - Animated steps
 * - Review before submit
 * - T&C confirmation
 * - Success page with confetti
 */

"use client";

import SignUpLayout from "../components/auth/signUp/SignUpLayout";
import SignUpStepper from "../components/auth/signUp/SignUpStepper";
import StepRenderer from "../components/auth/signUp/StepRenderer";
import SignUpActions from "../components/auth/signUp/actions/SignUpActions";
import { useSignUpForm } from "../components/auth/signUp/hooks/useSignUpForm";
import BrandingHeader from "../components/auth/login/BrandingHeader";

export default function SignUpPage() {
  const formState = useSignUpForm();

  return (
    <SignUpLayout>
      <BrandingHeader />
      <SignUpStepper step={formState.step} />
      <StepRenderer {...formState} />
      <SignUpActions {...formState} />
    </SignUpLayout>
  );
}
