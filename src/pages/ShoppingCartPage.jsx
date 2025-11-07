import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus, X } from 'lucide-react';
import { Button } from "@/Components/ui/button.jsx";
import { Input } from '@/Components/ui/input.jsx';
import { decreaseQuantity, increaseQuantity, removeFromCart, selectCartItems, selectCartTotalPrice, selectCouponCode, selectShippingCost, selectShippingMethod, setCouponCode, setShippingMethod } from '@/redux/Cartslice';



export default function ShoppingCartPage() {
  const dispatch = useDispatch();
  
  // Get cart data from Redux store
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotalPrice);
  const couponCodeValue = useSelector(selectCouponCode);
  const shippingMethod = useSelector(selectShippingMethod);
  const shippingCost = useSelector(selectShippingCost);

  // Local state for coupon input
  const [couponInput, setCouponInput] = useState(couponCodeValue);

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

  const handleApplyCoupon = () => {
    dispatch(setCouponCode(couponInput));
    // You can add coupon validation logic here
    alert(`Coupon "${couponInput}" applied!`);
  };

  const handleShippingChange = (method, cost) => {
    dispatch(setShippingMethod({ method, cost }));
  };

  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Title */}
        <h2 className="text-4xl font-semibold mb-10">Cart</h2>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
              1
            </div>
            <span className="ml-3 font-semibold text-sm">Shopping cart</span>
          </div>
          <div className="w-24 h-px bg-gray-300 mx-6"></div>
          <div className="flex items-center text-gray-400">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-sm">
              2
            </div>
            <span className="ml-3 font-medium text-sm">Checkout details</span>
          </div>
          <div className="w-24 h-px bg-gray-300 mx-6"></div>
          <div className="flex items-center text-gray-400">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-sm">
              3
            </div>
            <span className="ml-3 font-medium text-sm">Order complete</span>
          </div>
        </div>

        {/* Cart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items + Coupon */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items Table */}
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-500 text-lg">Your cart is empty</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b text-xs font-semibold text-gray-600 uppercase">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>

                {/* Cart Items */}
                {cartItems.map((item, index) => (
                  <div key={item.id} className={`grid grid-cols-12 gap-4 px-6 py-6 items-center ${index < cartItems.length - 1 ? 'border-b' : ''}`}>
                    <div className="col-span-5 flex items-start space-x-4">
                      <div className="w-20 h-20  rounded flex items-center justify-center text-3xl flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className={`object-cover w-full h-full rounded`}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                        <p className="text-xs text-gray-500 mb-0.5">Color: {item.color}</p>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-gray-400 hover:text-red-600 flex items-center mt-2"
                        >
                          <X className="w-3 h-3 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-3 flex items-center justify-center">
                      <div className="inline-flex items-center border rounded overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-5 py-1.5 font-medium text-sm border-x min-w-[50px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-center text-sm">
                      ${item.price.toFixed(2)}
                    </div>
                    
                    <div className="col-span-2 text-right font-semibold text-base">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Coupon Section */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-base mb-2">Have a coupon?</h3>
              <p className="text-sm text-gray-500 mb-4">
                Add your code for an instant cart discount
              </p>
              <div className="flex gap-3">
                <Input
                  placeholder="Coupon Code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 h-11 border-gray-300"
                />
                <Button 
                  variant="outline" 
                  className="h-11 px-6 font-medium border-gray-300"
                  onClick={handleApplyCoupon}
                  disabled={!couponInput.trim()}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-8">
              <h3 className="font-bold text-lg mb-5">Cart summary</h3>
              
              {/* Shipping Options */}
              <div className="space-y-3 mb-5">
                <label 
                  className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
                    shippingMethod === 'free' ? 'border-2 border-black' : 'border border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => handleShippingChange('free', 0)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      shippingMethod === 'free' ? 'border-black' : 'border-gray-300'
                    }`}>
                      {shippingMethod === 'free' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                      )}
                    </div>
                    <span className="text-sm font-medium">Free shipping</span>
                  </div>
                  <span className="font-semibold text-sm">$0.00</span>
                </label>
                
                <label 
                  className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
                    shippingMethod === 'express' ? 'border-2 border-black' : 'border border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => handleShippingChange('express', 15)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      shippingMethod === 'express' ? 'border-black' : 'border-gray-300'
                    }`}>
                      {shippingMethod === 'express' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                      )}
                    </div>
                    <span className="text-sm font-medium">Express shipping</span>
                  </div>
                  <span className="font-semibold text-sm">+$15.00</span>
                </label>
                
                <label 
                  className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
                    shippingMethod === 'pickup' ? 'border-2 border-black' : 'border border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => handleShippingChange('pickup', 21)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      shippingMethod === 'pickup' ? 'border-black' : 'border-gray-300'
                    }`}>
                      {shippingMethod === 'pickup' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                      )}
                    </div>
                    <span className="text-sm font-medium">Pick Up</span>
                  </div>
                  <span className="font-semibold text-sm">+$21.00</span>
                </label>
              </div>

              {/* Price Summary */}
              <div className="border-t pt-4 space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm pb-4 border-b">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">+${shippingCost.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-5">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-2xl">${total.toFixed(2)}</span>
              </div>

              <Button 
                className="w-full bg-black hover:bg-gray-900 text-white h-12 text-base font-medium rounded-lg"
                disabled={cartItems.length === 0}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}