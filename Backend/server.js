import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

import connectDB from "./config/database.js";
import errorHandler from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";
import notFound from "./middlewares/notfound.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// -------------------- CONFIGURATION --------------------
// Load environment variables FIRST before anything else
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET", "PORT"];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
    console.error(`❌ Missing required environment variables: ${missingVars.join(", ")}`);
    process.exit(1); // Exit if critical config is missing
}

const app = express();

// -------------------- DATABASE --------------------
await connectDB();

// -------------------- SECURITY MIDDLEWARE --------------------
// 1. Helmet: Sets secure HTTP headers
app.use(
    helmet({
        contentSecurityPolicy: process.env.NODE_ENV === "production",
        crossOriginEmbedderPolicy: false, // Needed for some CDNs
    })
);

// 2. Rate Limiting: Prevent brute force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === "production" ? 100 : 1000, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/api", limiter);

// Stricter limit for auth routes (login/register)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // Only 5 login attempts per 15 minutes
    skipSuccessfulRequests: true,
});
app.use("/api/v1/auth/login", authLimiter);
app.use("/api/v1/auth/register", authLimiter);

// 3. NoSQL Injection Protection
app.use(mongoSanitize()); // Removes $ and . from user input

// -------------------- CORS --------------------
const allowedOrigins =
    process.env.NODE_ENV === "production"
        ? process.env.ALLOWED_ORIGINS?.split(",") || ["https://smart-hub-blond.vercel.app"]
        : ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (mobile apps, Postman, etc.)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // Allow cookies
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// -------------------- PERFORMANCE --------------------
app.use(compression()); // Gzip compression

// -------------------- PARSING --------------------
app.use(express.json({ limit: "10mb" })); // Parse JSON bodies (with size limit)
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Parse URL-encoded bodies

// -------------------- LOGGING --------------------
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev")); // Colored logs for development
} else {
    app.use(morgan("combined")); // Apache-style logs for production
}

app.use(logger); // Your custom logger

// -------------------- ROUTES --------------------
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/orders", orderRoutes);

// Health check route
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Smart Hub backend is running 🚀",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
    });
});

// Root route redirect
app.get("/", (req, res) => {
    res.redirect("/health");
});

// -------------------- ERROR HANDLING --------------------
app.use(notFound); // 404 handler
app.use(errorHandler); // Global error handler

// -------------------- GRACEFUL SHUTDOWN --------------------
process.on("SIGTERM", () => {
    console.log("👋 SIGTERM received. Shutting down gracefully...");
    process.exit(0);
});

process.on("unhandledRejection", (err) => {
    console.error("❌ Unhandled Rejection:", err);
    process.exit(1);
});

export default app;