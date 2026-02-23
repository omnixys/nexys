import { useQuery } from "@apollo/client/react";
import { GET_CITIES_BY_STATE } from "@/graphql/address/city.queries";

export function useCities(stateId?: string) {
    return useQuery(GET_CITIES_BY_STATE, {
        variables: { stateId },
        skip: !stateId,
    });
}