import { GatewayGraphQLError } from "../../utils/graphqlHandler.error";
import { City, Country, PostalCode, State } from "./address.type";

export type GetAllCountriesResult = {
  getAllCountries: Country[];
  error?: GatewayGraphQLError;
};

export type GetStatesByCountryResult = {
  getStatesByCountry: State[];
  error?: GatewayGraphQLError;
};

export type GetStatesByCountryRequest = {
  countryId?: string;
};

export type GetCitiesByStateResult = {
  getCitiesByState: City[];
  error?: GatewayGraphQLError;
};

export type GetCitiesByRequest = {
  stateId?: string;
};

export type GetPostalCodeByCityResult = {
  getPostalCodesByCity: PostalCode[];
  error?: GatewayGraphQLError;
};

export type GetPostalCodeByCityRequest = {
  cityId: string;
};

export type GetPostalCodeByStateResult = {
  getPostalCodesByState: PostalCode[];
  error?: GatewayGraphQLError;
};

export type GetPostalCodeByStateRequest = {
  stateId: string;
};

