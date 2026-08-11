import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getNotifications,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getNotifications);
router.post("/", createNotification);
router.put("/read-all", markAllAsRead);
router.put("/:id/read", markAsRead);
router.delete("/:id", deleteNotification);

export default router;
