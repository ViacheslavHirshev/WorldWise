import { Link } from "react-router-dom";
import { ICity } from "../../types";
import { formatDate } from "../../utils";
import styles from "./CityItem.module.css";

interface CityItemProps {
  city: ICity;
}

export const CityItem = ({ city }: CityItemProps) => {
  return (
    <li>
      <Link
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
        className={styles.cityItem}
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
