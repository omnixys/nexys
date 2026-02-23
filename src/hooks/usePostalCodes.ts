import { useQuery } from "@apollo/client/react";
import { GET_POSTAL_BY_STATE } from "@/graphql/address/postal.queries";

export function usePostalCodes(stateId?: string) {
    return useQuery(GET_POSTAL_BY_STATE, {
        variables: { stateId },
        skip: !stateId,
    });
}