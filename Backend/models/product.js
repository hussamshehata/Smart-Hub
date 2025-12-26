// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [200, 'Name cannot exceed 200 characters']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true,
        minlength: [2, 'Brand must be at least 2 characters'],
        maxlength: [50, 'Brand cannot exceed 50 characters']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    shortDescription: {
        type: String,
        trim: true,
        maxlength: [500, 'Short description cannot exceed 500 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
        max: [1000000, 'Price seems too high']
    },
    salePrice: {
        type: Number,
        min: [0, 'Sale price cannot be negative'],
        validate: {
            validator: function(value) {
                return !value || value < this.price;
            },
            message: 'Sale price must be less than regular price'
        }
    },
    cost: {
        type: Number,
        min: [0, 'Cost cannot be negative']
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Stock cannot be negative']
    },
    lowStockThreshold: {
        type: Number,
        default: 10,
        min: [0, 'Threshold cannot be negative']
    },
    sku: {
        type: String,
        unique: true,
        sparse: true,
        uppercase: true,
        trim: true
    },
    barcode: {
        type: String,
        trim: true
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        alt: String,
        isPrimary: {
            type: Boolean,
            default: false
        }
    }],
    specifications: {
        type: Map,
        of: String,
        default: new Map()
    },
    dimensions: {
        length: Number,
        width: Number,
        height: Number,
        unit: {
            type: String,
            enum: ['cm', 'inch'],
            default: 'cm'
        }
    },
    weight: {
        value: Number,
        unit: {
            type: String,
            enum: ['kg', 'lb', 'g'],
            default: 'kg'
        }
    },
    rating: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    isFeatured: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    totalSold: {
        type: Number,
        default: 0,
        min: 0
    },
    viewCount: {
        type: Number,
        default: 0,
        min: 0
    },
    seo: {
        metaTitle: String,
        metaDescription: String,
        metaKeywords: [String]
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text', brand: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ brand: 1, isActive: 1 });
productSchema.index({ price: 1 });
productSchema.index({ 'rating.average': -1 });
productSchema.index({ totalSold: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ slug: 1 });
productSchema.index({ sku: 1 });

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
    if (this.salePrice && this.price > this.salePrice) {
        return Math.round(((this.price - this.salePrice) / this.price) * 100);
    }
    return 0;
});

// Virtual for effective price
productSchema.virtual('effectivePrice').get(function() {
    return this.salePrice && this.salePrice < this.price ? this.salePrice : this.price;
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
    if (this.stock === 0) return 'out_of_stock';
    if (this.stock <= this.lowStockThreshold) return 'low_stock';
    return 'in_stock';
});

// Virtual for primary image
productSchema.virtual('primaryImage').get(function() {
    const primary = this.images.find(img => img.isPrimary);
    return primary || this.images[0] || null;
});

// Pre-save hook to generate slug
productSchema.pre('save', function(next) {
    if (this.isModified('name')) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        // Add random suffix to ensure uniqueness
        if (this.isNew) {
            this.slug += `-${Date.now().toString(36)}`;
        }
    }
    next();
});

// Pre-save hook to auto-generate SKU if not provided
productSchema.pre('save', function(next) {
    if (this.isNew && !this.sku) {
        const brandCode = this.brand.substring(0, 3).toUpperCase();
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        this.sku = `${brandCode}-${randomNum}`;
    }
    next();
});

// Instance method to check if in stock
productSchema.methods.isInStock = function() {
    return this.stock > 0;
};

// Instance method to check if low stock
productSchema.methods.isLowStock = function() {
    return this.stock > 0 && this.stock <= this.lowStockThreshold;
};

// Instance method to update stock
productSchema.methods.updateStock = async function(quantity, operation = 'subtract') {
    if (operation === 'subtract') {
        this.stock = Math.max(0, this.stock - quantity);
    } else if (operation === 'add') {
        this.stock += quantity;
    }
    return await this.save();
};

// Static method to get products by category
productSchema.statics.findByCategory = function(categoryId, options = {}) {
    return this.find({ category: categoryId, isActive: true, ...options });
};

// Static method to get featured products
productSchema.statics.getFeatured = function(limit = 10) {
    return this.find({ isFeatured: true, isActive: true })
        .limit(limit)
        .sort({ 'rating.average': -1 });
};

// Static method to get best sellers
productSchema.statics.getBestSellers = function(limit = 10) {
    return this.find({ isActive: true })
        .sort({ totalSold: -1 })
        .limit(limit);
};

const Product = mongoose.model('Product', productSchema);

export default Product;