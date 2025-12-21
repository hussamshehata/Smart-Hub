import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

import connectDB from "./config/database.js";
import errorHandler from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";
import notFound from "./middlewares/notfound.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();

// -------------------- DB --------------------
await connectDB();
// -------------------- MIDDLEWARE --------------------
app.use(helmet());
app.use(compression());

const allowedOrigins =
    process.env.NODE_ENV === "production"
        ? ["https://smart-hub-blond.vercel.app"]
        : ["http://localhost:3000", "http://localhost:5173"];

app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(logger);

// -------------------- ROUTES --------------------
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/categories", categoryRoutes);

app.get("/", (req, res) => {
    res.send("Smart Hub backend is running 🚀");
});

// -------------------- ERROR HANDLING --------------------
app.use(notFound);
app.use(errorHandler);

export default app;
