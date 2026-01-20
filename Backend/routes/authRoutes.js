import express from "express";
import { register, login } from "../controllers/authController.js";
import { AuthMiddleware } from "../middlewares/authmiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected
router.get("/profile", AuthMiddleware);

export default router;
