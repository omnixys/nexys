import { GET_CITIES_BY_STATE } from "@/graphql/address/city.queries";
import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";
import { UniversalOption } from "../components/ui/UniversalAutocomplete";
import {
  GetCitiesByRequest,
  GetCitiesByStateResult,
} from "../types/address/address-graphql.type";

export function useCity(stateId?: string) {
  const { data, error, loading } = useQuery<
    GetCitiesByStateResult,
    GetCitiesByRequest
  >(GET_CITIES_BY_STATE, {
    variables: { stateId },
    skip: !stateId,
  });

  const cityOptions: UniversalOption[] = useMemo(() => {
    return (
      data?.getCitiesByState?.map((c: any) => ({
        id: c.id,
        label: c.name,
        category: c.name[0].toUpperCase(),
      })) ?? []
    );
  }, [data]);

  return { data, cityOptions, error, loading };
}
