import { createContext, useContext, useEffect, useState } from "react";
import { ICity } from "../types";

const BASE_URL = "http://localhost:9000";

interface ICitiesContext {
  cities: ICity[];
  isLoading: boolean;
  currentCity?: ICity;
  getCity: (id: string) => Promise<void>;
}
const CitiesContext = createContext<ICitiesContext | undefined>(undefined);

interface CitiesProviderProps {
  children: React.ReactNode;
}
function CitiesProvider({ children }: CitiesProviderProps) {
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<ICity>();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        console.log("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  async function getCity(id: string): Promise<void> {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      console.log("Current city fetching error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities(): ICitiesContext {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context was used outside the Provider");

  return context;
}

export { CitiesProvider, useCities };
