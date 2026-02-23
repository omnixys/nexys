import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";
import { UniversalOption } from "../components/ui/UniversalAutocomplete";
import { GET_STATES_BY_COUNTRY } from "../graphql/address/state.queries";
import {
  GetStatesByCountryRequest,
  GetStatesByCountryResult,
} from "../types/address/address-graphql.type";

export function useState(countryId?: string) {
  const { data, loading, error } = useQuery<
    GetStatesByCountryResult,
    GetStatesByCountryRequest
  >(GET_STATES_BY_COUNTRY, {
    variables: { countryId },
    skip: !countryId,
  });

  const stateOptions: UniversalOption[] = useMemo(() => {
    return (
      data?.getStatesByCountry?.map((s: any) => ({
        id: s.id,
        label: s.name,
        category: s.name[0].toUpperCase(),
      })) ?? []
    );
  }, [data]);

  return { states: data, stateOptions, loading, error };
}
