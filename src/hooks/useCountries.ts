import { useQuery } from "@apollo/client/react";
import {
  GetAllCountriesDocument,
  type GetAllCountriesQuery,
  type GetAllCountriesQueryVariables,
} from "@/generated/graphql";

export function useCountries() {
  return useQuery<GetAllCountriesQuery, GetAllCountriesQueryVariables>(GetAllCountriesDocument);
}
