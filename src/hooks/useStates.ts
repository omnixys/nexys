import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";
import { UniversalOption } from "../components/ui/UniversalAutocomplete";
import { GetStatesByCountryDocument, GetStatesByCountryQuery, GetStatesByCountryQueryVariables } from "@/generated/graphql";

export function useState(countryId?: string) {
  const { data, loading, error } = useQuery<
    GetStatesByCountryQuery,
    GetStatesByCountryQueryVariables
  >(GetStatesByCountryDocument, {
    variables: { countryId: countryId! },
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
