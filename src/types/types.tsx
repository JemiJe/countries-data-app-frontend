export type AvailableCountries = Array<{
    countryCode: string;
    name: string;
  }>;
  
  export type CountryInfo = {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: Array<{
      commonName: string;
      officialName: string;
      countryCode: string;
      region: string;
      borders: unknown;
    }>;
  };
  
  export type PopulationCount = {
    year: number;
    value: number;
  };
  
  export type CountryPopulationData = {
    country: string;
    code: string;
    iso3: string;
    populationCounts: PopulationCount[];
  };
  
  export type CountryPopulation = {
    error: boolean;
    msg: string;
    data: CountryPopulationData[];
  };
  
  export type CountryFlag = {
    error: boolean;
    msg: string;
    data: Array<{
      name: string;
      flag: string;
      iso2: string;
      iso3: string;
    }>;
  };  