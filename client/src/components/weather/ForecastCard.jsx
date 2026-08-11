import { getTemperatureSymbol } from "../../utils/weatherUnit";
import { useSettings } from "../../context/SettingsContext";
import { useLanguage } from "../../context/LanguageContext";

function ForecastCard({ forecast = [] }) {
  const { settings, convertTemperature } = useSettings();
  const { t } = useLanguage();
  const items = forecast.slice(0, 8);

  return (
    <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900">
      <div className="mb-6">
        <h2>{t("hourlyForecast")}</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Weather conditions for the upcoming hours.
        </p>
      </div>
      {items.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 p-10 text-center dark:bg-slate-800">
          <p className="font-semibold text-slate-500 dark:text-slate-400">
            Forecast data is not available.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => {
            const temperature = convertTemperature(item.main.temp);
            return (
              <div
                key={item.dt}
                className="rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
              >
                <p className="font-semibold text-slate-700 dark:text-slate-200">
                  {new Date(item.dt * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                  className="mx-auto h-20 w-20"
                />
                <h3 className="text-center text-2xl font-bold text-slate-900 dark:text-white">
                  {Math.round(temperature)}
                  {getTemperatureSymbol(settings.temperatureUnit)}
                </h3>
                <p className="mt-2 text-center text-sm capitalize text-slate-500 dark:text-slate-400">
                  {item.weather[0].description}
                </p>
                <div className="mt-4 text-center text-xs text-slate-400">
                  Humidity {item.main.humidity}%
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ForecastCard;
