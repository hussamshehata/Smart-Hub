// controllers/userController.js
import User from "../models/User.js";
import mongoose from "mongoose";

// ==================== USER PROFILE ====================

// GET current user profile
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch profile",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// PUT update current user profile
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, phone, dateOfBirth, gender, avatar, preferences } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Update allowed fields
        if (name) user.name = name;
        if (phone !== undefined) user.phone = phone;
        if (dateOfBirth) user.dateOfBirth = dateOfBirth;
        if (gender) user.gender = gender;
        if (avatar) user.avatar = avatar;
        if (preferences) {
            user.preferences = { ...user.preferences, ...preferences };
        }

        await user.save();

        res.json({
            success: true,
            message: "Profile updated successfully",
            data: user
        });
    } catch (error) {
        console.error('Update profile error:', error);

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// PUT update password
export const updatePassword = async (req, res) => {
    try {
        const userId = req.user._id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 6 characters"
            });
        }

        // Get user with password
        const user = await User.findById(userId).select('+password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Verify current password
        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to update password",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// DELETE deactivate account
export const deactivateAccount = async (req, res) => {
    try {
        const userId = req.user._id;
        const { reason } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await user.deactivate(reason);

        res.json({
            success: true,
            message: "Account deactivated successfully"
        });
    } catch (error) {
        console.error('Deactivate account error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to deactivate account",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// ==================== ADDRESS MANAGEMENT ====================

// GET user addresses
export const getAddresses = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            data: user.addresses
        });
    } catch (error) {
        console.error('Get addresses error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch addresses",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// POST add address
export const addAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const addressData = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await user.addAddress(addressData);

        res.status(201).json({
            success: true,
            message: "Address added successfully",
            data: user.addresses
        });
    } catch (error) {
        console.error('Add address error:', error);

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to add address",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// PUT update address
export const updateAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const { addressId } = req.params;
        const addressData = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await user.updateAddress(addressId, addressData);

        res.json({
            success: true,
            message: "Address updated successfully",
            data: user.addresses
        });
    } catch (error) {
        console.error('Update address error:', error);

        if (error.message === 'Address not found') {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update address",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// DELETE remove address
export const deleteAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const { addressId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await user.deleteAddress(addressId);

        res.json({
            success: true,
            message: "Address deleted successfully",
            data: user.addresses
        });
    } catch (error) {
        console.error('Delete address error:', error);

        if (error.message === 'Address not found') {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to delete address",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// ==================== ADMIN OPERATIONS ====================

// GET all users (admin)
export const getAllUsers = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 20,
            search,
            role,
            isActive,
            isEmailVerified,
            sortBy = 'createdAt',
            order = 'desc'
        } = req.query;

        const query = {};

        // Search by name or email
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        if (role) query.role = role;
        if (isActive !== undefined) query.isActive = isActive === 'true';
        if (isEmailVerified !== undefined) query.isEmailVerified = isEmailVerified === 'true';

        const sortOrder = order === 'asc' ? 1 : -1;
        const sort = { [sortBy]: sortOrder };

        const users = await User.find(query)
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .lean();

        const total = await User.countDocuments(query);

        res.json({
            success: true,
            data: users,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit),
                hasNextPage: page * limit < total,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// GET user by ID (admin)
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Get user by ID error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// PUT update user (admin)
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role, isActive, isEmailVerified } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Prevent admin from modifying their own role
        if (user._id.toString() === req.user._id.toString() && role && role !== user.role) {
            return res.status(403).json({
                success: false,
                message: "You cannot modify your own role"
            });
        }

        // Update fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;
        if (isActive !== undefined) user.isActive = isActive;
        if (isEmailVerified !== undefined) user.isEmailVerified = isEmailVerified;

        await user.save();

        res.json({
            success: true,
            message: "User updated successfully",
            data: user
        });
    } catch (error) {
        console.error('Update user error:', error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// DELETE user (admin)
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }

        // Prevent admin from deleting themselves
        if (id === req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You cannot delete your own account"
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// GET user statistics (admin)
export const getUserStatistics = async (req, res) => {
    try {
        const stats = await User.getStatistics();

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Get user statistics error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch statistics",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};