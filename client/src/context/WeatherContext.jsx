import { createContext, useContext, useEffect, useState } from "react";

import {
  getCurrentWeather,
  getForecast,
  getWeatherDetails,
} from "../services/weatherApi";
import { useAuth } from "./AuthContext";

const WeatherContext = createContext(null);

export const WeatherProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [details, setDetails] = useState(null);
  const [city, setCity] = useState("Surat");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const loadWeather = async (options = {}) => {
    if (!user) {
      setWeather(null);
      setForecast([]);
      setDetails(null);
      setError("");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const current = await getCurrentWeather(options);
      if (!current?.data) {
        throw new Error("Weather data not found");
      }
      setWeather(current.data);
      if (current.data?.name) {
        setCity(current.data.name);
      }
      if (current.data?.coord) {
        setLocation({
          lat: current.data.coord.lat,
          lon: current.data.coord.lon,
        });
      }
      const nextForecast = await getForecast(options);
      setForecast(nextForecast?.data?.list || []);
      const detail = await getWeatherDetails(options);
      setDetails(detail?.data || null);
    } catch (err) {
      console.error("Weather loading error:", err);
      const message =
        err.response?.data?.message || err.message || "Unable to load weather.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setWeather(null);
      setForecast([]);
      setDetails(null);
      setLocation(null);
      setError("");
      return;
    }
    let cancelled = false;
    const loadInitialWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (cancelled) {
              return;
            }
            loadWeather({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          () => {
            if (cancelled) {
              return;
            }
            loadWeather({
              city: "Surat",
            });
          },
        );
        return;
      }
      loadWeather({
        city: "Surat",
      });
    };
    loadInitialWeather();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        forecast,
        details,
        city,
        loading,
        error,
        location,
        loadWeather,
        setWeather,
        setForecast,
        setDetails,
        setCity,
        setLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used inside WeatherProvider");
  }
  return context;
};

export default WeatherContext;
