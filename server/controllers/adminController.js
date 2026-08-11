import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";
import Favorite from "../models/Favorite.js";
import WeatherHistory from "../models/WeatherHistory.js";
import Notification from "../models/Notification.js";
import News from "../models/News.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [users, weatherSearches, favorites, notifications, news, latestUsers] =
    await Promise.all([
      User.countDocuments(),
      WeatherHistory.countDocuments(),
      Favorite.countDocuments(),
      Notification.countDocuments(),
      News.countDocuments(),
      User.find()
        .select("name email role createdAt avatar")
        .sort({
          createdAt: -1,
        })
        .limit(5),
    ]);

  res.status(200).json({
    success: true,
    data: {
      users,
      weatherSearches,
      favorites,
      notifications,
      news,
      latestUsers,
    },
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

export const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user._id.toString() === req.user._id.toString()) {
    throw new ApiError(400, "You cannot block yourself");
  }
  user.isBlocked = !user.isBlocked;
  await user.save();

  res.status(200).json({
    success: true,

    message: user.isBlocked
      ? "User blocked successfully"
      : "User unblocked successfully",

    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
    },
  });
});

export const toggleUserRole = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user._id.toString() === req.user._id.toString()) {
    throw new ApiError(400, "You cannot change your own role");
  }

  if (user.role === "admin") {
    const adminCount = await User.countDocuments({
      role: "admin",
    });
    if (adminCount <= 1) {
      throw new ApiError(400, "Cannot remove the last admin");
    }
  }
  user.role = user.role === "admin" ? "user" : "admin";
  await user.save();
  res.status(200).json({
    success: true,
    message:
      user.role === "admin"
        ? "User promoted to Admin successfully"
        : "Admin removed successfully",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
    },
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user._id.toString() === req.user._id.toString()) {
    throw new ApiError(400, "You cannot delete your own account");
  }

  if (user.role === "admin") {
    const adminCount = await User.countDocuments({
      role: "admin",
    });
    if (adminCount <= 1) {
      throw new ApiError(400, "Cannot delete the last admin");
    }
  }
  await User.findByIdAndDelete(user._id);
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

export const getAdminAnalytics = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalAdmins,
    blockedUsers,
    totalFavorites,
    totalNotifications,
    totalSearches,
    topCities,
    searchGrowth,
    userGrowth,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({
      role: "admin",
    }),
    User.countDocuments({
      isBlocked: true,
    }),
    Favorite.countDocuments(),
    Notification.countDocuments(),
    WeatherHistory.countDocuments(),
    WeatherHistory.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      },
      {
        $group: {
          _id: "$city",
          searches: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          searches: -1,
        },
      },
      {
        $limit: 10,
      },
    ]),

    WeatherHistory.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      },

      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },

          searches: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          _id: 1,
        },
      },
    ]),

    User.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          users: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $limit: 30,
      },
    ]),
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalAdmins,
      blockedUsers,
      totalFavorites,
      totalNotifications,
      totalSearches,
      topCities,
      searchGrowth,
      userGrowth,
    },
  });
});

export const sendBroadcastNotification = asyncHandler(async (req, res) => {
  const { title, message, type = "info" } = req.body;

  if (!title || !title.trim()) {
    throw new ApiError(400, "Notification title is required");
  }

  if (!message || !message.trim()) {
    throw new ApiError(400, "Notification message is required");
  }
  const allowedTypes = ["info", "warning", "alert", "success"];

  if (!allowedTypes.includes(type)) {
    throw new ApiError(400, "Invalid notification type");
  }

  const users = await User.find({
    role: {
      $in: ["user", "admin"],
    },
    "settings.notifications": true,
  }).select("_id");

  if (users.length === 0) {
    throw new ApiError(404, "No users found");
  }

  const notifications = users.map((user) => ({
    user: user._id,
    title: title.trim(),
    message: message.trim(),
    type,
    isRead: false,
  }));
  await Notification.insertMany(notifications);
  res.status(201).json({
    success: true,
    message: `Notification sent to ${users.length} users`,
    count: users.length,
  });
});

export const getAdminNews = asyncHandler(async (req, res) => {
  const news = await News.find().sort({
    createdAt: -1,
  });
  res.status(200).json({
    success: true,
    count: news.length,
    data: news,
  });
});

export const deleteAdminNews = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    throw new ApiError(404, "News not found");
  }
  await news.deleteOne();
  res.status(200).json({
    success: true,
    message: "News deleted successfully",
  });
});

export const toggleNewsStatus = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    throw new ApiError(404, "News not found");
  }
  news.isPublished = !news.isPublished;
  await news.save();
  res.status(200).json({
    success: true,
    message: news.isPublished
      ? "News published successfully"
      : "News hidden successfully",
    data: news,
  });
});
