// routes/productRoutes.js
import express from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getFeaturedProducts,
    getBestSellers,
    getRelatedProducts,
    updateProductStock
} from "../controllers/productController.js";

// Import validation
import { body, param, query, validationResult } from "express-validator";

// Import auth middleware (uncomment when ready)
// import { authenticateToken, isAdmin } from "../middleware/auth.js";

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
const createProductValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Product name is required')
        .isLength({ min: 3, max: 200 }).withMessage('Name must be between 3 and 200 characters'),
    body('brand')
        .trim()
        .notEmpty().withMessage('Brand is required')
        .isLength({ min: 2, max: 50 }).withMessage('Brand must be between 2 and 50 characters'),
    body('category')
        .notEmpty().withMessage('Category is required')
        .isMongoId().withMessage('Invalid category ID'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
    body('shortDescription')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Short description cannot exceed 500 characters'),
    body('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('salePrice')
        .optional()
        .isFloat({ min: 0 }).withMessage('Sale price must be a positive number'),
    body('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('images')
        .optional()
        .isArray().withMessage('Images must be an array'),
    body('images.*.url')
        .optional()
        .isURL().withMessage('Invalid image URL'),
    body('tags')
        .optional()
        .isArray().withMessage('Tags must be an array'),
    body('isFeatured')
        .optional()
        .isBoolean().withMessage('isFeatured must be a boolean')
];

const updateProductValidation = [
    param('id').isMongoId().withMessage('Invalid product ID'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 3, max: 200 }).withMessage('Name must be between 3 and 200 characters'),
    body('brand')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Brand must be between 2 and 50 characters'),
    body('category')
        .optional()
        .isMongoId().withMessage('Invalid category ID'),
    body('description')
        .optional()
        .trim()
        .isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
    body('price')
        .optional()
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('salePrice')
        .optional()
        .isFloat({ min: 0 }).withMessage('Sale price must be a positive number'),
    body('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
];

const queryValidation = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('search').optional().trim(),
    query('category').optional().isMongoId().withMessage('Invalid category ID'),
    query('brand').optional().trim(),
    query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be a positive number'),
    query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be a positive number'),
    query('inStock').optional().isBoolean().withMessage('inStock must be a boolean'),
    query('isFeatured').optional().isBoolean().withMessage('isFeatured must be a boolean'),
    query('sortBy').optional().isIn(['price', 'rating', 'popularity', 'name', 'createdAt']).withMessage('Invalid sort field'),
    query('order').optional().isIn(['asc', 'desc']).withMessage('Order must be asc or desc')
];

const idValidation = [
    param('id').custom((value) => {
        // Accept both MongoDB ObjectId and slug
        return /^[a-f\d]{24}$/i.test(value) || /^[a-z0-9-]+$/.test(value);
    }).withMessage('Invalid product ID or slug')
];

const stockUpdateValidation = [
    param('id').isMongoId().withMessage('Invalid product ID'),
    body('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    body('operation')
        .optional()
        .isIn(['add', 'subtract']).withMessage('Operation must be add or subtract')
];

// ==========================================
// PUBLIC ROUTES
// ==========================================

// GET all products with filters
router.get(
    "/",
    queryValidation,
    validate,
    getProducts
);

// GET featured products
router.get(
    "/featured",
    getFeaturedProducts
);

// GET best sellers
router.get(
    "/best-sellers",
    getBestSellers
);

// GET related products
router.get(
    "/:id/related",
    idValidation,
    validate,
    getRelatedProducts
);

// GET single product by ID or slug (must be after specific routes)
router.get(
    "/:id",
    idValidation,
    validate,
    getProductById
);

// ==========================================
// PROTECTED ROUTES (Admin only)
// ==========================================

// POST create new product
router.post(
    "/",
    // authenticateToken,
    // isAdmin,
    createProductValidation,
    validate,
    createProduct
);

// PUT/PATCH update product
router.put(
    "/:id",
    // authenticateToken,
    // isAdmin,
    updateProductValidation,
    validate,
    updateProduct
);

router.patch(
    "/:id",
    // authenticateToken,
    // isAdmin,
    updateProductValidation,
    validate,
    updateProduct
);

// PATCH update stock
router.patch(
    "/:id/stock",
    // authenticateToken,
    // isAdmin,
    stockUpdateValidation,
    validate,
    updateProductStock
);

// DELETE product
router.delete(
    "/:id",
    // authenticateToken,
    // isAdmin,
    param('id').isMongoId().withMessage('Invalid product ID'),
    validate,
    deleteProduct
);

export default router;