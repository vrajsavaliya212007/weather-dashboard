import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import { getWeatherNews } from "../controllers/newsController.js";

const router = express.Router();

router.get("/", authMiddleware, getWeatherNews);

export default router;
