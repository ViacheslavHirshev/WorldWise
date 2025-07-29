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
