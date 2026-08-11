export const convertTemperature = (temperature, unit) => {
  if (unit === "F") {
    return (temperature * 9) / 5 + 32;
  }
  return temperature;
};

export const convertWindSpeed = (speed, unit) => {
  if (unit === "km/h") {
    return speed * 3.6;
  }
  if (unit === "mph") {
    return speed * 2.23694;
  }
  return speed;
};

export const getTemperatureSymbol = (unit) => {
  return unit === "F" ? "°F" : "°C";
};

export const getWindSymbol = (unit) => {
  return unit === "km/h" ? "km/h" : unit === "mph" ? "mph" : "m/s";
};
