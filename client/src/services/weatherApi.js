import api from "./axios";

export const getCurrentWeather = async ({
  city,
  lat,
  lon,
  saveHistory,
} = {}) => {
  const res = await api.get("/weather/current", {
    params: {
      city,
      lat,
      lon,
      saveHistory,
    },
  });
  return res.data;
};

export const getForecast = async ({ city, lat, lon } = {}) => {
  const res = await api.get("/weather/forecast", {
    params: {
      city,
      lat,
      lon,
    },
  });
  return res.data;
};

export const getWeatherDetails = async ({ city, lat, lon } = {}) => {
  const res = await api.get("/weather/details", {
    params: {
      city,
      lat,
      lon,
    },
  });
  return res.data;
};
