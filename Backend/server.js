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
import categoryRoutes from './routes/categoryRoutes.js';


dotenv.config();

const app = express();

connectDB().catch(err => console.error('DB Error:', err));



// -------------------- MIDDLEWARE --------------------
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:5173",
            "https://smart-hub-blond.vercel.app"
        ],
        credentials: true, // Changed to true to match vercel.json
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Add this AFTER the cors middleware to handle preflight
app.options('*', cors());

app.use(express.json());
app.use(morgan("dev"));
app.use(logger); //  logger should be BEFORE routes

// -------------------- ROUTES --------------------
app.use("/auth", authRoutes);
app.use("/auth/users", userRoutes);
app.use("/auth/cart", cartRoutes);
app.use('/api/categories', categoryRoutes);

app.get("/", (req, res) => {
    res.send("Smart Hub backend is running 🚀");
});

// -------------------- NOT FOUND --------------------
app.use(notFound);

// -------------------- ERROR HANDLER --------------------
app.use(errorHandler); //  MUST be the last

// -------------------- START SERVER --------------------
export default app;

