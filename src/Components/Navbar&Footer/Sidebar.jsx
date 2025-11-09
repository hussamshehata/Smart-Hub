import { X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectCartItems,
  selectCartTotalPrice,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '@/redux/Cartslice';

export default function CartSidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get cart data from Redux store
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotalPrice);

  const updateQuantity = (id, delta) => {
    if (delta > 0) {
      dispatch(increaseQuantity(id));
    } else {
      dispatch(decreaseQuantity(id));
    }
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleViewCart = () => {
    onClose();
    navigate('/cart'); // Update this path to match your cart page route
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout'); // Update this path to match your checkout page route
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Side cart */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingCart className="w-16 h-16 mb-4 opacity-50" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b">
                     <div className="w-20 h-20  rounded flex items-center justify-center text-3xl flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className={`object-cover w-full h-full rounded`}
                        />
                      </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          {item.color && (
                            <p className="text-xs text-gray-500">Color: {item.color}</p>
                          )}
                          {item.size && (
                            <p className="text-xs text-gray-500">Size: {item.size}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gray-600 font-semibold mb-3">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center border rounded-md w-24">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="flex-1 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Checkout
              </button>
              <button
                onClick={handleViewCart}
                className="w-full border border-gray-300 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                View Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}