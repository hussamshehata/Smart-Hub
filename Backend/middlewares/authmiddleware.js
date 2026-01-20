// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import rateLimit from "express-rate-limit";

// ==================== AUTHENTICATION MIDDLEWARE ====================

// Verify JWT token and attach user to request
export const authenticateToken = async (req, res, next) => {
    try {
        // Get token from header or cookie
        let token = null;

        // Check Authorization header first
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }

        // Fallback to cookie
        if (!token && req.cookies?.accessToken) {
            token = req.cookies.accessToken;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from database
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid token. User not found."
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Account is deactivated."
            });
        }

        // Attach user to request
        req.user = user;
        next();

    } catch (error) {
        console.error('Authentication error:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token."
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expired."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Authentication failed."
        });
    }
};

// ==================== AUTHORIZATION MIDDLEWARE ====================

// Check if user is admin
export const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authentication required."
        });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admin privileges required."
        });
    }

    next();
};

// Check if user is moderator or admin
export const isModerator = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authentication required."
        });
    }

    if (!['admin', 'moderator'].includes(req.user.role)) {
        return res.status(403).json({
            success: false,
            message: "Access denied. Moderator or admin privileges required."
        });
    }

    next();
};

// Check if email is verified
export const requireEmailVerification = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authentication required."
        });
    }

    if (!req.user.isEmailVerified) {
        return res.status(403).json({
            success: false,
            message: "Please verify your email address to access this resource."
        });
    }

    next();
};

// Check if user owns the resource or is admin
export const isOwnerOrAdmin = (resourceUserIdField = 'userId') => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];

        if (req.user.role === 'admin' || req.user._id.toString() === resourceUserId) {
            return next();
        }

        return res.status(403).json({
            success: false,
            message: "Access denied. Insufficient permissions."
        });
    };
};

// ==================== RATE LIMITING ====================

// General API rate limiter
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        // Skip rate limiting for admin users
        return req.user?.role === 'admin';
    }
});

// Strict rate limiter for authentication routes
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: "Too many authentication attempts, please try again after 15 minutes."
    },
    skipSuccessfulRequests: true, // Don't count successful requests
    standardHeaders: true,
    legacyHeaders: false
});

// Password reset rate limiter
export const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Limit each IP to 3 password reset requests per hour
    message: {
        success: false,
        message: "Too many password reset requests, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Registration rate limiter
export const registrationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Limit each IP to 3 registrations per hour
    message: {
        success: false,
        message: "Too many registration attempts, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
});

// ==================== OPTIONAL MIDDLEWARES ====================

// Log authentication attempts
export const logAuthAttempt = (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    console.log(`Auth attempt from IP: ${ip}, User-Agent: ${userAgent}`);
    next();
};

// Require HTTPS in production
export const requireHTTPS = (req, res, next) => {
    if (process.env.NODE_ENV === 'production' && !req.secure) {
        return res.status(403).json({
            success: false,
            message: "HTTPS required"
        });
    }
    next();
};