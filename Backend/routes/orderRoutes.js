// routes/orderRoutes.js
import express from "express";
import {
    createOrder,
    getUserOrders,
    getOrderById,
    getOrderByNumber,
    cancelOrder,
    getAllOrders,
    updateOrderStatus,
    addTrackingInfo,
    processRefund,
    getOrderStatistics
} from "../controllers/orderController.js";

// Import validation
import { body, param, query, validationResult } from 'express-validator';

// Import auth middleware
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
const createOrderValidation = [
    body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
    body('shippingAddress.fullName')
        .trim()
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters'),
    body('shippingAddress.phone')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Invalid phone number format'),
    body('shippingAddress.addressLine1')
        .trim()
        .notEmpty().withMessage('Address is required')
        .isLength({ min: 5, max: 200 }).withMessage('Address must be between 5 and 200 characters'),
    body('shippingAddress.addressLine2')
        .optional()
        .trim()
        .isLength({ max: 200 }).withMessage('Address line 2 cannot exceed 200 characters'),
    body('shippingAddress.city')
        .trim()
        .notEmpty().withMessage('City is required'),
    body('shippingAddress.state')
        .trim()
        .notEmpty().withMessage('State/Province is required'),
    body('shippingAddress.postalCode')
        .trim()
        .notEmpty().withMessage('Postal code is required'),
    body('shippingAddress.country')
        .optional()
        .trim(),
    body('paymentMethod')
        .optional()
        .isIn(['credit_card', 'debit_card', 'paypal', 'stripe', 'cash_on_delivery'])
        .withMessage('Invalid payment method'),
    body('shippingMethod')
        .optional()
        .isIn(['standard', 'express', 'overnight', 'pickup'])
        .withMessage('Invalid shipping method'),
    body('customerNotes')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Customer notes cannot exceed 500 characters')
];

const cancelOrderValidation = [
    param('id').isMongoId().withMessage('Invalid order ID'),
    body('reason')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Reason cannot exceed 500 characters')
];

const updateStatusValidation = [
    param('id').isMongoId().withMessage('Invalid order ID'),
    body('status')
        .notEmpty().withMessage('Status is required')
        .isIn([
            'pending',
            'confirmed',
            'processing',
            'shipped',
            'out_for_delivery',
            'delivered',
            'cancelled',
            'refunded'
        ]).withMessage('Invalid status')
];

const trackingValidation = [
    param('id').isMongoId().withMessage('Invalid order ID'),
    body('trackingNumber')
        .trim()
        .notEmpty().withMessage('Tracking number is required')
        .isLength({ min: 3, max: 50 }).withMessage('Tracking number must be between 3 and 50 characters'),
    body('carrier')
        .trim()
        .notEmpty().withMessage('Carrier is required')
        .isLength({ min: 2, max: 50 }).withMessage('Carrier name must be between 2 and 50 characters')
];

const refundValidation = [
    param('id').isMongoId().withMessage('Invalid order ID'),
    body('amount')
        .notEmpty().withMessage('Refund amount is required')
        .isFloat({ min: 0.01 }).withMessage('Refund amount must be greater than 0'),
    body('reason')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Reason cannot exceed 500 characters')
];

const orderQueryValidation = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('status').optional().isIn([
        'pending',
        'confirmed',
        'processing',
        'shipped',
        'out_for_delivery',
        'delivered',
        'cancelled',
        'refunded'
    ]).withMessage('Invalid status'),
    query('paymentStatus').optional().isIn(['pending', 'completed', 'failed', 'refunded']).withMessage('Invalid payment status'),
    query('sortBy').optional().isIn(['createdAt', 'total', 'status']).withMessage('Invalid sort field'),
    query('order').optional().isIn(['asc', 'desc']).withMessage('Order must be asc or desc')
];

const idValidation = [
    param('id').isMongoId().withMessage('Invalid order ID')
];

const orderNumberValidation = [
    param('orderNumber')
        .notEmpty().withMessage('Order number is required')
        .matches(/^ORD-\d{4}-\d{4}$/).withMessage('Invalid order number format')
];

// ==========================================
// USER ROUTES (Require Authentication)
// ==========================================

// POST create order from cart (checkout)
router.post(
    "/",
    // authenticateToken,
    createOrderValidation,
    validate,
    createOrder
);

// GET user's orders
router.get(
    "/my-orders",
    // authenticateToken,
    orderQueryValidation,
    validate,
    getUserOrders
);

// GET order by order number
router.get(
    "/number/:orderNumber",
    // authenticateToken,
    orderNumberValidation,
    validate,
    getOrderByNumber
);

// GET single order by ID
router.get(
    "/:id",
    // authenticateToken,
    idValidation,
    validate,
    getOrderById
);

// PUT cancel order
router.put(
    "/:id/cancel",
    // authenticateToken,
    cancelOrderValidation,
    validate,
    cancelOrder
);

// ==========================================
// ADMIN ROUTES (Require Admin Authentication)
// ==========================================

// GET all orders (admin)
router.get(
    "/admin/all",
    // authenticateToken,
    // isAdmin,
    orderQueryValidation,
    validate,
    getAllOrders
);

// GET order statistics (admin)
router.get(
    "/admin/statistics",
    // authenticateToken,
    // isAdmin,
    getOrderStatistics
);

// PUT update order status (admin)
router.put(
    "/:id/status",
    // authenticateToken,
    // isAdmin,
    updateStatusValidation,
    validate,
    updateOrderStatus
);

// PUT add tracking information (admin)
router.put(
    "/:id/tracking",
    // authenticateToken,
    // isAdmin,
    trackingValidation,
    validate,
    addTrackingInfo
);

// POST process refund (admin)
router.post(
    "/:id/refund",
    // authenticateToken,
    // isAdmin,
    refundValidation,
    validate,
    processRefund
);

export default router;