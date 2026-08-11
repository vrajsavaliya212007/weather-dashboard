import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  getProfile,
  updateProfile,
  uploadProfileImage,
  getSettings,
  updateSettings,
} from "../controllers/userController.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post("/profile/upload", upload.single("avatar"), uploadProfileImage);
router.get("/settings", getSettings);
router.put("/settings", updateSettings);

export default router;
