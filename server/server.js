import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js"; // import database connection
import errorHandler from "./utils/errorHandler.js";
import { logger } from "./middleware/logger.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config(); //  load .env variables
await connectDB();    // connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use(logger);
app.use("/api/users", userRoutes);

// Basic route to check server status
app.get("/", (req, res) => {
    res.send("Smart Hub backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
