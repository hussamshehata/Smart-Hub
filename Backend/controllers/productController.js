// controllers/productController.js
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import mongoose from 'mongoose';

// GET all products with advanced filtering, pagination, and search
export const getProducts = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 12,
            search,
            category,
            brand,
            minPrice,
            maxPrice,
            inStock,
            isFeatured,
            tags,
            sortBy = 'createdAt',
            order = 'desc'
        } = req.query;

        // Build query object
        const query = { isActive: true };

        // Text search
        if (search) {
            query.$text = { $search: search };
        }

        // Category filter
        if (category) {
            if (!mongoose.Types.ObjectId.isValid(category)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid category ID'
                });
            }
            query.category = category;
        }

        // Brand filter
        if (brand) {
            query.brand = { $regex: brand, $options: 'i' };
        }

        // Price range filter
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Stock filter
        if (inStock === 'true') {
            query.stock = { $gt: 0 };
        }

        // Featured filter
        if (isFeatured === 'true') {
            query.isFeatured = true;
        }

        // Tags filter
        if (tags) {
            const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
            query.tags = { $in: tagArray };
        }

        // Build sort object
        const sortOrder = order === 'asc' ? 1 : -1;
        let sort = {};

        if (sortBy === 'price') {
            sort.price = sortOrder;
        } else if (sortBy === 'rating') {
            sort['rating.average'] = sortOrder;
        } else if (sortBy === 'popularity') {
            sort.totalSold = sortOrder;
        } else if (sortBy === 'name') {
            sort.name = sortOrder;
        } else {
            sort.createdAt = sortOrder;
        }

        // If text search, add text score sorting
        if (search) {
            sort.score = { $meta: 'textScore' };
        }

        // Execute query with pagination
        const products = await Product.find(query)
            .populate('category', 'name slug')
            .select('-reviews') // Exclude reviews array for performance
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(sort)
            .lean();

        const total = await Product.countDocuments(query);

        res.json({
            success: true,
            data: products,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit),
                hasNextPage: page * limit < total,
                hasPrevPage: page > 1
            }
        });
    } catch (err) {
        console.error('Get products error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// GET single product by ID or slug
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        let product;

        // Check if it's a MongoDB ObjectId or a slug
        if (mongoose.Types.ObjectId.isValid(id)) {
            product = await Product.findById(id)
                .populate('category', 'name slug')
                .populate({
                    path: 'reviews',
                    populate: { path: 'user', select: 'name email' },
                    options: { limit: 10, sort: { createdAt: -1 } }
                });
        } else {
            // Treat as slug
            product = await Product.findOne({ slug: id })
                .populate('category', 'name slug')
                .populate({
                    path: 'reviews',
                    populate: { path: 'user', select: 'name email' },
                    options: { limit: 10, sort: { createdAt: -1 } }
                });
        }

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Increment view count
        await Product.findByIdAndUpdate(product._id, { $inc: { viewCount: 1 } });

        res.json({
            success: true,
            data: product
        });
    } catch (err) {
        console.error('Get product by ID error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch product',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// POST create new product
export const createProduct = async (req, res) => {
    try {
        const {
            name,
            brand,
            category,
            description,
            shortDescription,
            price,
            salePrice,
            cost,
            stock,
            lowStockThreshold,
            sku,
            barcode,
            images,
            specifications,
            dimensions,
            weight,
            tags,
            isFeatured,
            seo
        } = req.body;

        // Validate required fields
        if (!name || !brand || !category || !description || !price) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: name, brand, category, description, price'
            });
        }

        // Validate category exists
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category ID'
            });
        }

        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Check for duplicate SKU if provided
        if (sku) {
            const existingSKU = await Product.findOne({ sku: sku.toUpperCase() });
            if (existingSKU) {
                return res.status(409).json({
                    success: false,
                    message: 'SKU already exists'
                });
            }
        }

        // Validate sale price
        if (salePrice && salePrice >= price) {
            return res.status(400).json({
                success: false,
                message: 'Sale price must be less than regular price'
            });
        }

        // Create product
        const product = new Product({
            name: name.trim(),
            brand: brand.trim(),
            category,
            description: description.trim(),
            shortDescription: shortDescription?.trim(),
            price,
            salePrice,
            cost,
            stock: stock || 0,
            lowStockThreshold,
            sku,
            barcode,
            images,
            specifications,
            dimensions,
            weight,
            tags,
            isFeatured: isFeatured || false,
            seo
        });

        const savedProduct = await product.save();
        await savedProduct.populate('category', 'name slug');

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: savedProduct
        });
    } catch (err) {
        console.error('Create product error:', err);

        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(409).json({
                success: false,
                message: `Product with this ${field} already exists`
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create product',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// PUT/PATCH update product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID'
            });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Validate category if being updated
        if (req.body.category) {
            if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid category ID'
                });
            }

            const categoryExists = await Category.findById(req.body.category);
            if (!categoryExists) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }
        }

        // Check for duplicate SKU if being updated
        if (req.body.sku && req.body.sku !== product.sku) {
            const existingSKU = await Product.findOne({
                sku: req.body.sku.toUpperCase(),
                _id: { $ne: id }
            });
            if (existingSKU) {
                return res.status(409).json({
                    success: false,
                    message: 'SKU already exists'
                });
            }
        }

        // Validate sale price
        const newPrice = req.body.price || product.price;
        const newSalePrice = req.body.salePrice;
        if (newSalePrice && newSalePrice >= newPrice) {
            return res.status(400).json({
                success: false,
                message: 'Sale price must be less than regular price'
            });
        }

        // Update product
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate('category', 'name slug');

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: updatedProduct
        });
    } catch (err) {
        console.error('Update product error:', err);

        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(409).json({
                success: false,
                message: `Product with this ${field} already exists`
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to update product',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// DELETE product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID'
            });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Soft delete option: just mark as inactive
        // await Product.findByIdAndUpdate(id, { isActive: false });

        // Hard delete
        await Product.findByIdAndDelete(id);

        res.json({
            success: true,
            message: 'Product deleted successfully',
            data: { id: product._id, name: product.name }
        });
    } catch (err) {
        console.error('Delete product error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to delete product',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// BONUS: Get featured products
export const getFeaturedProducts = async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        const products = await Product.getFeatured(parseInt(limit));

        res.json({
            success: true,
            data: products
        });
    } catch (err) {
        console.error('Get featured products error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch featured products',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// BONUS: Get best sellers
export const getBestSellers = async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        const products = await Product.getBestSellers(parseInt(limit));

        res.json({
            success: true,
            data: products
        });
    } catch (err) {
        console.error('Get best sellers error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch best sellers',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// BONUS: Get related products
export const getRelatedProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const { limit = 6 } = req.query;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID'
            });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Find products in same category, excluding current product
        const relatedProducts = await Product.find({
            category: product.category,
            _id: { $ne: id },
            isActive: true
        })
            .limit(parseInt(limit))
            .populate('category', 'name slug')
            .select('-reviews');

        res.json({
            success: true,
            data: relatedProducts
        });
    } catch (err) {
        console.error('Get related products error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch related products',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// BONUS: Update product stock
export const updateProductStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, operation = 'add' } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID'
            });
        }

        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be a positive number'
            });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        await product.updateStock(quantity, operation);

        res.json({
            success: true,
            message: 'Stock updated successfully',
            data: {
                productId: product._id,
                name: product.name,
                stock: product.stock,
                stockStatus: product.stockStatus
            }
        });
    } catch (err) {
        console.error('Update stock error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to update stock',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};