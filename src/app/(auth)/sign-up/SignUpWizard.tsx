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
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";

import Confetti from "react-confetti";

// Steps
import {
  ContactOptionsType,
  GenderType,
  InterestType,
  MaritalStatusType,
  RelationshipType,
  UserType,
} from "../../../types/user/user-enum-type";
import AccountStep from "./steps/AccountStep";
import AddressesStep from "./steps/AddressesStep";
import ContactsStep from "./steps/ContactsStep";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import PhoneNumbersStep from "./steps/PhoneNumbersStep";
import ProfileDetailsStep from "./steps/ProfileDetailsStep";
import SecurityQuestionsStep from "./steps/SecurityQuestionsStep";
import SuccessStep from "./steps/SuccessStep";
import SummaryStep from "./steps/SummaryStep";
import TermsStep from "./steps/TermsStep";
import SignUpLayout from "../../../components/auth/signUp/SignUpLayout";
import { useMutation } from "@apollo/client/react";
import { OMNIXYS_LOGOS } from "../../../utils/omnixysBranding";
import { useThemeMode } from "../../../providers/ThemeModeProvider";
import { REGISTER_CUSTOMER } from "../../../graphql/user/user-register.graphql";
import { SignUpPageProps } from "./SignUpPage";
import { useRouter } from "next/navigation";

// ------------------------------
// Types
// ------------------------------
// export type SignUpFormValues = {
//   username: string;
//   userType: UserType;
//   password: string;
//   confirmPassword: string;

//   personalInfo: {
//     email: string;
//     firstName: string;
//     lastName: string;
//     birthDate: string;
//     gender: GenderType;
//     maritalStatus: MaritalStatusType;
//   };

//   addresses: Array<{
//     street: string;
//     houseNumber: string;
//     zipCode: string;
//     city: string;
//     state?: string;
//     country: string;
//     additionalInfo?: string;
//   }>;

//   phoneNumbers?: Array<{
//     type: string;
//     number: string;
//     label?: string;
//     isPrimary?: boolean;
//     countryCode: string;
//   }>;

//   securityQuestions: Array<{
//     question: string;
//     answer: string;
//   }>;

//   customer?: {
//     tierLevel: number;
//     subscribed: boolean;
//     state?: string;
//     interests: InterestType[];
//     contactOptions: ContactOptionsType[];
//   };

//   employee?: {
//     department?: string;
//     position?: string;
//     role?: string;
//     salary?: number;
//     hireDate?: string;
//     isExternal: boolean;
//   };

//   contacts?: Array<{
//     contactId: string;
//     relationship: RelationshipType;
//     withdrawalLimit?: number;
//     emergency?: boolean;
//     startDate?: string;
//     endDate?: string;
//   }>;

//   termsAccepted: boolean;
// };

