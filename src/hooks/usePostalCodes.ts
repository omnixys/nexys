import {
  GET_POSTAL_BY_CITY,
  GET_POSTAL_BY_STATE,
} from "@/graphql/address/postal.queries";
import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";
import { UniversalOption } from "../components/ui/UniversalAutocomplete";
import {
  GetPostalCodeByCityRequest,
  GetPostalCodeByCityResult,
  GetPostalCodeByStateRequest,
  GetPostalCodeByStateResult,
} from "../types/address/address-graphql.type";

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
  } = useQuery<GetPostalCodeByStateResult, GetPostalCodeByStateRequest>(
    GET_POSTAL_BY_STATE,
    {
      variables: { stateId },
      skip: !stateId,
    },
  );

  const {
    data: postalCodeCityData,
    loading: postalCodeCityLoading,
    error: postalCodeCityError,
  } = useQuery<GetPostalCodeByCityResult, GetPostalCodeByCityRequest>(
    GET_POSTAL_BY_CITY,
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
