import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getFavorites,
  addFavorite,
  deleteFavorite,
} from "../controllers/favoriteController.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getFavorites);
router.post("/", addFavorite);
router.delete("/:id", deleteFavorite);

export default router;
