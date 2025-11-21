import Product from "../models/product.js";
import appleData from './apple.json' assert { type: "json" };

// Get all products (optionally filter by brand)
export const getProducts = async (req, res) => {
    try {
        const { brand } = req.query; // optional ?brand=Apple
        const filter = brand ? { brand } : {};
        const products = await Product.find(filter);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new product (brand is passed in req.body or URL param)
export const createProduct = async (req, res) => {
    try {
        const brand = req.body.brand || req.params.brand;
        if (!brand) return res.status(400).json({ message: "Brand is required" });

        const product = await Product.create({ ...req.body, brand });
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
