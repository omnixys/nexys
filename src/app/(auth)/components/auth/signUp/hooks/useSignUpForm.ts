import { useState } from "react";
import { SignUpForm } from "../types";
// import { useSignUpMutation } from "./useSignUpMutation";
import { AuthEventsBus } from "@/utils/AuthManager";

const LAST_STEP = 6;

export function useSignUpForm() {
  const [step, setStep] = useState(0);
  const [acceptedTnc, setAcceptedTnc] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const { signUp, loading } = useSignUpMutation();

  const [form, setForm] = useState<SignUpForm>({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
    password: "",
  });

  const update =
    (key: keyof SignUpForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));

  const next = () => setStep((s) => (s < LAST_STEP ? s + 1 : s));

  const back = () => setStep((s) => (s > 0 ? s - 1 : s));

  /* -------------------------------------------
     CREATE USER (GraphQL)
  ------------------------------------------- */
  const createUser = async () => {
    // if (!acceptedTnc || loading) return;

    // await signUp({
    //   ...form,
    // });

    // Notify AuthProvider → refetch ME
    AuthEventsBus.emit("signup");

    // Success step
    setStep(LAST_STEP);
  };

  return {
    step,
    form,
    acceptedTnc,
    showPassword,
    // loading,

    next,
    back,
    update,

    setAcceptedTnc,
    setShowPassword,

    createUser,
  };
}
