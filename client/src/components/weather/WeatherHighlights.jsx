import { getTemperatureSymbol } from "../../utils/weatherUnit";
import { useSettings } from "../../context/SettingsContext";
import { useLanguage } from "../../context/LanguageContext";

function WeatherHighlights({ weather }) {
  const { settings, convertTemperature } = useSettings();
  if (!weather) return null;
  const minTemperature = convertTemperature(weather.main.temp_min);
  const maxTemperature = convertTemperature(weather.main.temp_max);
  const { t } = useLanguage();
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">{t("sunrise")}</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
        </h2>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">{t("sunset")}</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
        </h2>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">{t("minTemp")}</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          {Math.round(minTemperature)}
          {getTemperatureSymbol(settings.temperatureUnit)}
        </h2>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">{t("maxTemp")}</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          {Math.round(maxTemperature)}
          {getTemperatureSymbol(settings.temperatureUnit)}
        </h2>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">{t("clouds")}</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          {weather.clouds.all}%
        </h2>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">
          {t("windDirection")}
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          {weather.wind.deg}°
        </h2>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">Latitude</p>
        <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
          {weather.coord.lat}
        </h2>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">Longitude</p>
        <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
          {weather.coord.lon}
        </h2>
      </div>
    </div>
  );
}

export default WeatherHighlights;
