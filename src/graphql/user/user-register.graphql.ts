import { gql } from "@apollo/client";

export const REGISTER_CUSTOMER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

export const CHECK_USERNAME = gql`
  query CheckUsername($username: String!) {
    checkUsername(username: $username)
  }
`;

export const CHECK_EMAIL = gql`
  query CheckEmail($email: String!) {
    checkEmail(email: $email)
  }
`;