import { createContext, useContext, useEffect, useReducer } from "react";

/* eslint-disable react/prop-types */

const BASE_URL = "http://localhost:8000";
// 1. CREATE A CONTEXT
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
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
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    default:
      throw new Error("Unknown action type!");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "Error loading cities ..." });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === Number(currentCity.id)) {
      return;
    }

    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      console.log(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Error loading city ..." });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      console.log(newCity);
      const response = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      console.log("step 2");
      const data = await response.json();

      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "rejected", payload: "Error creating city ..." });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({ type: "rejected", payload: "Error deleting city ..." });
    }
  }

  // 2. PROVIDE VALUE TO CHILD COMPONENTS
  return (
    <CitiesContext.Provider
      value={{
        error,
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

// 3. COMSUME VALUE (Using custon hook)
// FUNC: To call value in (2.), use inside child component
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of the PostProvider");
  return context;
}

export { CitiesProvider, useCities };
