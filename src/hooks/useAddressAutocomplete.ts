import { useLazyQuery } from "@apollo/client/react";
import {
  AutocompleteAddressDocument,
  type AutocompleteAddressQuery,
  type AutocompleteAddressQueryVariables,
} from "@/generated/graphql";

export function useAddressAutocomplete() {
  return useLazyQuery<AutocompleteAddressQuery, AutocompleteAddressQueryVariables>(
    AutocompleteAddressDocument,
  );
}
