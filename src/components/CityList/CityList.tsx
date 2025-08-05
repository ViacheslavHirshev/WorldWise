import { useCities } from "../../context/CitiesContext";
import { CityItem } from "../CityItem/CityItem";
import { Message } from "../Message/Message";
import { Spinner } from "../Spinner/Spinner";
import styles from "./CityList.module.css";

export const CityList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return (
      <Message message="Add your first city by clicking on the city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};
