// server/controllers/categoryController.js
import category from '../models/category.js';

// GET all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET single category by ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST create new category
export const createCategory = async (req, res) => {
    const { name, attributes } = req.body;
    const category = new category({ name, attributes });

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT update category
export const updateCategory = async (req, res) => {
    try {
        const category = await category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        if (req.body.name !== undefined) category.name = req.body.name;
        if (req.body.attributes !== undefined) category.attributes = req.body.attributes;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE a category
export const deleteCategory = async (req, res) => {
    try {
        const category = await category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        await category.remove();
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
