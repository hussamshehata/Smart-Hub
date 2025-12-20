// routes/categoryRoutes.js

import express from "express";
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryTree,
} from "../controllers/categoryController.js";

// Import your auth middleware (uncomment when ready)
// import { authenticateToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Validation middleware (optional - using express-validator)
import { body, param, query, validationResult } from "express-validator";

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
const createCategoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
    body('attributes')
        .optional()
        .isObject().withMessage('Attributes must be an object'),
    body('parentCategory')
        .optional()
        .isMongoId().withMessage('Invalid parent category ID'),
    body('isActive')
        .optional()
        .isBoolean().withMessage('isActive must be a boolean')
];

const updateCategoryValidation = [
    param('id').isMongoId().withMessage('Invalid category ID'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
    body('attributes')
        .optional()
        .isObject().withMessage('Attributes must be an object'),
    body('parentCategory')
        .optional()
        .custom((value) => value === null || value === '' || /^[a-f\d]{24}$/i.test(value))
        .withMessage('Invalid parent category ID'),
    body('isActive')
        .optional()
        .isBoolean().withMessage('isActive must be a boolean')
];

const idValidation = [
    param('id').isMongoId().withMessage('Invalid category ID')
];

const queryValidation = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('search').optional().trim(),
    query('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
    query('sortBy').optional().isIn(['name', 'createdAt', 'updatedAt']).withMessage('Invalid sort field'),
    query('order').optional().isIn(['asc', 'desc']).withMessage('Order must be asc or desc')
];

// ==========================================
// PUBLIC ROUTES
// ==========================================

// GET all categories (with pagination, search, filters)
router.get(
    "/",
    queryValidation,
    validate,
    getCategories
);

// GET category tree (hierarchical structure)
router.get(
    "/tree",
    getCategoryTree
);

// GET single category by ID
router.get(
    "/:id",
    idValidation,
    validate,
    getCategoryById
);

// ==========================================
// PROTECTED ROUTES (Admin only)
// ==========================================

// POST create new category
router.post(
    "/",
    // authenticateToken,      // Uncomment when auth is ready
    // isAdmin,                // Uncomment when auth is ready
    createCategoryValidation,
    validate,
    createCategory
);

// PUT update category
router.put(
    "/:id",
    // authenticateToken,      // Uncomment when auth is ready
    // isAdmin,                // Uncomment when auth is ready
    updateCategoryValidation,
    validate,
    updateCategory
);

// DELETE category
router.delete(
    "/:id",
    // authenticateToken,      // Uncomment when auth is ready
    // isAdmin,                // Uncomment when auth is ready
    idValidation,
    validate,
    deleteCategory
);

export default router;