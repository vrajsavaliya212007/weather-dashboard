import { useEffect, useState } from "react";
import { getCurrentWeather, getForecast } from "../services/weatherApi";

function useWeather(defaultCity = "Surat") {
  const [city, setCity] = useState(defaultCity);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadWeather = async (searchCity = city) => {
    try {
      setLoading(true);
      setError("");
      const current = await getCurrentWeather({
        city: searchCity,
      });
      const nextForecast = await getForecast({
        city: searchCity,
      });
      setWeather(current.data);
      setForecast(nextForecast.data.list);
      setCity(searchCity);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to fetch weather.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadWeather(defaultCity);
  }, []);
  return {
    city,
    weather,
    forecast,
    loading,
    error,
    loadWeather,
  };
}

export default useWeather;
