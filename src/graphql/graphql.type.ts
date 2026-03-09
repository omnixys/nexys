import {
  type CreateSignupVerificationMutationVariables,
  type GetAllCountriesQuery,
  type GetAllInterestCategoriesQuery,
  type GetMeQuery,
  GetPostalCodesByCityQuery,
  GetPostalCodesByStateQuery,
  type SecurityQuestionEnum,
} from "@/generated/graphql";

export type Country = GetAllCountriesQuery["getAllCountries"][number];
export type User = GetMeQuery["me"];
export type PostalCode = {
  id: string;
  code: string;
};

export type SecurityQuestionTranslationKey = `securityQuestion.${SecurityQuestionEnum}`;

export type CreateSignupVerificationRequest = CreateSignupVerificationMutationVariables["input"];

export type InterestCategory = GetAllInterestCategoriesQuery["getAllInterestCategories"][number];
