import Notification from "../models/Notification.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    user: req.user._id,
  }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    data: notifications,
  });
});

export const createNotification = asyncHandler(async (req, res) => {
  const { title, message, type } = req.body;

  if (!title || !message) {
    throw new ApiError(400, "Title and message are required");
  }

  const notification = await Notification.create({
    user: req.user._id,
    title,
    message,
    type: type || "info",
  });

  res.status(201).json({
    success: true,
    message: "Notification created successfully",
    data: notification,
  });
});

export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  notification.isRead = true;

  await notification.save();

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
    data: notification,
  });
});

export const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    {
      user: req.user._id,
      isRead: false,
    },
    {
      $set: {
        isRead: true,
      },
    },
  );

  res.status(200).json({
    success: true,
    message: "All notifications marked as read",
  });
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  await Notification.deleteOne({
    _id: notification._id,
  });

  res.status(200).json({
    success: true,
    message: "Notification deleted successfully",
  });
});
