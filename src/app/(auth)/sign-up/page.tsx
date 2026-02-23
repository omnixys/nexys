'use server'

import { headers } from "next/headers";
import { GET_ALL_COUNTRIES } from "../../../graphql/address/country.queries";
import SignUpPage from "../../../components/auth/signUp/SignUpPage";
import { createCombinedApolloClient } from "../../../lib/client/combined-client";
import { GetAllCountriesResult } from "../../../types/address/address-graphql.type";

export default async function Page() {
    const client = createCombinedApolloClient();
  
      const res = await client.query<GetAllCountriesResult>({
        query: GET_ALL_COUNTRIES,
        fetchPolicy: "no-cache",
      });
  
  const countries = res?.data?.getAllCountries ?? [];

      const headerList = await headers();
      const geoCountry = headerList.get("x-vercel-ip-country") || "DE";
  
  return <SignUpPage countries={countries} defaultCountry={geoCountry} />;
}
