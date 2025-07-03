// routes/authRoutes.js
import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import authenticateUser from "../middleware/authMiddleware.js"; // 🔐 Import middleware

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔐 Protected route example
router.get("/profile", authenticateUser, (req, res) => {
  res.status(200).json({
    message: "Access granted to protected route",
    user: req.user, // decoded JWT payload (e.g., { id, email })
  });
});

export default router;
// routes/authRoutes.js