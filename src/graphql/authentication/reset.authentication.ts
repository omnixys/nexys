import { gql } from "@apollo/client";

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;

export const VERIFY_PASSWORD_RESET_TOKEN = gql`
  mutation VerifyPasswordResetToken($token: String!) {
    verifyPasswordResetToken(token: $token) {
      mfaRequired
      mfaMethod
    }
  }
`;

export const VERIFY_PASSWORD_RESET_STEP_UP = gql`
  mutation VerifyPasswordResetStepUp($input: StepUpVerificationInputGql!) {
    verifyPasswordResetStepUp(input: $input)
  }
`;

export const COMPLETE_PASSWORD_RESET = gql`
  mutation CompletePasswordReset($input: CompleteResetInputGql!) {
    completePasswordReset(input: $input)
  }
`;
