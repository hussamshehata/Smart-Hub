import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/database.js";
import errorHandler from "./middleware/errorHandler.js";
import { logger } from "./middleware/logger.js";
import notFound from "./middleware/notFound.js";

import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();
await connectDB();

const app = express();

// -------------------- MIDDLEWARE --------------------
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger); //  logger should be BEFORE routes

// -------------------- ROUTES --------------------
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`✅ Server running on port ${PORT}`)
);
