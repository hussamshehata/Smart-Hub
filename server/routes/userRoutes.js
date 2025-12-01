import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// get user profile
router.get("/me", protect, getMe);

export default router;
