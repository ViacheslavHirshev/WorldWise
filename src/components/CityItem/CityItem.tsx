import { Link } from "react-router-dom";
import { ICity } from "../../types";
import { formatDate } from "../../utils";
import styles from "./CityItem.module.css";
import { useCities } from "../../context/CitiesContext";

interface CityItemProps {
  city: ICity;
}

export const CityItem = ({ city }: CityItemProps) => {
  const { currentCity } = useCities();

  return (
    <li>
      <Link
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
        className={`${styles.cityItem} ${
          currentCity?.id === city.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date} dateTime={city.date}>
          {formatDate(new Date(city.date))}
        </time>
        <button className={styles.deleteBtn}>x</button>
      </Link>
    </li>
  );
};
