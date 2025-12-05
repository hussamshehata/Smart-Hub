import { createSlice } from '@reduxjs/toolkit';

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error('Could not load cart from localStorage', err);
    return [];
  }
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error('Could not save cart to localStorage', err);
  }
};

// Calculate totals helper function
const calculateTotals = (items) => {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  return { totalQuantity, totalPrice };
};

const initialState = {
  items: loadCartFromLocalStorage(),
  totalQuantity: 0,
  totalPrice: 0,
  couponCode: '',
  shippingMethod: 'free', // 'free', 'express', 'pickup'
  shippingCost: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    ...initialState,
    ...calculateTotals(initialState.items),
  },
  reducers: {
    // Add item to cart
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          color: newItem.color || '',
          size: newItem.size || '',
          price: newItem.price,
          image: newItem.image || '',
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      saveCartToLocalStorage(state.items);
    },

    // Remove item from cart completely
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      saveCartToLocalStorage(state.items);
    },

    // Increase item quantity
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;

        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;

        saveCartToLocalStorage(state.items);
      }
    },

    // Decrease item quantity
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;

        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;

        saveCartToLocalStorage(state.items);
      }
    },

    // Update item quantity directly
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (quantity > 0) {
          existingItem.quantity = quantity;
          existingItem.totalPrice = existingItem.price * existingItem.quantity;

          const totals = calculateTotals(state.items);
          state.totalQuantity = totals.totalQuantity;
          state.totalPrice = totals.totalPrice;

          saveCartToLocalStorage(state.items);
        }
      }
    },

    // Set coupon code
    setCouponCode: (state, action) => {
      state.couponCode = action.payload;
    },

    // Set shipping method
    setShippingMethod: (state, action) => {
      const { method, cost } = action.payload;
      state.shippingMethod = method;
      state.shippingCost = cost;
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.couponCode = '';

      localStorage.removeItem('cart');
    },
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  setCouponCode,
  setShippingMethod,
  clearCart,
} = cartSlice.actions;

// Export selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartTotalPrice = (state) => state.cart.totalPrice;
export const selectCouponCode = (state) => state.cart.couponCode;
export const selectShippingMethod = (state) => state.cart.shippingMethod;
export const selectShippingCost = (state) => state.cart.shippingCost;

// Export reducer
export default cartSlice.reducer;