import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";
import {
  GetPostalCodesByCityDocument,
  type GetPostalCodesByCityQuery,
  type GetPostalCodesByCityQueryVariables,
  GetPostalCodesByStateDocument,
  type GetPostalCodesByStateQuery,
  type GetPostalCodesByStateQueryVariables,
} from "@/generated/graphql";
import type { PostalCode } from "@/graphql/graphql.type";
import type { UniversalOption } from "../components/ui/UniversalAutocomplete";

export function usePostalCode({ cityId, stateId }: { cityId: string; stateId: string }) {
  const {
    data: postalCodeStateData,
    loading: postalCodeStateLoading,
    error: postalCodeStateError,
  } = useQuery<GetPostalCodesByStateQuery, GetPostalCodesByStateQueryVariables>(
    GetPostalCodesByStateDocument,
    {
      variables: { stateId },
      skip: !stateId,
    },
  );

  const {
    data: postalCodeCityData,
    loading: postalCodeCityLoading,
    error: postalCodeCityError,
  } = useQuery<GetPostalCodesByCityQuery, GetPostalCodesByCityQueryVariables>(
    GetPostalCodesByCityDocument,
    {
      variables: { cityId },
      skip: !cityId,
    },
  );

  const postalCodeOptions: UniversalOption[] = useMemo(() => {
    const source =
      cityId && postalCodeCityData?.getPostalCodesByCity
        ? postalCodeCityData.getPostalCodesByCity
        : (postalCodeStateData?.getPostalCodesByState ?? []);

    return source.map((p: PostalCode) => ({
      id: p.id,
      label: p.code,
    }));
  }, [postalCodeStateData, postalCodeCityData, cityId]);

  return {
    postalCodeCityData,
    postalCodeCityError,
    postalCodeCityLoading,
    postalCodeStateData,
    postalCodeStateLoading,
    postalCodeStateError,
    postalCodeOptions,
  };
}
