import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// -------------------- REGISTER --------------------
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        // FIX: Normalize email (trim + lowercase)
        const normalizedEmail = email.trim().toLowerCase();

        const existing = await User.findOne({ email: normalizedEmail });
        if (existing) {
            return res.status(400).json({ message: "Email already used" });
        }

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password, // Will be hashed by pre-save hook
            role: "user"
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// -------------------- LOGIN --------------------
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email & password required" });
        }

        // FIX: Normalize email (trim + lowercase) - MUST MATCH REGISTRATION
        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // FIX: Use the schema method OR bcrypt.compare (both work)
        // Option 1: Using your schema method (recommended)
        const isMatch = await user.matchPassword(password);

        // Option 2: Direct bcrypt (what you have now - also works)
        // const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// -------------------- DEBUG VERSION (Use this temporarily to test) --------------------
export const loginDebug = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("=== LOGIN DEBUG ===");
        console.log("Received email:", `[${email}]`);
        console.log("Received password:", `[${password}]`);

        const normalizedEmail = email.trim().toLowerCase();
        console.log("Normalized email:", `[${normalizedEmail}]`);

        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            console.log("❌ User not found in database");
            return res.status(400).json({ message: "User not found" });
        }

        console.log("✅ User found:", user.email);
        console.log("Stored password hash:", user.password.substring(0, 20) + "...");

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        console.log("✅ Login successful");
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: err.message });
    }
};