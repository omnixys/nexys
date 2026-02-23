export const STEPS = [
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