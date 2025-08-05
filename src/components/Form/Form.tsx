import { FormEvent, useEffect, useState } from "react";

import { Button } from "../Button/Button";
import { ButtonBack } from "../ButtonBack/ButtonBack";
import { Spinner } from "../Spinner/Spinner";
import { Message } from "../Message/Message";

import { useUrlPosition } from "../../hooks/useUrlPosition";
import { ICity, IGeocodingData } from "../../types";
import { convertToEmoji } from "../../utils";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import { useCities } from "../../context/CitiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export const Form = () => {
  const [lat, lng] = useUrlPosition();

  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [error, setError] = useState("");

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchGeocoding = async () => {
      if (!lat && !lng) return;

      try {
        setError("");
        setIsLoadingGeocoding(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data: IGeocodingData = await res.json();

        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to be a city 😥. Click somewhere else!"
          );
        }

        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          console.log(err);
        }
      } finally {
        setIsLoadingGeocoding(false);
      }
    };

    fetchGeocoding();
  }, [lat, lng]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity: ICity = {
      cityName,
      date: date.toLocaleDateString(),
      notes,
      position: {
        lat: Number(lat),
        lng: Number(lng),
      },
      id: Math.floor(Math.random() * 100_000_000),
      emoji: convertToEmoji(countryCode),
      country,
    };

    // console.log(newCity);
    await createCity(newCity);
    navigate("/app");
  };

  if (isLoadingGeocoding) return <Spinner />;
  if (!lat && !lng) return <Message message="Start by clicking on the map" />;
  if (error) return <Message message={error} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{convertToEmoji(countryCode)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => (date ? setDate(date) : () => {})}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
};
