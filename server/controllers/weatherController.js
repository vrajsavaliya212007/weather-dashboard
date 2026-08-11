import asyncHandler from "../utils/asyncHandler.js";
import WeatherHistory from "../models/WeatherHistory.js";
import { generateWeatherAlerts } from "../utils/weatherAlertGenerator.js";
import {
  getCurrentWeatherService,
  getCurrentWeatherByCoordsService,
  getForecastService,
  getForecastByCoordsService,
  getAirPollutionService,
} from "../services/weatherService.js";

export const getCurrentWeather = asyncHandler(async (req, res) => {
  const { city, lat, lon } = req.query;
  let weather;

  if (lat !== undefined && lon !== undefined) {
    weather = await getCurrentWeatherByCoordsService(lat, lon);
  } else {
    weather = await getCurrentWeatherService(city || "Surat");
  }
  if (req.user) {
    const historyData = {
      user: req.user._id,
      city: weather.name,
      country: weather.sys?.country || "",
      temperature: weather.main?.temp,
      humidity: weather.main?.humidity,
      pressure: weather.main?.pressure,
      windSpeed: weather.wind?.speed,
      weather: weather.weather?.[0]?.main || "",
      searchedAt: new Date(),
    };

    await WeatherHistory.findOneAndUpdate(
      {
        user: req.user._id,
        city: {
          $regex: `^${weather.name}$`,
          $options: "i",
        },
      },
      {
        $set: historyData,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    await generateWeatherAlerts(req.user._id, weather);
  }
  res.status(200).json({
    success: true,
    data: weather,
  });
});

export const getForecast = asyncHandler(async (req, res) => {
  const { city, lat, lon } = req.query;
  let forecast;
  if (lat !== undefined && lon !== undefined) {
    forecast = await getForecastByCoordsService(lat, lon);
  } else {
    forecast = await getForecastService(city || "Surat");
  }
  res.status(200).json({
    success: true,
    data: forecast,
  });
});

export const getWeatherDetails = asyncHandler(async (req, res) => {
  const { lat, lon, city } = req.query;
  let weather;
  if (lat !== undefined && lon !== undefined) {
    weather = await getCurrentWeatherByCoordsService(lat, lon);
  } else {
    weather = await getCurrentWeatherService(city || "Surat");
  }
  const air = await getAirPollutionService(
    weather.coord.lat,
    weather.coord.lon,
  );
  res.status(200).json({
    success: true,
    data: {
      weather,
      air,
    },
  });
});
