// models/Order.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    // Snapshot of product at time of order
    productSnapshot: {
        name: { type: String, required: true },
        slug: String,
        brand: String,
        sku: String,
        image: String
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    total: {
        type: Number,
        required: true
    }
}, { _id: true });

// Calculate total before saving
orderItemSchema.pre('save', function(next) {
    this.total = this.price * this.quantity;
    next();
});

const shippingAddressSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    addressLine1: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    addressLine2: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    state: {
        type: String,
        required: [true, 'State/Province is required'],
        trim: true
    },
    postalCode: {
        type: String,
        required: [true, 'Postal code is required'],
        trim: true
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
        default: 'United States'
    }
}, { _id: false });

const paymentInfoSchema = new mongoose.Schema({
    method: {
        type: String,
        required: true,
        enum: ['credit_card', 'debit_card', 'paypal', 'stripe', 'cash_on_delivery'],
        default: 'credit_card'
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    transactionId: {
        type: String,
        trim: true
    },
    paidAt: Date,
    // Card last 4 digits (for display only, never store full card)
    cardLast4: {
        type: String,
        maxlength: 4
    },
    cardBrand: {
        type: String,
        enum: ['visa', 'mastercard', 'amex', 'discover', 'other']
    }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        index: true
    },
    items: {
        type: [orderItemSchema],
        validate: {
            validator: function(items) {
                return items && items.length > 0;
            },
            message: 'Order must have at least one item'
        }
    },

    // Pricing
    subtotal: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        default: 0,
        min: 0
    },
    couponCode: {
        type: String,
        uppercase: true,
        trim: true
    },
    tax: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    shippingCost: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },

    // Shipping
    shippingAddress: {
        type: shippingAddressSchema,
        required: [true, 'Shipping address is required']
    },
    shippingMethod: {
        type: String,
        enum: ['standard', 'express', 'overnight', 'pickup'],
        default: 'standard'
    },

    // Payment
    paymentInfo: {
        type: paymentInfoSchema,
        required: true
    },

    // Order Status
    status: {
        type: String,
        required: true,
        enum: [
            'pending',
            'confirmed',
            'processing',
            'shipped',
            'out_for_delivery',
            'delivered',
            'cancelled',
            'refunded'
        ],
        default: 'pending',
        index: true
    },

    // Tracking
    trackingNumber: {
        type: String,
        trim: true
    },
    carrier: {
        type: String,
        trim: true
    },

    // Timestamps for status changes
    confirmedAt: Date,
    shippedAt: Date,
    deliveredAt: Date,
    cancelledAt: Date,

    // Notes
    customerNotes: {
        type: String,
        maxlength: 500
    },
    internalNotes: {
        type: String,
        maxlength: 1000
    },

    // Cancellation
    cancellationReason: {
        type: String,
        maxlength: 500
    },
    cancelledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // Refund
    refundAmount: {
        type: Number,
        min: 0
    },
    refundReason: {
        type: String,
        maxlength: 500
    },
    refundedAt: Date
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for better query performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ 'paymentInfo.status': 1 });
orderSchema.index({ createdAt: -1 });

// Virtual for total items count
orderSchema.virtual('itemCount').get(function() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

// Virtual to check if order is cancellable
orderSchema.virtual('isCancellable').get(function() {
    return ['pending', 'confirmed'].includes(this.status);
});

// Virtual to check if order is delivered
orderSchema.virtual('isDelivered').get(function() {
    return this.status === 'delivered' && this.deliveredAt;
});

// Virtual to check if payment is completed
orderSchema.virtual('isPaid').get(function() {
    return this.paymentInfo.status === 'completed';
});

// Pre-save hook to generate order number
orderSchema.pre('save', async function(next) {
    if (this.isNew && !this.orderNumber) {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        this.orderNumber = `ORD-${year}${month}-${random}`;
    }
    next();
});

// Pre-save hook to calculate totals
orderSchema.pre('save', function(next) {
    // Calculate subtotal from items
    this.subtotal = this.items.reduce((sum, item) => sum + item.total, 0);

    // Calculate total
    this.total = this.subtotal - this.discount + this.tax + this.shippingCost;
    this.total = Math.max(0, this.total); // Ensure total is not negative

    next();
});

// Instance method to update status
orderSchema.methods.updateStatus = async function(newStatus, userId = null) {
    const validTransitions = {
        'pending': ['confirmed', 'cancelled'],
        'confirmed': ['processing', 'cancelled'],
        'processing': ['shipped', 'cancelled'],
        'shipped': ['out_for_delivery', 'delivered'],
        'out_for_delivery': ['delivered'],
        'delivered': ['refunded'],
        'cancelled': [],
        'refunded': []
    };

    const allowedStatuses = validTransitions[this.status] || [];

    if (!allowedStatuses.includes(newStatus)) {
        throw new Error(`Cannot change status from ${this.status} to ${newStatus}`);
    }

    this.status = newStatus;

    // Update timestamps
    const now = new Date();
    if (newStatus === 'confirmed') this.confirmedAt = now;
    if (newStatus === 'shipped') this.shippedAt = now;
    if (newStatus === 'delivered') this.deliveredAt = now;
    if (newStatus === 'cancelled') {
        this.cancelledAt = now;
        if (userId) this.cancelledBy = userId;
    }
    if (newStatus === 'refunded') this.refundedAt = now;

    return await this.save();
};

// Instance method to add tracking info
orderSchema.methods.addTracking = async function(trackingNumber, carrier) {
    this.trackingNumber = trackingNumber;
    this.carrier = carrier;
    return await this.save();
};

// Instance method to process refund
orderSchema.methods.processRefund = async function(amount, reason) {
    if (this.status !== 'delivered') {
        throw new Error('Only delivered orders can be refunded');
    }

    if (amount > this.total) {
        throw new Error('Refund amount cannot exceed order total');
    }

    this.refundAmount = amount;
    this.refundReason = reason;
    this.status = 'refunded';
    this.refundedAt = new Date();
    this.paymentInfo.status = 'refunded';

    return await this.save();
};

// Static method to get orders by user
orderSchema.statics.findByUser = function(userId, options = {}) {
    const { page = 1, limit = 10, status } = options;

    const query = { user: userId };
    if (status) query.status = status;

    return this.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit)
        .populate('items.product', 'name slug images');
};

// Static method to get recent orders
orderSchema.statics.getRecentOrders = function(limit = 10) {
    return this.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('user', 'name email')
        .populate('items.product', 'name slug');
};

// Static method to get order statistics
orderSchema.statics.getStatistics = async function(startDate, endDate) {
    const match = {};
    if (startDate || endDate) {
        match.createdAt = {};
        if (startDate) match.createdAt.$gte = new Date(startDate);
        if (endDate) match.createdAt.$lte = new Date(endDate);
    }

    const stats = await this.aggregate([
        { $match: match },
        {
            $group: {
                _id: null,
                totalOrders: { $sum: 1 },
                totalRevenue: { $sum: '$total' },
                averageOrderValue: { $avg: '$total' },
                pendingOrders: {
                    $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
                },
                completedOrders: {
                    $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
                },
                cancelledOrders: {
                    $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
                }
            }
        }
    ]);

    return stats[0] || {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        pendingOrders: 0,
        completedOrders: 0,
        cancelledOrders: 0
    };
};

const Order = mongoose.model('Order', orderSchema);

export default Order;