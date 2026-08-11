import WeatherMap from "../map/WeatherMap";

function DashboardMap({ weather }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Interactive Weather Map</h2>
        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          Live
        </span>
      </div>
      <WeatherMap weather={weather} />
    </div>
  );
}

export default DashboardMap;
