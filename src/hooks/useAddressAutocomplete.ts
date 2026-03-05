import { AutocompleteAddressDocument } from "@/generated/graphql";
import { useLazyQuery } from "@apollo/client/react";

export function useAddressAutocomplete() {
    return useLazyQuery(AutocompleteAddressDocument);
}