import User from "../models/User.js";

// -------------------- GET PROFILE --------------------
export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        res.json({ success: true, user });
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

// -------------------- ADMIN: GET USER BY ID --------------------
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        res.json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

// -------------------- ADMIN: UPDATE USER --------------------
const updateUser = async (req, res, next) => {
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

export default updateUser;

// -------------------- ADMIN: DELETE USER --------------------
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        await user.deleteOne();
        res.json({ success: true, message: "User removed" });
    } catch (error) {
        next(error);
    }
};
