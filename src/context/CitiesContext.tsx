import { createContext, useContext, useEffect, useReducer } from "react";
import { ICity } from "../types";

const BASE_URL = "http://localhost:9000";

interface ICitiesContext {
  cities: ICity[];
  isLoading: boolean;
  currentCity?: ICity;
  getCity: (id: string) => Promise<void>;
  createCity: (newCity: ICity) => void;
  deleteCity: (id: number) => void;
}
const CitiesContext = createContext<ICitiesContext | undefined>(undefined);

interface IInitialState {
  cities: ICity[];
  isLoading: boolean;
  currentCity: ICity | undefined;
  error: string;
}
const initialState: IInitialState = {
  cities: [],
  isLoading: false,
  currentCity: undefined,
  error: "",
};

type Action =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: ICity[] }
  | { type: "city/created"; payload: ICity }
  | { type: "city/loaded"; payload: ICity }
  | { type: "cities/deleted"; payload: number }
  | { type: "rejected"; payload: string };

function reducer(state: IInitialState, action: Action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

interface CitiesProviderProps {
  children: React.ReactNode;
}
function CitiesProvider({ children }: CitiesProviderProps) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchCities = async () => {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities data...",
        });
      }
    };

    fetchCities();
  }, []);

  async function getCity(id: string): Promise<void> {
    if (Number(id) === currentCity?.id) return;

    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading city data...",
      });
    }
  }

  async function createCity(newCity: ICity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating new city...",
      });
    }
  }

  async function deleteCity(id: number) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city data...",
      });
    }

    dispatch({ type: "cities/deleted", payload: id });
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
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
