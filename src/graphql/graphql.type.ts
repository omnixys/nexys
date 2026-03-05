import { CreateSignupVerificationMutationVariables, GetAllCountriesQuery, GetAllInterestCategoriesQuery, GetMeQuery } from "@/generated/graphql";

export type Country = GetAllCountriesQuery["getAllCountries"][number];

export type User = GetMeQuery["me"]


export type CreateSignupVerificationRequest = CreateSignupVerificationMutationVariables["input"];

export type InterestCategory =
  GetAllInterestCategoriesQuery["getAllInterestCategories"][number];

