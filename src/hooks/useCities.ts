import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";
import { UniversalOption } from "../components/ui/UniversalAutocomplete";
import { GetCitiesByStateDocument, GetCitiesByStateQuery, GetCitiesByStateQueryVariables } from "@/generated/graphql";

export function useCity(stateId?: string) {
  const { data, error, loading } = useQuery<
    GetCitiesByStateQuery,
    GetCitiesByStateQueryVariables
  >(GetCitiesByStateDocument, {
    variables: { stateId: stateId! },
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
