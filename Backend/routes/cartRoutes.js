// routes/cartRoutes.js
import express from "express";
import {
    getCart,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    moveToSavedForLater,
    moveToCart,
    getCartSummary
} from "../controllers/cartController.js";

// Import validation
import { body, param, validationResult } from "express-validator";

// Import auth middleware
// import { authenticateToken } from "../middleware/auth.js";

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
const addToCartValidation = [
    body('productId')
        .notEmpty().withMessage('Product ID is required')
        .isMongoId().withMessage('Invalid product ID'),
    body('quantity')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('Quantity must be between 1 and 100'),
    body('attributes')
        .optional()
        .isObject().withMessage('Attributes must be an object')
];

const updateQuantityValidation = [
    param('itemId').notEmpty().withMessage('Item ID is required'),
    body('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isInt({ min: 0, max: 100 }).withMessage('Quantity must be between 0 and 100')
];

const itemIdValidation = [
    param('itemId').notEmpty().withMessage('Item ID is required')
];

const productIdValidation = [
    param('productId')
        .notEmpty().withMessage('Product ID is required')
        .isMongoId().withMessage('Invalid product ID')
];

const couponValidation = [
    body('couponCode')
        .notEmpty().withMessage('Coupon code is required')
        .trim()
        .isLength({ min: 3, max: 20 }).withMessage('Coupon code must be between 3 and 20 characters')
        .matches(/^[A-Z0-9]+$/).withMessage('Coupon code must contain only uppercase letters and numbers')
];

// ==========================================
// ALL ROUTES REQUIRE AUTHENTICATION
// ==========================================

// NOTE: In production, uncomment the authenticateToken middleware
// router.use(authenticateToken);

// GET user's cart
router.get(
    "/",
    // authenticateToken,
    getCart
);

// GET cart summary (for checkout)
router.get(
    "/summary",
    // authenticateToken,
    getCartSummary
);

// POST add item to cart
router.post(
    "/items",
    // authenticateToken,
    addToCartValidation,
    validate,
    addItemToCart
);

// PUT update item quantity
router.put(
    "/items/:itemId",
    // authenticateToken,
    updateQuantityValidation,
    validate,
    updateItemQuantity
);

// DELETE remove item from cart
router.delete(
    "/items/:itemId",
    // authenticateToken,
    itemIdValidation,
    validate,
    removeItemFromCart
);

// DELETE clear entire cart
router.delete(
    "/",
    // authenticateToken,
    clearCart
);

// POST apply coupon code
router.post(
    "/coupon",
    // authenticateToken,
    couponValidation,
    validate,
    applyCoupon
);

// DELETE remove coupon
router.delete(
    "/coupon",
    // authenticateToken,
    removeCoupon
);

// POST move item to saved for later
router.post(
    "/items/:itemId/save",
    // authenticateToken,
    itemIdValidation,
    validate,
    moveToSavedForLater
);

// POST move item from saved for later to cart
router.post(
    "/saved/:productId/move",
    // authenticateToken,
    productIdValidation,
    validate,
    moveToCart
);

export default router;