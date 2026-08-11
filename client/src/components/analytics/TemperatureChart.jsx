import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSettings } from "../../context/SettingsContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

function TemperatureChart({ history = [] }) {
  const { settings, convertTemperature } = useSettings();

  const chartHistory = history
    .filter(
      (item) => item?.createdAt && Number.isFinite(Number(item.temperature)),
    )
    .slice()
    .reverse();

  const temperatureSymbol = settings.temperatureUnit === "F" ? "°F" : "°C";

  const labels = chartHistory.map((item) =>
    new Date(item.createdAt).toLocaleDateString([], {
      day: "2-digit",
      month: "short",
    }),
  );

  const temperatures = chartHistory.map((item) =>
    Number(convertTemperature(item.temperature)),
  );

  const data = {
    labels,
    datasets: [
      {
        label: `Temperature ${temperatureSymbol}`,
        data: temperatures,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Temperature: ${context.parsed.y.toFixed(
              1,
            )}${temperatureSymbol}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `${value}${temperatureSymbol}`,
        },
      },
    },
  };

  if (chartHistory.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800">
        <div className="text-center">
          <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
            No temperature data
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Temperature history will appear here after weather searches.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[350px] w-full">
      <Line data={data} options={options} />
    </div>
  );
}

export default TemperatureChart;
