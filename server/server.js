import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js"; // import database connection

dotenv.config(); //  load .env variables
connectDB();     // connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Smart Hub backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
