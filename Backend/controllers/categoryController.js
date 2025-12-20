// controllers/categoryController.js
// controllers/categoryController.js
import Category from '../models/category.js';
import mongoose from 'mongoose';

// GET all categories with pagination, filtering, and search
export const getCategories = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            isActive,
            sortBy = 'createdAt',
            order = 'desc'
        } = req.query;

        // Build query object
        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (isActive !== undefined) {
            query.isActive = isActive === 'true';
        }

        // Build sort object
        const sortOrder = order === 'asc' ? 1 : -1;
        const sort = { [sortBy]: sortOrder };

        // Execute query with pagination
        const categories = await Category.find(query)
            .populate('parentCategory', 'name slug')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(sort)
            .lean();

        const total = await Category.countDocuments(query);

        res.json({
            success: true,
            data: categories,
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
        console.error('Get categories error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// GET single category by ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category ID format'
            });
        }

        const category = await Category.findById(id)
            .populate('parentCategory', 'name slug')
            .populate('subcategories');

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.json({
            success: true,
            data: category
        });
    } catch (err) {
        console.error('Get category by ID error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch category',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// POST create new category
export const createCategory = async (req, res) => {
    try {
        const { name, description, attributes, parentCategory, isActive } = req.body;

        // Validation
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }

        // Check for duplicate name (case-insensitive)
        const existingCategory = await Category.findOne({
            name: { $regex: new RegExp(`^${name.trim()}$`, 'i') }
        });

        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: 'A category with this name already exists'
            });
        }

        // Validate parent category if provided
        if (parentCategory && !mongoose.Types.ObjectId.isValid(parentCategory)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid parent category ID'
            });
        }

        if (parentCategory) {
            const parent = await Category.findById(parentCategory);
            if (!parent) {
                return res.status(404).json({
                    success: false,
                    message: 'Parent category not found'
                });
            }
        }

        // Create new category
        const newCategory = new Category({
            name: name.trim(),
            description: description?.trim(),
            attributes,
            parentCategory: parentCategory || null,
            isActive: isActive !== undefined ? isActive : true
        });

        const savedCategory = await newCategory.save();

        // Populate parent category for response
        await savedCategory.populate('parentCategory', 'name slug');

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: savedCategory
        });
    } catch (err) {
        console.error('Create category error:', err);

        // Handle Mongoose validation errors
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        // Handle duplicate key error
        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Category with this name or slug already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create category',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// PUT update category
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, attributes, parentCategory, isActive } = req.body;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category ID format'
            });
        }

        // Check if category exists
        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Check for duplicate name (excluding current category)
        if (name && name.trim() !== existingCategory.name) {
            const duplicate = await Category.findOne({
                name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
                _id: { $ne: id }
            });

            if (duplicate) {
                return res.status(409).json({
                    success: false,
                    message: 'A category with this name already exists'
                });
            }
        }

        // Validate parent category if provided
        if (parentCategory) {
            if (!mongoose.Types.ObjectId.isValid(parentCategory)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid parent category ID'
                });
            }

            // Prevent self-reference
            if (parentCategory === id) {
                return res.status(400).json({
                    success: false,
                    message: 'Category cannot be its own parent'
                });
            }

            const parent = await Category.findById(parentCategory);
            if (!parent) {
                return res.status(404).json({
                    success: false,
                    message: 'Parent category not found'
                });
            }
        }

        // Build update object
        const updateData = {};
        if (name) updateData.name = name.trim();
        if (description !== undefined) updateData.description = description?.trim();
        if (attributes !== undefined) updateData.attributes = attributes;
        if (parentCategory !== undefined) updateData.parentCategory = parentCategory || null;
        if (isActive !== undefined) updateData.isActive = isActive;

        // Update category
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).populate('parentCategory', 'name slug');

        res.json({
            success: true,
            message: 'Category updated successfully',
            data: updatedCategory
        });
    } catch (err) {
        console.error('Update category error:', err);

        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Category with this name or slug already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to update category',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// DELETE a category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category ID format'
            });
        }

        // Check if category exists
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Check if category has subcategories
        const subcategories = await Category.countDocuments({ parentCategory: id });
        if (subcategories > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete category with subcategories. Delete subcategories first.'
            });
        }

        // Optional: Check if category has products (uncomment if you have Product model)
        // const hasProducts = await category.hasProducts();
        // if (hasProducts) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Cannot delete category with associated products'
        //     });
        // }

        // Delete category
        await Category.findByIdAndDelete(id);

        res.json({
            success: true,
            message: 'Category deleted successfully',
            data: { id: category._id, name: category.name }
        });
    } catch (err) {
        console.error('Delete category error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to delete category',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// BONUS: Get category tree (hierarchical structure)
export const getCategoryTree = async (req, res) => {
    try {
        const categories = await Category.find({ parentCategory: null })
            .populate({
                path: 'subcategories',
                populate: { path: 'subcategories' }
            })
            .sort({ name: 1 });

        res.json({
            success: true,
            data: categories
        });
    } catch (err) {
        console.error('Get category tree error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch category tree',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};