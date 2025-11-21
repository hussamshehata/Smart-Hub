import Cart from "../models/cart.js";

//! Controller to handle GET request for user's cart
// GET /cart/:userId
export const getCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }
    
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

//! Controller to handle POST request to add item to cart
// POST /cart/:userId/items
export const addItemToCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { productId, productName, price, quantity, imageUrl } = req.body;
    
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    
    // Check if item already exists in cart
    const existingItem = cart.items.find(
      item => item.productId.toString() === productId
    );
    
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({
        productId,
        productName,
        price,
        quantity: quantity || 1,
        imageUrl
      });
    }
    
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ errors: errorMessages });
    }
    next(error);
  }
};

//! Controller to handle PUT request to update item quantity
// PUT /cart/:userId/items/:itemId
export const updateItemQuantity = async (req, res, next) => {
  try {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;
    
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    const item = cart.items.id(itemId);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    if (quantity === 0) {
      item.remove();
    } else {
      item.quantity = quantity;
    }
    
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

//! Controller to handle DELETE request to remove item from cart
// DELETE /cart/:userId/items/:itemId
export const removeItemFromCart = async (req, res, next) => {
  try {
    const { userId, itemId } = req.params;
    
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    const item = cart.items.id(itemId);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    item.remove();
    await cart.save();
    
    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    next(error);
  }
};

//! Controller to handle DELETE request to clear entire cart
// DELETE /cart/:userId
export const clearCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    cart.items = [];
    await cart.save();
    
    res.status(200).json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    next(error);
  }
};

//! Controller to handle POST request for checkout
// POST /cart/:userId/checkout
export const checkout = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    if (cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    
    // Process checkout logic here (payment, order creation, etc.)
    const order = {
      userId: cart.userId,
      items: cart.items,
      subtotal: cart.subtotal,
      total: cart.total,
      orderDate: new Date()
    };
    
    // Clear cart after successful checkout
    cart.items = [];
    await cart.save();
    
    res.status(200).json({ 
      message: 'Checkout successful', 
      order 
    });
  } catch (error) {
    next(error);
  }
};