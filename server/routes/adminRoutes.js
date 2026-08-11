import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  getDashboardStats,
  getAllUsers,
  toggleUserRole,
  toggleUserStatus,
  deleteUser,
  getAdminAnalytics,
  sendBroadcastNotification,
  getAdminNews,
  deleteAdminNews,
  toggleNewsStatus,
} from "../controllers/adminController.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/dashboard", adminMiddleware, getDashboardStats);
router.get("/users", adminMiddleware, getAllUsers);
router.put("/users/:id/toggle-status", adminMiddleware, toggleUserStatus);
router.put("/users/:id/toggle-role", adminMiddleware, toggleUserRole);
router.delete("/users/:id", adminMiddleware, deleteUser);
router.get("/analytics", adminMiddleware, getAdminAnalytics);
router.post(
  "/notifications/broadcast",
  adminMiddleware,
  sendBroadcastNotification,
);
router.get("/news", adminMiddleware, getAdminNews);
router.delete("/news/:id", adminMiddleware, deleteAdminNews);
router.put("/news/:id/toggle", adminMiddleware, toggleNewsStatus);

export default router;
