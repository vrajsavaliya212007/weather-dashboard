import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
function WeatherMap({ weather }) {
  if (!weather) return null;

  return (
    <MapContainer
      center={[weather.coord.lat, weather.coord.lon]}
      zoom={11}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded-3xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[weather.coord.lat, weather.coord.lon]}>
        <Popup>
          <div className="space-y-2">
            <h2 className="font-bold text-lg">{weather.name}</h2>
            <p>🌡 Temperature : {Math.round(weather.main.temp)}°C</p>
            <p>💧 Humidity : {weather.main.humidity}%</p>
            <p>🌥 Condition : {weather.weather[0].description}</p>
            <p>💨 Wind : {weather.wind.speed} m/s</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default WeatherMap;
