'use server'

import { headers } from "next/headers";
import SignUpPage from "../../../components/auth/signUp/SignUpPage";
import { createCombinedApolloClient } from "../../../lib/client/combined-client";
import { GetAllCountriesDocument, GetAllCountriesQuery, GetAllCountriesQueryVariables } from "@/generated/graphql";

export default async function Page() {
    const client = createCombinedApolloClient();
  
      const res = await client.query<GetAllCountriesQuery, GetAllCountriesQueryVariables>({
        query: GetAllCountriesDocument,
        fetchPolicy: "no-cache",
      });
  
  const countries = res?.data?.getAllCountries ?? [];

      const headerList = await headers();
      const geoCountry = headerList.get("x-vercel-ip-country") || "DE";
  
  return <SignUpPage countries={countries} defaultCountry={geoCountry} />;
}
