import { ContactOptionsType, GenderType, InterestType, MaritalStatusType, RelationshipType, UserType } from "../types/user/user-enum-type";
import { z } from "zod";

export type SignUpFormValues = z.infer<typeof schema>;
export const schema = z
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

      gender: z.enum(GenderType),
      maritalStatus: z.enum(MaritalStatusType),
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

            postalCodeRequired: z.boolean(),
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
            // Postal code is required only if postalCode options exist for the current selection.
            if (!addr.postalCodeRequired) return;

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
