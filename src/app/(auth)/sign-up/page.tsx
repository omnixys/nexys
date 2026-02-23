import { Box, Container, useTheme } from "@mui/material";
import { getCountries } from "../../../lib/getCountries";
import { headers } from "next/headers";
import SignUpPage from "./SignUpPage";

export default async function Page() {

      const countries = await getCountries();

      const headerList = await headers();
      const geoCountry = headerList.get("x-vercel-ip-country") || "DE";
  
  return <SignUpPage countries={countries} defaultCountry={geoCountry} />;
}
