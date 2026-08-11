import { FaTemperatureHigh, FaTint, FaWind, FaSearch } from "react-icons/fa";
import { useSettings } from "../../context/SettingsContext";
import { convertWindSpeed, getWindSymbol } from "../../utils/weatherUnit";

function AnalyticsCards({ history = [] }) {
  const { settings, convertTemperature } = useSettings();

  if (!history.length) {
    return null;
  }

  const getNumbers = (values) => {
    return values
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value));
  };

  const average = (values) => {
    const numbers = getNumbers(values);
    if (!numbers.length) {
      return null;
    }
    return numbers.reduce((total, value) => total + value, 0) / numbers.length;
  };

  const temperatures = history.map((item) => item.temperature);
  const humidities = history.map((item) => item.humidity);
  const winds = history.map((item) => item.windSpeed);

  const averageTemperature = average(temperatures);
  const averageHumidity = average(humidities);
  const averageWind = average(winds);

  const convertedTemperature =
    averageTemperature !== null ? convertTemperature(averageTemperature) : null;
  const convertedWind =
    averageWind !== null
      ? convertWindSpeed(averageWind, settings.windSpeedUnit)
      : null;
  const temperatureSymbol = settings.temperatureUnit === "F" ? "°F" : "°C";
  const windSymbol = getWindSymbol(settings.windSpeedUnit);

  const cards = [
    {
      title: "Average Temperature",
      value:
        convertedTemperature !== null
          ? `${convertedTemperature.toFixed(1)} ${temperatureSymbol}`
          : "N/A",
      icon: <FaTemperatureHigh />,
      iconClass:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    },
    {
      title: "Average Humidity",
      value:
        averageHumidity !== null ? `${averageHumidity.toFixed(1)} %` : "N/A",
      icon: <FaTint />,
      iconClass:
        "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      title: "Average Wind",
      value:
        convertedWind !== null
          ? `${convertedWind.toFixed(1)} ${windSymbol}`
          : "N/A",
      icon: <FaWind />,
      iconClass:
        "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
    },
    {
      title: "Search Count",
      value: history.length,
      icon: <FaSearch />,
      iconClass:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {card.title}
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">
                {card.value}
              </h2>
            </div>
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg transition group-hover:scale-110 ${card.iconClass}`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsCards;
