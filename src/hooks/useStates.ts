import { useQuery } from "@apollo/client/react";
import { GET_STATES_BY_COUNTRY } from "../graphql/address/state.queries";

export function useStates(countryId?: string) {
    return useQuery(GET_STATES_BY_COUNTRY, {
        variables: { countryId },
        skip: !countryId,
    });
}