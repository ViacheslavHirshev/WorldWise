import { useState } from "react";
import { IGeolocationPosition } from "../types";

export const useGeolocation = (
  defaultPos: IGeolocationPosition | null = null
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<IGeolocationPosition | null>(
    defaultPos
  );
  const [error, setError] = useState("");

  const getPosition = (): void => {
    if (!navigator.geolocation) {
      setError("Your browser doesn't support geolocation");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );
  };

  return { isLoading, position, error, getPosition };
};
