import Favorite from "../models/Favorite.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({
    user: req.user._id,
  }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    success: true,
    data: favorites,
  });
});

export const addFavorite = asyncHandler(async (req, res) => {
  const { city, country, latitude, longitude } = req.body;
  if (!city) {
    throw new ApiError(400, "City is required");
  }
  const exists = await Favorite.findOne({
    user: req.user._id,
    city: city.trim(),
  });
  if (exists) {
    throw new ApiError(400, "City already exists in favourites");
  }
  const favorite = await Favorite.create({
    user: req.user._id,
    city: city.trim(),
    country,
    latitude,
    longitude,
  });
  res.status(201).json({
    success: true,
    message: "Location added successfully",
    data: favorite,
  });
});

export const deleteFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!favorite) {
    throw new ApiError(404, "Favourite location not found");
  }
  await Favorite.deleteOne({
    _id: favorite._id,
  });
  res.status(200).json({
    success: true,
    message: "Location removed successfully",
  });
});
