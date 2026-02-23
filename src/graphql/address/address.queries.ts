import { gql } from "@apollo/client";

export const ADDRESS_AUTOCOMPLETE = gql`
  query AddressAutocomplete($text: String!) {
    addressAutocomplete(text: $text) {
      formatted
      street
      houseNumber
      postalCode
      city
      state
      country
      confidence
      lat
      lon
    }
  }
`;

export const VALIDATE_ADDRESS = gql`
  query ValidateAddress($input: AddressValidationInput!) {
    validateAddress(input: $input) {
      valid
      reason
      confidence
      formatted
      lon
      lat
    }
  }
`;