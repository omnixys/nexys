import { GetAllInterestCategoriesDocument, GetAllInterestCategoriesQuery, GetAllInterestCategoriesQueryVariables } from "@/generated/graphql";
import { useQuery } from "@apollo/client/react";

export function useInterestCategory() {
  const { data, loading, error } = useQuery<GetAllInterestCategoriesQuery, GetAllInterestCategoriesQueryVariables>(
    GetAllInterestCategoriesDocument
  )

  return {data, loading, error}
}