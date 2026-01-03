// controllers/cartController.js
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import mongoose from "mongoose";

// GET user's cart (authenticated user only)
export const getCart = async (req, res) => {
    try {
        const userId = req.user._id; // From auth middleware

        let cart = await Cart.findActiveByUser(userId)
            .populate({
                path: 'items.product',
                select: 'name slug price salePrice images stock isActive brand category'
            })
            .populate('savedForLater', 'name slug price images');

        // Create empty cart if doesn't exist
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
            await cart.save();
        }

        // Remove items for inactive/deleted products
        await cart.removeExpiredItems();

        res.json({
            success: true,
            data: cart
        });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch cart',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// POST add item to cart
export const addItemToCart = async (req, res) => {
    try {
        const userId = req.user._id; // From auth middleware
        const { productId, quantity = 1, attributes = {} } = req.body;

        // Validate product ID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID'
            });
        }

        // Validate quantity
        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be at least 1'
            });
        }

        // Check if product exists and is active
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        if (!product.isActive) {
            return res.status(400).json({
                success: false,
                message: 'Product is not available'
            });
        }

        // Check stock availability
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: `Only ${product.stock} units available`,
                availableStock: product.stock
            });
        }

        // Get or create cart
        let cart = await Cart.findActiveByUser(userId);
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if item already exists in cart
        const existingItem = cart.getItem(productId);

        if (existingItem) {
            // Update quantity
            const newQuantity = existingItem.quantity + quantity;

            // Check if new quantity exceeds stock
            if (newQuantity > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: `Cannot add more. Only ${product.stock} units available`,
                    availableStock: product.stock,
                    currentInCart: existingItem.quantity
                });
            }

            existingItem.quantity = newQuantity;
            existingItem.priceAtAdd = product.effectivePrice; // Update to current price
        } else {
            // Add new item
            cart.items.push({
                product: productId,
                quantity,
                priceAtAdd: product.effectivePrice,
                attributes
            });
        }

        await cart.save();
        await cart.populate('items.product', 'name slug price salePrice images stock isActive');

        res.status(201).json({
            success: true,
            message: 'Item added to cart',
            data: cart
        });
    } catch (error) {
        console.error('Add to cart error:', error);

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
            message: 'Failed to add item to cart',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// PUT update item quantity
export const updateItemQuantity = async (req, res) => {
    try {
        const userId = req.user._id;
        const { itemId } = req.params;
        const { quantity } = req.body;

        // Validate quantity
        if (!quantity || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid quantity'
            });
        }

        const cart = await Cart.findActiveByUser(userId);
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const item = cart.items.id(itemId);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            });
        }

        // If quantity is 0, remove item
        if (quantity === 0) {
            item.deleteOne();
        } else {
            // Check stock availability
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }

            if (product.stock < quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Only ${product.stock} units available`,
                    availableStock: product.stock
                });
            }

            item.quantity = quantity;
            item.priceAtAdd = product.effectivePrice; // Update to current price
        }

        await cart.save();
        await cart.populate('items.product', 'name slug price salePrice images stock isActive');

        res.json({
            success: true,
            message: quantity === 0 ? 'Item removed from cart' : 'Quantity updated',
            data: cart
        });
    } catch (error) {
        console.error('Update quantity error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update quantity',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// DELETE remove item from cart
export const removeItemFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { itemId } = req.params;

        const cart = await Cart.findActiveByUser(userId);
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const item = cart.items.id(itemId);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            });
        }

        item.deleteOne();
        await cart.save();
        await cart.populate('items.product', 'name slug price salePrice images stock isActive');

        res.json({
            success: true,
            message: 'Item removed from cart',
            data: cart
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to remove item',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// DELETE clear entire cart
export const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findActiveByUser(userId);
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.items = [];
        cart.couponCode = undefined;
        cart.discount = 0;
        await cart.save();

        res.json({
            success: true,
            message: 'Cart cleared successfully',
            data: cart
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to clear cart',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// POST apply coupon code
export const applyCoupon = async (req, res) => {
    try {
        const userId = req.user._id;
        const { couponCode } = req.body;

        if (!couponCode) {
            return res.status(400).json({
                success: false,
                message: 'Coupon code is required'
            });
        }

        const cart = await Cart.findActiveByUser(userId);
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        if (cart.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Cart is empty'
            });
        }

        // TODO: Validate coupon with Coupon model
        // For now, using mock validation
        const validCoupons = {
            'SAVE10': { discount: 10, type: 'percentage' },
            'FLAT50': { discount: 50, type: 'fixed' }
        };

        const coupon = validCoupons[couponCode.toUpperCase()];
        if (!coupon) {
            return res.status(400).json({
                success: false,
                message: 'Invalid coupon code'
            });
        }

        cart.couponCode = couponCode.toUpperCase();
        cart.discount = coupon.discount;
        cart.discountType = coupon.type;

        await cart.save();
        await cart.populate('items.product', 'name slug price salePrice images stock isActive');

        res.json({
            success: true,
            message: 'Coupon applied successfully',
            data: cart
        });
    } catch (error) {
        console.error('Apply coupon error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to apply coupon',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// DELETE remove coupon
export const removeCoupon = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findActiveByUser(userId);
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.couponCode = undefined;
        cart.discount = 0;
        cart.discountType = 'fixed';

        await cart.save();
        await cart.populate('items.product', 'name slug price salePrice images stock isActive');

        res.json({
            success: true,
            message: 'Coupon removed',
            data: cart
        });
    } catch (error) {
        console.error('Remove coupon error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to remove coupon',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// POST move item to saved for later
export const moveToSavedForLater = async (req, res) => {
    try {
        const userId = req.user._id;
        const { itemId } = req.params;

        const cart = await Cart.findActiveByUser(userId);
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const item = cart.items.id(itemId);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            });
        }

        // Add to saved for later if not already there
        if (!cart.savedForLater.includes(item.product)) {
            cart.savedForLater.push(item.product);
        }

        // Remove from cart
        item.deleteOne();

        await cart.save();
        await cart.populate('items.product', 'name slug price salePrice images stock isActive');
        await cart.populate('savedForLater', 'name slug price images');

        res.json({
            success: true,
            message: 'Item moved to saved for later',
            data: cart
        });
    } catch (error) {
        console.error('Move to saved error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to move item',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// POST move item from saved for later to cart
export const moveToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;

        const cart = await Cart.findActiveByUser(userId);
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        if (!cart.savedForLater.includes(productId)) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in saved for later'
            });
        }

        // Get product details
        const product = await Product.findById(productId);
        if (!product || !product.isActive) {
            return res.status(400).json({
                success: false,
                message: 'Product is not available'
            });
        }

        if (product.stock < 1) {
            return res.status(400).json({
                success: false,
                message: 'Product is out of stock'
            });
        }

        // Add to cart
        if (!cart.hasProduct(productId)) {
            cart.items.push({
                product: productId,
                quantity: 1,
                priceAtAdd: product.effectivePrice
            });
        }

        // Remove from saved for later
        cart.savedForLater = cart.savedForLater.filter(
            id => id.toString() !== productId.toString()
        );

        await cart.save();
        await cart.populate('items.product', 'name slug price salePrice images stock isActive');
        await cart.populate('savedForLater', 'name slug price images');

        res.json({
            success: true,
            message: 'Item moved to cart',
            data: cart
        });
    } catch (error) {
        console.error('Move to cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to move item',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// GET cart summary (for checkout preview)
export const getCartSummary = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findActiveByUser(userId)
            .populate('items.product', 'name price salePrice');

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        if (cart.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Cart is empty'
            });
        }

        const summary = {
            itemCount: cart.itemCount,
            subtotal: cart.subtotal,
            discount: cart.discountAmount,
            tax: cart.tax,
            total: cart.total,
            couponCode: cart.couponCode
        };

        res.json({
            success: true,
            data: summary
        });
    } catch (error) {
        console.error('Get cart summary error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch cart summary',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};