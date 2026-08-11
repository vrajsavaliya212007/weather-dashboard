import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getApiKey = () => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENWEATHER_API_KEY is not configured");
  }
  return apiKey;
};

export const getCurrentWeatherService = async (city) => {
  const { data } = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: "metric",
      appid: getApiKey(),
    },
  });
  return data;
};

export const getCurrentWeatherByCoordsService = async (lat, lon) => {
  const { data } = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      units: "metric",
      appid: getApiKey(),
    },
  });
  return data;
};

export const getForecastService = async (city) => {
  const { data } = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      units: "metric",
      appid: getApiKey(),
    },
  });
  return data;
};

export const getForecastByCoordsService = async (lat, lon) => {
  const { data } = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      units: "metric",
      appid: getApiKey(),
    },
  });
  return data;
};

export const getAirPollutionService = async (lat, lon) => {
  const { data } = await axios.get(`${BASE_URL}/air_pollution`, {
    params: {
      lat,
      lon,
      appid: getApiKey(),
    },
  });
  return data;
};
