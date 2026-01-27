// routes/userRoutes.js
import express from "express";
import {
    getMe,
    updateProfile,
    updatePassword,
    deactivateAccount,
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserStatistics
} from "../controllers/userController.js";

// Import validation
import { body, param, query, validationResult } from "express-validator";

// Import auth middleware
import { authenticateToken, isAdmin } from "../middlewares/authmiddleware.js";

const router = express.Router();

// Validation middleware handler
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

// Validation rules
const updateProfileValidation = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('phone')
        .optional()
        .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Invalid phone number format'),
    body('dateOfBirth')
        .optional()
        .isISO8601().withMessage('Invalid date format'),
    body('gender')
        .optional()
        .isIn(['male', 'female', 'other', 'prefer_not_to_say']).withMessage('Invalid gender'),
    body('avatar')
        .optional()
        .isURL().withMessage('Avatar must be a valid URL')
];

const updatePasswordValidation = [
    body('currentPassword')
        .notEmpty().withMessage('Current password is required'),
    body('newPassword')
        .notEmpty().withMessage('New password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

const addressValidation = [
    body('addressLine1')
        .trim()
        .notEmpty().withMessage('Address is required')
        .isLength({ min: 5, max: 200 }).withMessage('Address must be between 5 and 200 characters'),
    body('addressLine2')
        .optional()
        .trim()
        .isLength({ max: 200 }).withMessage('Address line 2 cannot exceed 200 characters'),
    body('city')
        .trim()
        .notEmpty().withMessage('City is required'),
    body('state')
        .trim()
        .notEmpty().withMessage('State is required'),
    body('postalCode')
        .trim()
        .notEmpty().withMessage('Postal code is required'),
    body('country')
        .optional()
        .trim(),
    body('phone')
        .optional()
        .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Invalid phone number format'),
    body('label')
        .optional()
        .isIn(['home', 'work', 'other']).withMessage('Label must be home, work, or other'),
    body('isDefault')
        .optional()
        .isBoolean().withMessage('isDefault must be a boolean')
];

const updateUserValidation = [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .optional()
        .isEmail().withMessage('Invalid email format'),
    body('role')
        .optional()
        .isIn(['user', 'admin', 'moderator']).withMessage('Invalid role'),
    body('isActive')
        .optional()
        .isBoolean().withMessage('isActive must be a boolean'),
    body('isEmailVerified')
        .optional()
        .isBoolean().withMessage('isEmailVerified must be a boolean')
];

const userQueryValidation = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('role').optional().isIn(['user', 'admin', 'moderator']).withMessage('Invalid role'),
    query('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
    query('isEmailVerified').optional().isBoolean().withMessage('isEmailVerified must be a boolean'),
    query('sortBy').optional().isIn(['name', 'email', 'createdAt', 'lastLogin']).withMessage('Invalid sort field'),
    query('order').optional().isIn(['asc', 'desc']).withMessage('Order must be asc or desc')
];

const idValidation = [
    param('id').isMongoId().withMessage('Invalid user ID')
];

const addressIdValidation = [
    param('addressId').notEmpty().withMessage('Address ID is required')
];

// ==========================================
// USER PROFILE ROUTES (Require Authentication)
// ==========================================

// GET current user profile
router.get(
    "/me",
    authenticateToken,
    getMe
);

// PUT update profile
router.put(
    "/profile",
    authenticateToken,
    updateProfileValidation,
    validate,
    updateProfile
);

// PUT update password
router.put(
    "/password",
    authenticateToken,
    updatePasswordValidation,
    validate,
    updatePassword
);

// DELETE deactivate account
router.delete(
    "/account",
    authenticateToken,
    deactivateAccount
);

// ==========================================
// ADDRESS MANAGEMENT ROUTES
// ==========================================

// GET user addresses
router.get(
    "/addresses",
    authenticateToken,
    getAddresses
);

// POST add address
router.post(
    "/addresses",
    authenticateToken,
    addressValidation,
    validate,
    addAddress
);

// PUT update address
router.put(
    "/addresses/:addressId",
    authenticateToken,
    addressIdValidation,
    addressValidation,
    validate,
    updateAddress
);

// DELETE address
router.delete(
    "/addresses/:addressId",
    authenticateToken,
    addressIdValidation,
    validate,
    deleteAddress
);

// ==========================================
// ADMIN ROUTES (Require Admin Authentication)
// ==========================================

// GET all users
router.get(
    "/admin/all",
    authenticateToken,
    isAdmin,
    userQueryValidation,
    validate,
    getAllUsers
);

// GET user statistics
router.get(
    "/admin/statistics",
    authenticateToken,
    isAdmin,
    getUserStatistics
);

// GET user by ID
router.get(
    "/admin/:id",
    authenticateToken,
    isAdmin,
    idValidation,
    validate,
    getUserById
);

// PUT update user
router.put(
    "/admin/:id",
    authenticateToken,
    isAdmin,
    updateUserValidation,
    validate,
    updateUser
);

// DELETE user
router.delete(
    "/admin/:id",
    authenticateToken,
    isAdmin,
    idValidation,
    validate,
    deleteUser
);

export default router;