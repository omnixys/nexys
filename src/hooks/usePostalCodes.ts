import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";
import { UniversalOption } from "../components/ui/UniversalAutocomplete";
import { GetPostalCodesByCityDocument, GetPostalCodesByCityQuery, GetPostalCodesByCityQueryVariables, GetPostalCodesByStateDocument, GetPostalCodesByStateQuery, GetPostalCodesByStateQueryVariables } from "@/generated/graphql";

export function usePostalCode({
  cityId,
  stateId,
}: {
  cityId: string;
  stateId: string;
}) {
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

    return source.map((p: any) => ({
      id: p.id,
      label: p.zip,
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
