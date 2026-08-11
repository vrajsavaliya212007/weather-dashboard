import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaRedo,
  FaSearch,
  FaCloudSun,
} from "react-icons/fa";
import { useWeather } from "../../context/WeatherContext";
import { useFavorites } from "../../context/FavoriteContext";
import { useLanguage } from "../../context/LanguageContext";
import CurrentWeatherCard from "../../components/weather/CurrentWeatherCard";
import ForecastCard from "../../components/weather/ForecastCard";
import WeatherHighlights from "../../components/weather/WeatherHighlights";

function Dashboard() {
  const navigate = useNavigate();

  const { weather, forecast, loading, error, location, loadWeather } =
    useWeather();
  const { favorites = [] } = useFavorites();

  const { t } = useLanguage();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleRefresh = async () => {
    try {
      if (location) {
        await loadWeather({
          lat: location.lat,
          lon: location.lon,
        });
      } else if (weather?.name) {
        await loadWeather({
          city: weather.name,
        });
      } else {
        await loadWeather({
          city: "Surat",
        });
      }
    } catch (error) {
      console.error("Unable to refresh weather:", error);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error(t("geolocationNotSupported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await loadWeather({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        } catch (error) {
          console.error("Unable to load current location:", error);
          toast.error(t("unableToLoadLocationWeather"));
        }
      },
      () => {
        toast.error(t("unableToAccessLocation"));
      },
    );
  };

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 p-6 text-white shadow-xl sm:p-8 lg:p-10">
        <div className="relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                <FaCloudSun />
                {t("dashboard")}
              </div>

              <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                {t("goodToSeeYou")}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                {t("dashboardDescription")}
              </p>

              {weather?.name && (
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-white">
                  <FaMapMarkerAlt />

                  <span>
                    {weather.name}
                    {weather.sys?.country ? `, ${weather.sys.country}` : ""}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCurrentLocation}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaMapMarkerAlt />
                {t("myLocation")}
              </button>

              <button
                type="button"
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 shadow-lg transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaRedo className={loading ? "animate-spin" : ""} />

                {loading ? t("loading") : t("refresh")}
              </button>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 right-20 h-72 w-72 rounded-full bg-white/5" />
        <div className="absolute bottom-6 left-1/2 hidden h-32 w-32 -translate-x-1/2 rounded-full bg-white/5 blur-2xl lg:block" />
      </section>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold">{t("unableToLoadWeather")}</p>

              <p className="mt-1 text-sm">{error}</p>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={loading}
              className="rounded-xl bg-red-600 px-4 py-2.5 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              {t("tryAgain")}
            </button>
          </div>
        </div>
      )}

      {loading && !weather && <DashboardSkeleton />}

      {weather && (
        <>
          <section>
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  {t("currentWeather")}
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {t("liveWeatherConditions")}
                </p>
              </div>

              {location && (
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <FaMapMarkerAlt />

                  <span>
                    {location.lat.toFixed(3)}, {location.lon.toFixed(3)}
                  </span>
                </div>
              )}
            </div>

            <CurrentWeatherCard weather={weather} loading={loading} />
          </section>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickStat
              label={t("savedLocations")}
              value={favorites.length}
              icon={<FaHeart />}
              onClick={() => navigate("/favorites")}
            />

            <QuickStat
              label={t("forecast")}
              value={`${forecast.length} ${t("updates")}`}
              icon={<FaCloudSun />}
              onClick={() =>
                document.getElementById("forecast")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            />

            <QuickStat
              label={t("searchWeather")}
              value={t("exploreCities")}
              icon={<FaSearch />}
              onClick={() => navigate("/search")}
            />

            <QuickStat
              label={t("weatherNews")}
              value={t("latestUpdates")}
              icon={<FaCloudSun />}
              onClick={() => navigate("/news")}
            />
          </section>

          <section>
            <div className="mb-5">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {t("weatherHighlights")}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {t("detailedAtmosphericInformation")}
              </p>
            </div>

            <WeatherHighlights weather={weather} />
          </section>

          <section id="forecast">
            <div className="mb-5">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {t("forecast")}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {t("upcomingWeatherConditions")}
              </p>
            </div>

            <ForecastCard forecast={forecast} />
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  {t("exploreMoreWeather")}
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {t("exploreMoreWeatherDescription")}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/search")}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
                >
                  <FaSearch />
                  {t("searchCity")}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/favorites")}
                  className="flex items-center gap-2 rounded-xl bg-red-50 px-5 py-3 font-bold text-red-600 transition hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
                >
                  <FaHeart />
                  {t("favorites")}
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function QuickStat({ label, value, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-2 text-lg font-black text-slate-900 dark:text-white">
            {value}
          </p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
          {icon}
        </div>
      </div>
    </button>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-80 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
          />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
      <div className="h-96 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}

export default Dashboard;
