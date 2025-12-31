// models/Cart.js
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Product is required'],
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'],
        default: 1
    },
    // Snapshot of product data at time of adding (for historical reference)
    priceAtAdd: {
        type: Number,
        required: true
    },
    attributes: {
        // For products with variants (size, color, etc.)
        type: Map,
        of: String,
        default: new Map()
    }
}, {
    timestamps: true,
    _id: true
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User is required'],
        ref: 'User',
        unique: true,
        index: true
    },
    items: [cartItemSchema],

    // Coupon/Discount
    couponCode: {
        type: String,
        uppercase: true,
        trim: true
    },
    discount: {
        type: Number,
        default: 0,
        min: 0
    },
    discountType: {
        type: String,
        enum: ['fixed', 'percentage'],
        default: 'fixed'
    },

    // Saved for later items
    savedForLater: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],

    // Cart status
    status: {
        type: String,
        enum: ['active', 'abandoned', 'converted'],
        default: 'active'
    },

    // Cart expiration
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        index: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for performance
cartSchema.index({ user: 1, status: 1 });
cartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

// Virtual for subtotal (sum of all items)
cartSchema.virtual('subtotal').get(function() {
    return this.items.reduce((sum, item) => {
        return sum + (item.priceAtAdd * item.quantity);
    }, 0);
});

// Virtual for discount amount
cartSchema.virtual('discountAmount').get(function() {
    if (this.discountType === 'percentage') {
        return (this.subtotal * this.discount) / 100;
    }
    return this.discount;
});

// Virtual for tax (example: 10%)
cartSchema.virtual('tax').get(function() {
    const taxRate = 0.10; // 10%
    return (this.subtotal - this.discountAmount) * taxRate;
});

// Virtual for total
cartSchema.virtual('total').get(function() {
    return Math.max(0, this.subtotal - this.discountAmount + this.tax);
});

// Virtual for item count
cartSchema.virtual('itemCount').get(function() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

// Instance method to check if cart is empty
cartSchema.methods.isEmpty = function() {
    return this.items.length === 0;
};

// Instance method to check if product exists in cart
cartSchema.methods.hasProduct = function(productId) {
    return this.items.some(item =>
        item.product.toString() === productId.toString()
    );
};

// Instance method to get item by product ID
cartSchema.methods.getItem = function(productId) {
    return this.items.find(item =>
        item.product.toString() === productId.toString()
    );
};

// Instance method to clear expired items
cartSchema.methods.removeExpiredItems = async function() {
    const Product = mongoose.model('Product');

    const validItems = [];
    for (const item of this.items) {
        const product = await Product.findById(item.product);
        if (product && product.isActive) {
            validItems.push(item);
        }
    }

    this.items = validItems;
    return this.save();
};

// Static method to find active cart by user
cartSchema.statics.findActiveByUser = function(userId) {
    return this.findOne({ user: userId, status: 'active' });
};

// Static method to clean up abandoned carts
cartSchema.statics.cleanupAbandoned = async function() {
    const abandonedThreshold = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days

    return this.updateMany(
        {
            status: 'active',
            updatedAt: { $lt: abandonedThreshold }
        },
        {
            status: 'abandoned'
        }
    );
};

// Pre-save middleware to update expiresAt on modification
cartSchema.pre('save', function(next) {
    if (this.isModified('items') && this.items.length > 0) {
        // Extend expiration when cart is modified
        this.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }
    next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;