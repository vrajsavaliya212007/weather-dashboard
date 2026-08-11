import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaHistory,
  FaCloudSun,
} from "react-icons/fa";
import { useWeather } from "../../context/WeatherContext";
import { useLanguage } from "../../context/LanguageContext";
import CurrentWeatherCard from "../../components/weather/CurrentWeatherCard";
import ForecastCard from "../../components/weather/ForecastCard";
import WeatherHighlights from "../../components/weather/WeatherHighlights";
const RECENT_SEARCHES_KEY = "skycast_recent_searches";

function Search() {
  const { weather, forecast, loading, error, loadWeather } = useWeather();
  const { t } = useLanguage();
  const [searchCity, setSearchCity] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  const popularCities = [
    "Surat",
    "Ahmedabad",
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Dubai",
    "London",
    "New York",
  ];

  const getUniqueCities = (cities = []) => {
    const uniqueCities = [];
    const seen = new Set();
    cities.forEach((city) => {
      if (typeof city !== "string") {
        return;
      }
      const trimmedCity = city.trim();
      if (!trimmedCity) {
        return;
      }
      const normalizedCity = trimmedCity.toLowerCase();
      if (!seen.has(normalizedCity)) {
        seen.add(normalizedCity);
        uniqueCities.push(trimmedCity);
      }
    });
    return uniqueCities.slice(0, 10);
  };

  useEffect(() => {
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!saved) {
      return;
    }
    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) {
        return;
      }
      const uniqueCities = getUniqueCities(parsed);
      setRecentSearches(uniqueCities);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(uniqueCities));
    } catch (error) {
      console.error("Unable to load recent searches:", error);
      setRecentSearches([]);
    }
  }, []);

  const saveRecentSearch = (city) => {
    const normalizedCity = city.trim();
    if (!normalizedCity) {
      return;
    }
    const updated = getUniqueCities([normalizedCity, ...recentSearches]);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    const city = searchCity.trim();
    if (!city) {
      toast.error(t("pleaseEnterCity"));
      return;
    }
    try {
      await loadWeather({
        city,
      });
      saveRecentSearch(city);
    } catch (error) {
      console.error("Search weather error:", error);
    }
  };

  const handleCityClick = async (city) => {
    setSearchCity(city);
    try {
      await loadWeather({
        city,
      });
      saveRecentSearch(city);
    } catch (error) {
      console.error("Unable to load city weather:", error);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    toast.success(t("recentSearchesCleared"));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">
          {t("searchWeather")}
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {t("searchCitiesWorldwide")}
        </p>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900"
      >
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-4 md:flex-row"
        >
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder={t("searchCity")}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-bold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? t("searching") : t("searchWeather")}
          </button>
        </form>

        {error && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}
      </motion.div>

      <section>
        <div className="mb-4 flex items-center gap-3">
          <FaMapMarkerAlt className="text-blue-600" />

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t("popularCities")}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {popularCities.map((city) => (
            <motion.button
              key={city}
              type="button"
              whileHover={{
                y: -4,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() => handleCityClick(city)}
              disabled={loading}
              className="flex items-center gap-4 rounded-2xl bg-white p-5 text-left shadow-md transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-900"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                <FaCloudSun />
              </div>

              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  {city}
                </p>

                <p className="text-sm text-slate-400">{t("viewWeather")}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>
      <section className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <FaHistory />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t("recentSearches")}
              </h2>

              <p className="text-sm text-slate-400">
                {t("recentlySearchedCities")}
              </p>
            </div>
          </div>

          {recentSearches.length > 0 && (
            <button
              type="button"
              onClick={clearRecentSearches}
              className="text-sm font-semibold text-red-500 transition hover:text-red-600"
            >
              {t("clearHistory")}
            </button>
          )}
        </div>

        {recentSearches.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
            <FaHistory className="mx-auto mb-3 text-3xl text-slate-300" />

            <p className="text-slate-500 dark:text-slate-400">
              {t("noRecentSearches")}
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {recentSearches.map((city) => (
              <button
                key={city.toLowerCase()}
                type="button"
                onClick={() => handleCityClick(city)}
                disabled={loading}
                className="rounded-xl bg-slate-100 px-4 py-2 font-medium text-slate-700 transition hover:bg-blue-100 hover:text-blue-700 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-900/40 dark:hover:text-blue-300"
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </section>

      {(weather || loading) && (
        <section>
          <CurrentWeatherCard weather={weather} loading={loading} />
        </section>
      )}

      {weather && (
        <section>
          <ForecastCard forecast={forecast} />
        </section>
      )}

      {weather && (
        <section>
          <WeatherHighlights weather={weather} />
        </section>
      )}
    </div>
  );
}

export default Search;
