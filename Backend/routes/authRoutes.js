// routes/authRoutes.js
import express from "express";
import {
    register,
    login,
    logout,
    refreshToken,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword,
    verifyToken
} from "../controllers/authController.js";

// Import middleware
import {
    authenticateToken,
    authLimiter,
    passwordResetLimiter,
    registrationLimiter,
    requireHTTPS
} from "../middlewares/authmiddleware.js";

// Import validation
import { body, param, validationResult } from "express-validator";

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
const registerValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

const loginValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
];

const forgotPasswordValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail()
];

const resetPasswordValidation = [
    param('token')
        .notEmpty().withMessage('Reset token is required')
        .isLength({ min: 64, max: 64 }).withMessage('Invalid reset token format'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

const verifyEmailValidation = [
    param('token')
        .notEmpty().withMessage('Verification token is required')
        .isLength({ min: 64, max: 64 }).withMessage('Invalid verification token format')
];

// ==========================================
// PUBLIC ROUTES
// ==========================================

// POST register new user
router.post(
    "/register",
    requireHTTPS,
    registrationLimiter,
    registerValidation,
    validate,
    register
);

// POST login
router.post(
    "/login",
    requireHTTPS,
    authLimiter,
    loginValidation,
    validate,
    login
);

// POST logout
router.post(
    "/logout",
    logout
);

// POST refresh access token
router.post(
    "/refresh-token",
    refreshToken
);

// POST forgot password
router.post(
    "/forgot-password",
    passwordResetLimiter,
    forgotPasswordValidation,
    validate,
    forgotPassword
);

// POST reset password
router.post(
    "/reset-password/:token",
    resetPasswordValidation,
    validate,
    resetPassword
);

// GET verify email
router.get(
    "/verify-email/:token",
    verifyEmailValidation,
    validate,
    verifyEmail
);

// ==========================================
// PROTECTED ROUTES (Require Authentication)
// ==========================================

// GET verify current token
router.get(
    "/verify-token",
    authenticateToken,
    verifyToken
);

// POST resend verification email
router.post(
    "/resend-verification",
    authenticateToken,
    resendVerificationEmail
);

export default router;