import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, phone, bio, city, country } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (name !== undefined) {
    if (!name.trim()) {
      throw new ApiError(400, "Name is required");
    }

    user.name = name.trim();
  }

  if (email !== undefined) {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      throw new ApiError(400, "Email is required");
    }

    if (normalizedEmail !== user.email) {
      const existingUser = await User.findOne({
        email: normalizedEmail,
        _id: {
          $ne: user._id,
        },
      });

      if (existingUser) {
        throw new ApiError(400, "Email already exists");
      }
    }

    user.email = normalizedEmail;
  }

  if (phone !== undefined) {
    user.phone = phone.trim();
  }

  if (bio !== undefined) {
    user.bio = bio.trim();
  }

  if (city !== undefined) {
    user.city = city.trim();
  }

  if (country !== undefined) {
    user.country = country.trim();
  }
  await user.save();
  const updatedUser = await User.findById(user._id).select("-password");
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});

export const uploadProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Image is required");
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.cloudinaryId) {
    await cloudinary.uploader.destroy(user.cloudinaryId);
  }

  const uploadedImage = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "skycast/profile",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });

  user.avatar = uploadedImage.secure_url;
  user.cloudinaryId = uploadedImage.public_id;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile image uploaded successfully",
    data: {
      avatar: user.avatar,
    },
  });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const { theme, temperatureUnit, windSpeedUnit, language, notifications } =
    req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const updateData = {};

  if (theme !== undefined) {
    updateData["settings.theme"] = theme;
  }
  if (temperatureUnit !== undefined) {
    updateData["settings.temperatureUnit"] = temperatureUnit;
  }
  if (windSpeedUnit !== undefined) {
    updateData["settings.windSpeedUnit"] = windSpeedUnit;
  }
  if (language !== undefined) {
    updateData["settings.language"] = language;
  }
  if (notifications !== undefined) {
    updateData["settings.notifications"] = notifications;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: updateData,
    },
    {
      new: true,
      runValidators: true,
    },
  ).select("-password");
  res.status(200).json({
    success: true,
    message: "Settings updated successfully",
    data: updatedUser.settings,
  });
});

export const getSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("settings");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res.status(200).json({
    success: true,
    data: user.settings,
  });
});