// ------------------------------
// Schema (Zod)
// ------------------------------
const schema = z
  .object({
    username: z.string().min(3).max(32),
    userType: z.nativeEnum(UserType),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),

    personalInfo: z.object({
      email: z.string().email(),
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      birthDate: z.string().refine((val) => {
        const today = new Date();
        const birth = new Date(val);

        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          age--;
        }

        return age >= 18;
      }, "You must be at least 18 years old"),

      gender: z.nativeEnum(GenderType),
      maritalStatus: z.nativeEnum(MaritalStatusType),
    }),

    addresses: z
      .array(
        z
          .object({
            countryId: z.string().min(1),
            country: z.string().min(1),

            stateId: z.string().min(1),
            state: z.string().min(1),

            cityId: z.string().min(1),
            city: z.string().min(1),

            postalRequired: z.boolean().default(true),
            postalCodeId: z.string().optional(),
            postalCode: z.string().optional(),

            street: z.string().min(1),
            houseNumber: z.string().min(1),

            addressType: z.string().min(1),
            additionalInfo: z.string().optional(),

            formatted: z.string().optional(),
            lat: z.number().nullable().optional(),
            lon: z.number().nullable().optional(),
          })
          .superRefine((addr, ctx) => {
            // Postal code is required only if postal options exist for the current selection.
            if (!addr.postalRequired) return;

            const ok = Boolean(addr.postalCodeId?.trim());
            if (!ok) {
              ctx.addIssue({
                code: "custom",
                path: ["postalCodeId"],
                message: "ZIP is required for this location.",
              });
            }
          }),
      )
      .min(1),

    phoneNumbers: z
      .array(
        z.object({
          type: z.string().min(1),
          number: z.string().min(6),
          label: z.string().optional(),
          isPrimary: z.boolean().optional(),
          countryCode: z.string().min(1),
        }),
      )
      .optional(),

    securityQuestions: z
      .array(
        z.object({
          question: z.string().min(3),
          answer: z.string().min(2),
        }),
      )
      .min(1),

    customer: z
      .object({
        tierLevel: z.number().int().min(0),
        subscribed: z.boolean(),
        state: z.string().optional(),
        interests: z.array(z.nativeEnum(InterestType)),
        contactOptions: z.array(z.nativeEnum(ContactOptionsType)).min(1),
      })
      .optional(),

    employee: z
      .object({
        department: z.string().optional(),
        position: z.string().optional(),
        role: z.string().optional(),
        salary: z.number().optional(),
        hireDate: z.string().optional(),
        isExternal: z.boolean(),
      })
      .optional(),

    contacts: z
      .array(
        z.object({
          contactId: z.string().min(1),
          relationship: z.nativeEnum(RelationshipType),
          withdrawalLimit: z.number().optional(),
          emergency: z.boolean().optional(),
          startDate: z.string().optional(),
          endDate: z.string().optional(),
        }),
      )
      .optional(),

    termsAccepted: z.boolean().refine((v) => v === true, {
      message: "You must accept the terms to continue.",
    }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }

    // Conditional: require customer for CUSTOMER
    if (val.userType === UserType.CUSTOMER && !val.customer) {
      ctx.addIssue({
        code: "custom",
        path: ["customer"],
        message: "Customer profile is required for CUSTOMER accounts.",
      });
    }
    if (val.userType === UserType.EMPLOYEE && !val.employee) {
      ctx.addIssue({
        code: "custom",
        path: ["employee"],
        message: "Employee profile is required for EMPLOYEE accounts.",
      });
    }
  });

  export type SignUpFormValues = z.infer<typeof schema>;


// ------------------------------
// Steps config
// ------------------------------
const STEPS = [
  { key: "personal", label: "Personal", fields: ["personalInfo"] as const },
  {
    key: "account",
    label: "Account",
    fields: ["username", "password", "confirmPassword"] as const,
  },
  { key: "phones", label: "Phone", fields: ["phoneNumbers"] as const },
  { key: "addresses", label: "Address", fields: ["addresses"] as const },
  {
    key: "security",
    label: "Security",
    fields: ["securityQuestions"] as const,
  },
  {
    key: "details",
    label: "Details",
    fields: ["customer", "employee"] as const,
  },
  { key: "contacts", label: "Contacts", fields: ["contacts"] as const },
  { key: "terms", label: "Terms", fields: ["termsAccepted"] as const },
  { key: "summary", label: "Summary", fields: [] as const },
  { key: "finish", label: "Finish", fields: [] as const },
] as const;

export default function SignUpWizard({ countries, defaultCountry }: SignUpPageProps) {
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
          postalRequired: true,
          postalCodeId: "",
          postalCode: "",
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
const currentUsername = methods.watch("username");

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
            defaultCountry={defaultCountry}
          />
        );
      case "phones":
        return <PhoneNumbersStep />;
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
    const needsPostal = addr.postalRequired !== false; // default true
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
  const {
    confirmPassword, 
    termsAccepted,
    ...rest
  } = values;

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

