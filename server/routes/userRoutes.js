import express from "express";
import updateUser, { getMe, getUserById, getAllUsers, deleteUser } from "../controllers/userController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";



const router = express.Router();


// get user profile
router.get("/me", AuthMiddleware, getMe);




router.get("/", AuthMiddleware, adminMiddleware, getAllUsers);
router.get("/:id", AuthMiddleware, adminMiddleware, getUserById);
router.put("/:id", AuthMiddleware, adminMiddleware, updateUser);
router.delete("/:id", AuthMiddleware, adminMiddleware, deleteUser);

export default router;
