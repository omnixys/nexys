import { CreateSignupVerificationMutationVariables, GetAllCountriesQuery, GetAllInterestCategoriesQuery, GetMeQuery, GetPostalCodesByCityQuery, GetPostalCodesByStateQuery } from "@/generated/graphql";

export type Country = GetAllCountriesQuery["getAllCountries"][number];

export type User = GetMeQuery["me"]

export type PostalCode = {
  id: string;
  code: string;
};

export type CreateSignupVerificationRequest = CreateSignupVerificationMutationVariables["input"];

export type InterestCategory =
  GetAllInterestCategoriesQuery["getAllInterestCategories"][number];

