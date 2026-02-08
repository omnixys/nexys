import { useMutation } from "@apollo/client/react";
import { SignUpForm } from "../types";


// export function useSignUpMutation() {
//   const [mutate, { loading, error }] = useMutation(SIGN_UP, {
//     context: {
//       fetchOptions: {
//         credentials: "include",
//       },
//     },
//   });

//   return {
//     signUp: (input: SignUpForm) => mutate({ variables: { input } }),
//     loading,
//     error,
//   };
// }
