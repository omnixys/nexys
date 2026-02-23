import { useQuery } from "@apollo/client/react";
import { GET_ALL_COUNTRIES } from "../graphql/address/country.queries";

export function useCountries() {
    return useQuery(GET_ALL_COUNTRIES);
}