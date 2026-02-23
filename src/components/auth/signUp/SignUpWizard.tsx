"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardContent,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Confetti from "react-confetti";

// Steps
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import ContactsStep from "./steps/ContactsStep";
import ProfileDetailsStep from "./steps/ProfileDetailsStep";
import SuccessStep from "./steps/SuccessStep";
import SummaryStep from "./steps/SummaryStep";
import TermsStep from "./steps/TermsStep";
import { REGISTER_CUSTOMER } from "../../../graphql/user/user-register.graphql";
import { useThemeMode } from "../../../providers/ThemeModeProvider";
import { schema, SignUpFormValues } from "../../../schemas/sign-up.schema";
import { UserType } from "../../../types/user/user-enum-type";
import { OMNIXYS_LOGOS } from "../../../utils/omnixysBranding";
import { SignUpPageProps } from "./SignUpPage";
import AccountStep from "./steps/AccountStep";
import AddressesStep from "./steps/AddressesStep";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import PhoneNumbersStep from "./steps/PhoneNumbersStep";
import SecurityQuestionsStep from "./steps/SecurityQuestionsStep";
import { STEPS } from "./steps/steps";

export default function SignUpWizard({
  countries,
  defaultCountry,
}: SignUpPageProps) {
  const router = useRouter();

  const { scheme } = useThemeMode();
  const [activeStep, setActiveStep] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [mutate, { loading, error }] = useMutation(REGISTER_CUSTOMER, {
    context: {
      fetchOptions: {
        credentials: "include",
      },
    },
  });

  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      userType: UserType.CUSTOMER,
      password: "",
      confirmPassword: "",
      personalInfo: {
        email: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        gender: undefined,
        maritalStatus: undefined,
      },
      addresses: [
        {
          street: "",
          houseNumber: "",
          postalCodeRequired: true,
          postalCodeId: undefined,
          postalCode: undefined,
          cityId: "",
          city: "",
          stateId: "",
          state: "",
          countryId: "",
          country: defaultCountry ?? "",
          additionalInfo: "",
          addressType: "",
        },
      ],
      phoneNumbers: [],
      securityQuestions: [{ question: "", answer: "" }],
      customer: {
        tierLevel: 1,
        subscribed: true,
        state: "ACTIVE",
        interests: [],
        contactOptions: [],
      },
      employee: {
        department: "",
        position: "",
        role: "",
        salary: 0,
        hireDate: "",
        isExternal: false,
      },
      contacts: [],
      termsAccepted: false,
    },
  });
  const { formState, getFieldState, watch } = methods;

  const firstName = methods.watch("personalInfo.firstName");
  const lastName = methods.watch("personalInfo.lastName");

  useEffect(() => {
    if (!firstName || !lastName) return;

    // Nur wenn beide mindestens 2 Zeichen haben
    if (firstName.trim().length < 2) return;
    if (lastName.trim().length < 2) return;

    if (!methods.getValues("username")) {
      const generated = generateUsername(firstName, lastName);

      methods.setValue("username", generated, {
        shouldValidate: true,
        shouldDirty: false,
      });
    }
  }, [firstName, lastName]);

  const userType = methods.watch("userType");
  const canSkipContacts = true;
  const isContactsStep = STEPS[activeStep]?.key === "contacts";
  const logoSrc = OMNIXYS_LOGOS[scheme];
  const currentStep = STEPS[activeStep];

  const next = async () => {
    const step = STEPS[activeStep];
    if (!step) return;

    // Summary & Finish don't need validation here
    if (step.key === "summary") {
      const values = mapFormToCreateUserInput(methods.getValues());
      await mutate({
        variables: {
          input: values,
        },
      });

      // Here you would call the GraphQL mutation (createUser)
      setCelebrate(true);
      setActiveStep((s) => s + 1);
      return;
    }

    if (step.key === "finish") return;

    // Contacts can be skipped
    if (isContactsStep && canSkipContacts) {
      setActiveStep((s) => s + 1);
      return;
    }

    // Trigger validation for current step's fields
    const ok = await methods.trigger(step.fields as any, { shouldFocus: true });
    if (!ok) return;

    // Ensure conditional data is present before leaving "details"
    if (step.key === "details") {
      if (userType === UserType.CUSTOMER && !methods.getValues("customer"))
        return;
      if (userType === UserType.EMPLOYEE && !methods.getValues("employee"))
        return;
    }

    setActiveStep((s) => s + 1);
  };
  const back = () => setActiveStep((s) => Math.max(0, s - 1));
  const renderStep = () => {
    switch (STEPS[activeStep].key) {
      case "account":
        return <AccountStep />;
      case "personal":
        return <PersonalInfoStep />;
      case "addresses":
        return (
          <AddressesStep
            countries={countries}
            defaultCountry={defaultCountry}
          />
        );
      case "phones":
        return (
          <PhoneNumbersStep
            countries={countries}
            defaultCountry={defaultCountry}
          />
        );
      case "security":
        return <SecurityQuestionsStep />;
      case "details":
        return <ProfileDetailsStep />;
      case "contacts":
        return <ContactsStep />;
      case "terms":
        return <TermsStep />;
      case "summary":
        return <SummaryStep />;
      case "finish":
        return <SuccessStep />;
      default:
        return null;
    }
  };

  const showNav = STEPS[activeStep].key !== "finish";

  const isCurrentStepValid = (() => {
    if (currentStep.key === "summary") return true;

    if (currentStep.key === "addresses") {
      const addresses = methods.getValues("addresses");

      return addresses.every((addr: any) => {
        const needsPostal = addr.postalCodeRequired !== false; // default true
        const hasPostal = Boolean(addr.postalCodeId?.trim?.());

        return (
          addr.countryId &&
          addr.stateId &&
          addr.cityId &&
          (!needsPostal || hasPostal) &&
          addr.street &&
          addr.houseNumber
        );
      });
    }
    return currentStep.fields.every((field) => {
      const state = getFieldState(field as any, formState);
      return !state.invalid;
    });
  })();

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          mb: 3,
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={logoSrc}
          alt="Omnixys Logo"
          width={50}
          height={50}
          priority
        />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Omnixys
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Premium onboarding — secure, structured, and human-first.
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {STEPS.map((s) => (
          <Step key={s.key}>
            <StepLabel>{s.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card
        sx={{
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          background: "main.primary",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2.5, md: 4 },
            height: { xs: 520, md: 500 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={(theme) => ({
              flex: 1,
              overflowY: "auto",
              pr: 1,
              scrollBehavior: "smooth",

              /* Firefox */
              scrollbarWidth: "thin",
              scrollbarColor: `${theme.palette.primary.main} transparent`,

              /* WebKit */
              "&::-webkit-scrollbar": {
                width: 8,
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(0,0,0,0.25)",
                borderRadius: 20,
                transition: "background-color 0.3s ease",
              },
              "&:hover::-webkit-scrollbar-thumb": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.45)"
                    : "rgba(0,0,0,0.45)",
              },
            })}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={STEPS[activeStep].key}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.35 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {showNav && (
              <Box mt={4} display="flex" justifyContent="space-between" gap={2}>
                <Button onClick={back} disabled={activeStep === 0}>
                  Back
                </Button>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    cursor: "pointer",
                    fontWeight: 600,
                    color: "primary.main",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={() => router.replace("/login")}
                >
                  Already have an account? Log in
                </Typography>

                <Button
                  // disabled={!isValid}
                  variant="contained"
                  onClick={next}
                  disabled={!isCurrentStepValid || loading}
                >
                  {STEPS[activeStep].key === "summary"
                    ? "Confirm & Create"
                    : "Next"}
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>

        {celebrate && <Confetti recycle={false} numberOfPieces={380} />}
      </Card>
    </FormProvider>
  );
}

function mapFormToCreateUserInput(values: SignUpFormValues) {
  const { confirmPassword, termsAccepted, ...rest } = values;

  return rest;
}

function generateUsername(firstName?: string, lastName?: string) {
  if (!firstName || !lastName) return "";

  const fn = firstName.trim().toLowerCase();
  const ln = lastName.trim().toLowerCase();

  const firstPart = ln.slice(0, 2);
  const secondPart = fn.slice(0, 2);

  const random = Math.floor(1000 + Math.random() * 9000); // 4 digits
  const username = `${firstPart}${secondPart}${random}`;
  console.log({ username, fn, ln });

  return username;
}
