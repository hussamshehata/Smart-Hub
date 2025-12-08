import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/database.js";
import errorHandler from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";
import notFound from "./middlewares/notfound.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();
connectDB();

const app = express();

// -------------------- MIDDLEWARE --------------------
app.use(
    cors({
        origin: "https://smart-hub-blond.vercel.app/", // ⚠️ Replace with your actual frontend URL
        credentials: true, // ✅ Add this to match withCredentials: true
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(logger); //  logger should be BEFORE routes

// -------------------- ROUTES --------------------
app.use("/auth", authRoutes);
app.use("/services/users", userRoutes);
app.use("/services/cart", cartRoutes);

app.get("/", (req, res) => {
    res.send("Smart Hub backend is running 🚀");
});

// -------------------- NOT FOUND --------------------
app.use(notFound);

// -------------------- ERROR HANDLER --------------------
app.use(errorHandler); //  MUST be the last

// -------------------- START SERVER --------------------
export default app;

