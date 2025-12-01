import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// -------------------- REGISTER --------------------
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400);
            throw new Error("User already exists");
        }

        const user = await User.create({ name, email, password });

        res.status(201).json({
            success: true,
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        next(error);
    }
};

// -------------------- LOGIN --------------------
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            res.status(401);
            throw new Error("Invalid email or password");
        }

        res.json({
            success: true,
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        next(error);
    }
};

// -------------------- GET PROFILE --------------------
export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        res.json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }
};

// -------------------- ADMIN: GET ALL USERS --------------------
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        res.json({ success: true, users });
    } catch (error) {
        next(error);
    }
};

// -------------------- ADMIN: DELETE USER --------------------
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        await user.deleteOne();

        res.json({
            success: true,
            message: "User removed",
        });
    } catch (error) {
        next(error);
    }
};

// -------------------- ADMIN: UPDATE USER --------------------
export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        const { name, email, isAdmin } = req.body;

        user.name = name || user.name;
        user.email = email || user.email;
        user.isAdmin = isAdmin ?? user.isAdmin;

        const updatedUser = await user.save();

        res.json({
            success: true,
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            },
        });
    } catch (error) {
        next(error);
    }
};
