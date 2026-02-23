import { gql } from "@apollo/client";

export const GET_STATES_BY_COUNTRY = gql`
  query GetStatesByCountry($countryId: ID!) {
    getStatesByCountry(countryId: $countryId) {
      id
      code
      name
    }
  }
`;