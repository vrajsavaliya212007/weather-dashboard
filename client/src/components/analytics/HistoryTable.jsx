import { FaHistory } from "react-icons/fa";
import { useSettings } from "../../context/SettingsContext";
import { convertWindSpeed, getWindSymbol } from "../../utils/weatherUnit";

function HistoryTable({ history = [] }) {
  const { settings, convertTemperature } = useSettings();
  const temperatureSymbol = settings.temperatureUnit === "F" ? "°F" : "°C";

  if (history.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-lg dark:bg-slate-900">
        <FaHistory className="mx-auto text-5xl text-slate-300 dark:text-slate-600" />
        <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
          No Search History
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Your weather searches will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="p-4 text-left text-sm font-bold text-slate-600 dark:text-slate-300">
              City
            </th>
            <th className="p-4 text-left text-sm font-bold text-slate-600 dark:text-slate-300">
              Temp
            </th>
            <th className="p-4 text-left text-sm font-bold text-slate-600 dark:text-slate-300">
              Humidity
            </th>
            <th className="p-4 text-left text-sm font-bold text-slate-600 dark:text-slate-300">
              Wind
            </th>
            <th className="p-4 text-left text-sm font-bold text-slate-600 dark:text-slate-300">
              Weather
            </th>
            <th className="p-4 text-left text-sm font-bold text-slate-600 dark:text-slate-300">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => {
            const temperature = Number(item.temperature);
            const wind = Number(item.windSpeed);
            const convertedTemperature = Number.isFinite(temperature)
              ? convertTemperature(temperature)
              : null;
            const convertedWind = Number.isFinite(wind)
              ? convertWindSpeed(wind, settings.windSpeedUnit)
              : null;
            return (
              <tr
                key={item._id}
                className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60"
              >
                <td className="p-4 font-semibold text-slate-900 dark:text-white">
                  {item.city || "Unknown"}
                </td>
                <td className="p-4 text-slate-700 dark:text-slate-300">
                  {convertedTemperature !== null
                    ? `${convertedTemperature.toFixed(1)} ${temperatureSymbol}`
                    : "N/A"}
                </td>
                <td className="p-4 text-slate-700 dark:text-slate-300">
                  {item.humidity !== undefined && item.humidity !== null
                    ? `${item.humidity} %`
                    : "N/A"}
                </td>
                <td className="p-4 text-slate-700 dark:text-slate-300">
                  {convertedWind !== null
                    ? `${convertedWind.toFixed(1)} ${getWindSymbol(
                        settings.windSpeedUnit,
                      )}`
                    : "N/A"}
                </td>
                <td className="p-4 capitalize text-slate-700 dark:text-slate-300">
                  {item.weather || "Unknown"}
                </td>
                <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;
