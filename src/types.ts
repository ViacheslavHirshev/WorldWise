export interface ICountry {
  emoji: string;
  country: string;
}

export interface ICity extends ICountry {
  cityName: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
}

export interface IGeolocationPosition {
  lat: number;
  lng: number;
}

export interface IGeocodingData {
  city: string;
  continent: string;
  countryCode: string;
  countryName: string;
  latitude: number;
  longtitude: number;
  locality: string;
}
