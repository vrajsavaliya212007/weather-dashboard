import Notification from "../models/Notification.js";

const createNotification = async (userId, title, message, type = "alert") => {
  const exists = await Notification.findOne({
    user: userId,
    title,
    type,
    isRead: false,
  });
  if (exists) {
    return;
  }
  await Notification.create({
    user: userId,
    title,
    message,
    type,
  });
};

export const generateWeatherAlerts = async (userId, weather) => {
  if (!userId || !weather) {
    return;
  }
  if (Number(weather.main?.temp) >= 40) {
    await createNotification(
      userId,
      "High Temperature Alert",
      `Current temperature is ${Math.round(
        weather.main.temp,
      )}°C. Stay hydrated and avoid direct sunlight.`,
      "warning",
    );
  }
  const weatherCondition = weather.weather?.[0]?.main?.toLowerCase();
  if (weatherCondition === "rain") {
    await createNotification(
      userId,
      "Rain Alert",
      "Rain is expected. Carry an umbrella before going outside.",
      "info",
    );
  }
  if (Number(weather.wind?.speed) >= 12) {
    await createNotification(
      userId,
      "Strong Wind Alert",
      `Wind speed is ${weather.wind.speed} m/s. Be careful while travelling.`,
      "warning",
    );
  }
  if (
    weather.visibility !== undefined &&
    weather.visibility !== null &&
    weather.visibility < 3000
  ) {
    await createNotification(
      userId,
      "Low Visibility Alert",
      "Visibility is low. Drive carefully.",
      "alert",
    );
  }
};
