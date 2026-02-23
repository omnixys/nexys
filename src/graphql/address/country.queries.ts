import { gql } from "@apollo/client";

export const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    getAllCountries {
      id
      name
      flagSvg
      flagPng
    }
  }
`;