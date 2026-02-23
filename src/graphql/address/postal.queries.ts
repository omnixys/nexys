import { gql } from "@apollo/client";

export const GET_POSTAL_BY_STATE = gql`
  query GetPostalCodesByState($stateId: ID!) {
    getPostalCodesByState(stateId: $stateId) {
      id
      zip
    }
  }
`;

export const GET_POSTAL_BY_CITY = gql`
  query GetPostalCodesByCity($cityId: ID!) {
    getPostalCodesByCity(cityId: $cityId) {
      id
      zip
    }
  }
`;