import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaRedo, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { useWeather } from "../../context/WeatherContext";
import { useSettings } from "../../context/SettingsContext";
import { useLanguage } from "../../context/LanguageContext";
import CurrentWeatherCard from "../../components/weather/CurrentWeatherCard";
import ForecastCard from "../../components/weather/ForecastCard";
import WeatherHighlights from "../../components/weather/WeatherHighlights";

function Weather() {
  const navigate = useNavigate();
  const { weather, forecast, details, loading, error, location, loadWeather } =
    useWeather();
  const { settings, convertTemperature } = useSettings();
  const { t } = useLanguage();

  const handleRefresh = () => {
    if (location) {
      loadWeather({
        lat: location.lat,
        lon: location.lon,
      });

      return;
    }

    if (weather?.name) {
      loadWeather({
        city: weather.name,
      });

      return;
    }

    loadWeather({
      city: "Surat",
    });
  };

  const handleSearch = () => {
    navigate("/search");
  };

  if (error && !weather) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl dark:bg-slate-900">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-2xl text-red-600 dark:bg-red-900/30 dark:text-red-400">
            !
          </div>

          <h1 className="mt-5 text-2xl font-black text-slate-900 dark:text-white">
            {t("unableToLoadWeather")}
          </h1>

          <p className="mt-3 text-slate-500 dark:text-slate-400">{error}</p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={handleRefresh}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <FaRedo />
              {t("tryAgain")}
            </button>

            <button
              type="button"
              onClick={handleSearch}
              className="flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <FaSearch />
              {t("search")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading && !weather) {
    return (
      <div className="space-y-8">
        <div className="h-16 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-80 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({
            length: 8,
          }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
          >
            <FaArrowLeft />
            {t("backToDashboard")}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              <FaMapMarkerAlt />
            </div>

            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                {t("weatherDetails")}
              </h1>

              <p className="mt-1 text-slate-500 dark:text-slate-400">
                {t("detailedWeatherInformation")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSearch}
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <FaSearch />
            {t("searchCityButton")}
          </button>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaRedo className={loading ? "animate-spin" : ""} />

            {loading ? t("refreshing") : t("refresh")}
          </button>
        </div>
      </div>

      <section>
        <CurrentWeatherCard weather={weather} loading={loading} />
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {t("currentLocation")}
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
              {weather.name}

              {weather.sys?.country && (
                <span className="ml-2 text-lg font-semibold text-slate-400">
                  {weather.sys.country}
                </span>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm sm:flex sm:gap-8">
            <div>
              <p className="text-slate-400">{t("latitude")}</p>

              <p className="mt-1 font-bold text-slate-900 dark:text-white">
                {weather.coord?.lat}
              </p>
            </div>

            <div>
              <p className="text-slate-400">{t("longitude")}</p>

              <p className="mt-1 font-bold text-slate-900 dark:text-white">
                {weather.coord?.lon}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {t("weatherHighlights")}
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t("detailedAtmosphericConditions")}
          </p>
        </div>

        <WeatherHighlights weather={weather} />
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {t("hourlyForecast")}
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t("upcomingWeatherConditions")}
          </p>
        </div>

        <ForecastCard forecast={forecast} />
      </section>

      {details && (
        <section className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {t("additionalDetails")}
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t("additionalWeatherInformation")}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DetailCard
              label={t("temperature")}
              value={`${Math.round(
                convertTemperature(weather.main?.temp),
              )}${settings.temperatureUnit === "F" ? "°F" : "°C"}`}
            />

            <DetailCard
              label={t("feelsLike")}
              value={`${Math.round(
                convertTemperature(weather.main?.feels_like),
              )}${settings.temperatureUnit === "F" ? "°F" : "°C"}`}
            />

            <DetailCard
              label={t("humidity")}
              value={`${weather.main?.humidity}%`}
            />

            <DetailCard
              label={t("pressure")}
              value={`${weather.main?.pressure} hPa`}
            />
          </div>
        </section>
      )}

      <section className="rounded-3xl bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black">{t("checkAnotherCity")}</h2>

            <p className="mt-2 text-sm text-blue-100">
              {t("searchWeatherWorldwide")}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
          >
            <FaSearch />
            {t("searchWeather")}
          </button>
        </div>
      </section>
    </div>
  );
}

function DetailCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

export default Weather;
