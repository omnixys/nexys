export interface Country {
  id: string;
  name: string;
  iso2: string;
  iso3: string;
  numericCode: string;
  flagSvg: string;
  flagPng: string;
  nationality: string;
  tld: string;
  population: number;
  areaSqKm: number;
  latitude: number;
  longitude: number;
  
  continent: Continent;
  subregion: Subregion;
  currency: Currency;
  callingCode: CallingCode;
  languages: Language[];
  timezones: Timezone[];
  states: State[];
}

export interface Continent {
  id: string;
  name: string;
  code: string;
  subregions: Subregion[];
}

export interface Subregion {
  id: string;
  name: string;
  continent: Continent;
  countries: Country[];
}

export interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  countries: Country[];
}

export interface CallingCode {
  id: string;
  code: string;
  countries: Country[];
}

export interface Language {
  id: string;
  code: string;
  countries: Country[];
}

export interface Timezone {
  id: string;
  zone: string;
  gmtOffset: string;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
  countries: string;
}

export interface State {
  id: string;
  code: string;
  iso3166Code: string;

  name: string;
  type: string;
  level: string;

  latitude: number;
  longitude: number;
  population: number;

  country: Country;
  parent: State;
  timezone: Timezone[];
  cities: City[];
}

export interface City {
  id: string;
  name: string;
  location: string;
  population: number;
  type: string;
  level: string;

  state: State;
  timezone: Timezone;
  parent: City;
  postalCode: PostalCode[];
}

export interface PostalCode {
  id: string;
  zip: string;

  accuracy: number;
  country: Country;
  city: City[];

}

