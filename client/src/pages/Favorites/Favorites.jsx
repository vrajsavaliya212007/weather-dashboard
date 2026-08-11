import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaTrash,
  FaMapMarkerAlt,
  FaWind,
  FaTint,
  FaCloudSun,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useFavorites } from "../../context/FavoriteContext";
import { useWeather } from "../../context/WeatherContext";
import { useSettings } from "../../context/SettingsContext";
import { useLanguage } from "../../context/LanguageContext";
import { getCurrentWeather } from "../../services/weatherApi";
import { deleteFavorite } from "../../services/favoriteApi";
import {
  convertTemperature,
  getTemperatureSymbol,
  convertWindSpeed,
  getWindSymbol,
} from "../../utils/weatherUnit";

function Favorites() {
  const { favorites = [], loadFavorites } = useFavorites();
  const { loadWeather } = useWeather();
  const { settings } = useSettings();
  const { t } = useLanguage();
  const [weatherData, setWeatherData] = useState({});
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState(false);
  const [loadingId, setLoadingId] = useState("");

  useEffect(() => {
    const loadFavoriteWeather = async () => {
      if (!favorites || favorites.length === 0) {
        setWeatherData({});
        setLoadingWeather(false);
        return;
      }
      try {
        setLoadingWeather(true);
        setWeatherError(false);
        const results = await Promise.all(
          favorites.map(async (item) => {
            try {
              const res = await getCurrentWeather({
                city: item.city,
                saveHistory: false,
              });

              return {
                id: item._id,
                weather: res.data,
              };
            } catch (error) {
              console.error(`Unable to load weather for ${item.city}:`, error);
              return {
                id: item._id,
                weather: null,
              };
            }
          }),
        );
        const mapped = {};
        let hasError = false;
        results.forEach((item) => {
          mapped[item.id] = item.weather;
          if (!item.weather) {
            hasError = true;
          }
        });
        setWeatherData(mapped);
        setWeatherError(hasError);
      } finally {
        setLoadingWeather(false);
      }
    };

    loadFavoriteWeather();
  }, [favorites]);

  const handleDelete = async (id) => {
    try {
      setLoadingId(id);
      const res = await deleteFavorite(id);
      toast.success(res.message || t("removedFromFavorites"));
      await loadFavorites();
    } catch (error) {
      toast.error(error.response?.data?.message || t("unableToDeleteFavorite"));
    } finally {
      setLoadingId("");
    }
  };

  const handleOpen = async (city) => {
    try {
      await loadWeather({
        city,
      });
    } catch (error) {
      toast.error(t("unableToLoadWeather"));
    }
  };

  if (loadingWeather && favorites.length > 0) {
    return (
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-xl text-red-500 dark:bg-red-900/30 dark:text-red-400">              <FaHeart />
            </div>

            <h1 className="text-4xl font-black text-slate-900 dark:text-white">
              {t("favouriteLocations")}
            </h1>
          </div>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            {t("quicklyAccessSavedCities")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((item) => (
            <div
              key={item._id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg dark:bg-slate-900"
            >
              <div className="animate-pulse bg-gradient-to-r from-blue-600 to-cyan-500 p-6">
                <div className="h-6 w-40 rounded bg-white/20" />

                <div className="mt-3 h-4 w-24 rounded bg-white/20" />

                <div className="mt-8 h-16 w-32 rounded-xl bg-white/20" />
              </div>

              <div className="grid grid-cols-2 gap-4 p-6">
                <div className="h-20 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />

                <div className="h-20 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-xl text-red-500 dark:bg-red-900/30 dark:text-red-400">
            <FaHeart />
          </div>

          <h1 className="text-4xl font-black text-slate-900 dark:text-white">
            {t("favouriteLocations")}
          </h1>
        </div>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {t("quicklyAccessSavedCities")}
        </p>
      </div>

      {favorites.length === 0 && (
        <div className="rounded-3xl bg-white p-12 text-center shadow-lg dark:bg-slate-900">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <FaHeart className="text-4xl text-red-400" />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            {t("noFavouriteLocations")}
          </h2>

          <p className="mx-auto mt-3 max-w-md text-slate-500 dark:text-slate-400">
            {t("addFavouriteCitiesFromSearch")} {t("quicklyAccessTheirWeather")}
          </p>
        </div>
      )}

      {favorites.length > 0 && weatherError && (
        <div className="flex items-center gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-4 text-orange-700 dark:border-orange-900/50 dark:bg-orange-900/20 dark:text-orange-300">
          <FaExclamationTriangle />

          <p className="text-sm font-medium">
            {t("someFavouriteWeatherUnavailable")}
          </p>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((item, index) => {
            const weather = weatherData[item._id];

            return (
              <motion.div
                key={item._id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-900"
              >

                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt />

                        <h2 className="truncate text-2xl font-black">
                          {item.city}
                        </h2>
                      </div>

                      <p className="mt-2 text-sm text-white/75">
                        {item.country || "Unknown"}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={loadingId === item._id}
                      onClick={() => handleDelete(item._id)}
                      title={t("removeFavorite")}
                      className="shrink-0 rounded-xl bg-white/20 p-3 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FaTrash
                        className={
                          loadingId === item._id ? "animate-pulse" : ""
                        }
                      />
                    </button>
                  </div>

                  {weather ? (
                    <div className="mt-6 flex items-center gap-4">
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`}
                        alt={weather.weather?.[0]?.description || "Weather"}
                        className="h-20 w-20"
                      />

                      <div className="min-w-0">
                        <p className="text-5xl font-black">
                          {Math.round(
                            convertTemperature(
                              weather.main?.temp,
                              settings.temperatureUnit,
                            ),
                          )}

                          {getTemperatureSymbol(settings.temperatureUnit)}
                        </p>

                        <p className="mt-1 truncate capitalize text-white/75">
                          {weather.weather?.[0]?.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 rounded-xl bg-white/10 p-4">
                      <p className="text-sm text-white/80">
                        {t("weatherUnavailable")}
                      </p>
                    </div>
                  )}
                </div>

                {weather && (
                  <div className="grid grid-cols-2 gap-4 p-6">

                    <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                      <div className="flex items-center gap-2 text-slate-400">
                        <FaTint />

                        <span className="text-sm">{t("humidity")}</span>
                      </div>

                      <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                        {weather.main?.humidity}%
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                      <div className="flex items-center gap-2 text-slate-400">
                        <FaWind />

                        <span className="text-sm">{t("wind")}</span>
                      </div>

                      <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                        {convertWindSpeed(
                          weather.wind?.speed || 0,
                          settings.windSpeedUnit,
                        ).toFixed(1)}{" "}
                        {getWindSymbol(settings.windSpeedUnit)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="px-6 pb-6">
                  <button
                    type="button"
                    onClick={() => handleOpen(item.city)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition hover:opacity-90"
                  >
                    <FaCloudSun />
                    {t("viewWeather")}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Favorites;
