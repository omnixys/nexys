import { useLazyQuery } from "@apollo/client/react";
import { ADDRESS_AUTOCOMPLETE } from "@/graphql/address/address.queries";

export function useAddressAutocomplete() {
    return useLazyQuery(ADDRESS_AUTOCOMPLETE);
}