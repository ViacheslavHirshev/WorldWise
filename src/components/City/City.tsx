import { useEffect } from "react";
import { useCities } from "../../context/CitiesContext";
import { formatDate } from "../../utils";
import styles from "./City.module.css";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { ButtonBack } from "../ButtonBack/ButtonBack";

export const City = () => {
  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };
  // const { cityName, emoji, date, notes } = currentCity;
  const { getCity, currentCity, isLoading } = useCities();
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) getCity(id);
  }, [id]);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{currentCity?.emoji}</span> {currentCity?.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {currentCity?.cityName} on</h6>
        <p>
          {formatDate(
            new Date(currentCity !== undefined ? currentCity.date : 0)
          )}
        </p>
      </div>

      {currentCity?.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{currentCity?.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${currentCity?.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {currentCity?.cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
};
