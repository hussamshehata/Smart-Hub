// controllers/orderController.js
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

// POST create order from cart (checkout)
export const createOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const userId = req.user._id;
        const { shippingAddress, paymentMethod, customerNotes, shippingMethod = 'standard' } = req.body;

        // Validate shipping address
        if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone ||
            !shippingAddress.addressLine1 || !shippingAddress.city ||
            !shippingAddress.state || !shippingAddress.postalCode) {
            return res.status(400).json({
                success: false,
                message: 'Complete shipping address is required'
            });
        }

        // Get user's cart
        const cart = await Cart.findActiveByUser(userId)
            .populate('items.product')
            .session(session);

        if (!cart || cart.isEmpty()) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Cart is empty'
            });
        }

        // Validate all items and check stock
        const orderItems = [];
        for (const item of cart.items) {
            const product = item.product;

            if (!product || !product.isActive) {
                await session.abortTransaction();
                return res.status(400).json({
                    success: false,
                    message: `Product "${product?.name || 'Unknown'}" is no longer available`
                });
            }

            if (product.stock < item.quantity) {
                await session.abortTransaction();
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for "${product.name}". Only ${product.stock} available`,
                    productId: product._id
                });
            }

            // Create order item with product snapshot
            orderItems.push({
                product: product._id,
                productSnapshot: {
                    name: product.name,
                    slug: product.slug,
                    brand: product.brand,
                    sku: product.sku,
                    image: product.primaryImage?.url || product.images[0]?.url
                },
                quantity: item.quantity,
                price: item.priceAtAdd,
                total: item.priceAtAdd * item.quantity
            });

            // Update product stock
            product.stock -= item.quantity;
            product.totalSold += item.quantity;
            await product.save({ session });
        }

        // Calculate shipping cost based on method
        const shippingCosts = {
            'standard': 10,
            'express': 25,
            'overnight': 50,
            'pickup': 0
        };
        const shippingCost = shippingCosts[shippingMethod] || 10;

        // Create order
        const order = new Order({
            user: userId,
            items: orderItems,
            subtotal: cart.subtotal,
            discount: cart.discountAmount,
            couponCode: cart.couponCode,
            tax: cart.tax,
            shippingCost,
            shippingAddress,
            shippingMethod,
            paymentInfo: {
                method: paymentMethod || 'credit_card',
                status: 'pending'
            },
            customerNotes
        });

        await order.save({ session });

        // Clear cart after successful order
        cart.items = [];
        cart.couponCode = undefined;
        cart.discount = 0;
        cart.status = 'converted';
        await cart.save({ session });

        await session.commitTransaction();

        // Populate order for response
        await order.populate('items.product', 'name slug images');

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order
        });

    } catch (error) {
        await session.abortTransaction();
        console.error('Create order error:', error);

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
            message: 'Failed to create order',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    } finally {
        session.endSession();
    }
};

// GET user's orders
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const { page = 1, limit = 10, status } = req.query;

        const query = { user: userId };
        if (status) {
            query.status = status;
        }

        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('items.product', 'name slug images price')
            .lean();

        const total = await Order.countDocuments(query);

        res.json({
            success: true,
            data: orders,
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
        console.error('Get user orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// GET single order by ID
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const isAdmin = req.user.role === 'admin'; // Assuming role field exists

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid order ID'
            });
        }

        const query = { _id: id };
        // Non-admin users can only view their own orders
        if (!isAdmin) {
            query.user = userId;
        }

        const order = await Order.findOne(query)
            .populate('items.product', 'name slug images price stock')
            .populate('user', 'name email');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error('Get order by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch order',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// GET order by order number
export const getOrderByNumber = async (req, res) => {
    try {
        const { orderNumber } = req.params;
        const userId = req.user._id;
        const isAdmin = req.user.role === 'admin';

        const query = { orderNumber };
        if (!isAdmin) {
            query.user = userId;
        }

        const order = await Order.findOne(query)
            .populate('items.product', 'name slug images price')
            .populate('user', 'name email');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error('Get order by number error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch order',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// PUT cancel order (user can cancel their own pending/confirmed orders)
export const cancelOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;
        const userId = req.user._id;
        const { reason } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid order ID'
            });
        }

        const order = await Order.findOne({ _id: id, user: userId }).session(session);

        if (!order) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        if (!order.isCancellable) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: `Cannot cancel order with status: ${order.status}`
            });
        }

        // Restore product stock
        for (const item of order.items) {
            await Product.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        stock: item.quantity,
                        totalSold: -item.quantity
                    }
                },
                { session }
            );
        }

        // Update order
        order.cancellationReason = reason;
        await order.updateStatus('cancelled', userId);

        await session.commitTransaction();

        res.json({
            success: true,
            message: 'Order cancelled successfully',
            data: order
        });

    } catch (error) {
        await session.abortTransaction();
        console.error('Cancel order error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to cancel order',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    } finally {
        session.endSession();
    }
};

// ADMIN: GET all orders
export const getAllOrders = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 20,
            status,
            paymentStatus,
            sortBy = 'createdAt',
            order = 'desc',
            search
        } = req.query;

        const query = {};

        if (status) query.status = status;
        if (paymentStatus) query['paymentInfo.status'] = paymentStatus;
        if (search) {
            query.$or = [
                { orderNumber: { $regex: search, $options: 'i' } },
                { 'shippingAddress.fullName': { $regex: search, $options: 'i' } }
            ];
        }

        const sortOrder = order === 'asc' ? 1 : -1;
        const sort = { [sortBy]: sortOrder };

        const orders = await Order.find(query)
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('user', 'name email')
            .populate('items.product', 'name slug images')
            .lean();

        const total = await Order.countDocuments(query);

        res.json({
            success: true,
            data: orders,
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
        console.error('Get all orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// ADMIN: PUT update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid order ID'
            });
        }

        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Status is required'
            });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        await order.updateStatus(status);

        res.json({
            success: true,
            message: 'Order status updated successfully',
            data: order
        });

    } catch (error) {
        console.error('Update order status error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to update order status',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// ADMIN: PUT add tracking information
export const addTrackingInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { trackingNumber, carrier } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid order ID'
            });
        }

        if (!trackingNumber || !carrier) {
            return res.status(400).json({
                success: false,
                message: 'Tracking number and carrier are required'
            });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        await order.addTracking(trackingNumber, carrier);

        res.json({
            success: true,
            message: 'Tracking information added successfully',
            data: order
        });

    } catch (error) {
        console.error('Add tracking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add tracking information',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// ADMIN: POST process refund
export const processRefund = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, reason } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid order ID'
            });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Valid refund amount is required'
            });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        await order.processRefund(amount, reason);

        res.json({
            success: true,
            message: 'Refund processed successfully',
            data: order
        });

    } catch (error) {
        console.error('Process refund error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to process refund',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// ADMIN: GET order statistics
export const getOrderStatistics = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const stats = await Order.getStatistics(startDate, endDate);

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Get order statistics error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};