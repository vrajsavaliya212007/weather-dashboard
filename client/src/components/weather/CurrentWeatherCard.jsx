import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { addFavorite } from "../../services/favoriteApi";
import { useFavorites } from "../../context/FavoriteContext";
import {
  getTemperatureSymbol,
  convertWindSpeed,
  getWindSymbol,
} from "../../utils/weatherUnit";
import { useLanguage } from "../../context/LanguageContext";
import { useSettings } from "../../context/SettingsContext";

function CurrentWeatherCard({ weather, loading }) {
  const { loadFavorites } = useFavorites();
  const { settings, convertTemperature } = useSettings();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center rounded-3xl bg-white shadow-lg">
        <p className="text-xl font-semibold text-slate-500">
          Loading weather...
        </p>
      </div>
    );
  }
  if (!weather) return null;
  const temperature = convertTemperature(weather.main.temp);
  const windSpeed = convertWindSpeed(
    weather.wind.speed,
    settings.windSpeedUnit,
  );

  const handleFavorite = async () => {
    try {
      const res = await addFavorite({
        city: weather.name,
        country: weather.sys.country,
        latitude: weather.coord.lat,
        longitude: weather.coord.lon,
      });
      toast.success(res.message);
      loadFavorites();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to add favourite");
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-3xl bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 p-8 text-white shadow-2xl"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold">{weather.name}</h2>
          <p className="mt-3 capitalize text-blue-50">
            {weather.weather[0].description}
          </p>
          <div className="mt-6 flex items-end gap-2">
            <h1 className="text-7xl font-black">{Math.round(temperature)}</h1>
            <span className="mb-3 text-4xl font-bold">
              {getTemperatureSymbol(settings.temperatureUnit)}
            </span>
          </div>
          <p className="mt-2 text-sm text-blue-100">
            Feels like {Math.round(convertTemperature(weather.main.feels_like))}
            {getTemperatureSymbol(settings.temperatureUnit)}
          </p>
        </div>
        <button
          onClick={handleFavorite}
          className="rounded-full bg-white/20 p-4 transition hover:bg-white/30"
          title="Add to Favourite"
        >
          <FaHeart className="text-2xl text-red-300" />
        </button>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
          <p>{t("humidity")}</p>
          <h3 className="mt-2 text-2xl font-bold">{weather.main.humidity}%</h3>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
          <p>{t("wind")}</p>
          <h3 className="mt-2 text-2xl font-bold">
            {windSpeed.toFixed(1)} {getWindSymbol(settings.windSpeedUnit)}
          </h3>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
          <p>{t("pressure")}</p>
          <h3 className="mt-2 text-2xl font-bold">
            {weather.main.pressure} hPa
          </h3>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
          <p>{t("visibility")}</p>
          <h3 className="mt-2 text-2xl font-bold">
            {(weather.visibility / 1000).toFixed(1)} km
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export default CurrentWeatherCard;
