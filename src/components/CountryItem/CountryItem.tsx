import { ICountry } from "../../types";
import styles from "./CountryItem.module.css";

interface CountryItemProps {
  country: ICountry;
}

export const CountryItem = ({ country }: CountryItemProps) => {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
};
