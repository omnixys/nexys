import { useQuery } from "@apollo/client/react";
import {
  GetAllInterestCategoriesDocument,
  type GetAllInterestCategoriesQuery,
  type GetAllInterestCategoriesQueryVariables,
} from "@/generated/graphql";

export function useInterestCategory() {
  const { data, loading, error } = useQuery<
    GetAllInterestCategoriesQuery,
    GetAllInterestCategoriesQueryVariables
  >(GetAllInterestCategoriesDocument);

  return { data, loading, error };
}
