import asyncHandler from "../utils/asyncHandler.js";
import WeatherHistory from "../models/WeatherHistory.js";

export const getAnalytics = asyncHandler(async (req, res) => {
  const history = await WeatherHistory.find({
    user: req.user._id,
  })
    .sort({ createdAt: -1 })
    .limit(20);

  res.status(200).json({
    success: true,
    data: history,
  });
});
