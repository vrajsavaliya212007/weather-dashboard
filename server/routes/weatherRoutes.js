import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getCurrentWeather,
  getForecast,
  getWeatherDetails,
} from "../controllers/weatherController.js";
const router = express.Router();

router.get("/current", authMiddleware, getCurrentWeather);
router.get("/forecast", authMiddleware, getForecast);
router.get("/details", authMiddleware, getWeatherDetails);

export default router;
