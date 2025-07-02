// routes/userRoutes.js
import express from "express";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/userController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/favorites", authenticateUser, addFavorite);
router.get("/favorites", authenticateUser, getFavorites);
router.delete("/favorites/:movieId", authenticateUser, removeFavorite);

export default router;
// routes/userRoutes.js