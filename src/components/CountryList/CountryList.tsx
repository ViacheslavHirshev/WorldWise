import { useCities } from "../../context/CitiesContext";
import type { ICountry } from "../../types";
import { CountryItem } from "../CountryItem/CountryItem";
import { Message } from "../Message/Message";
import { Spinner } from "../Spinner/Spinner";
import styles from "./CountryList.module.css";

// interface CountryListProps {
//   cities: ICity[];
//   isLoading: boolean;
// }

export const CountryList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (cities.length === 0) return <Message message="No countries visited " />;

  const countries = cities.reduce<ICountry[]>((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};
