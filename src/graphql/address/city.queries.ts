import { gql } from "@apollo/client";

export const GET_CITIES_BY_STATE = gql`
  query GetCitiesByState($stateId: ID!) {
    getCitiesByState(stateId: $stateId) {
      id
      name
    }
  }
`;

export const GET_CITIES_BY_POSTAL = gql`
  query GetCitiesByPostalCode($postalCodeId: ID!) {
    getCitiesByPostalCode(postalCodeId: $postalCodeId) {
      id
      name
    }
  }
`;