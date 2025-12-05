import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus } from 'lucide-react';
import {
    decreaseQuantity,
    increaseQuantity,
    selectCartItems,
    selectCartTotalPrice,
    selectCouponCode,
    selectShippingCost,
    selectShippingMethod,
    setCouponCode,
    setShippingMethod
} from '../../redux/cartSlice.js';

export default function OrderSummary() {
    const dispatch = useDispatch();

    // Get data from Redux
    const cartItems = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartTotalPrice);
    const couponCodeValue = useSelector(selectCouponCode);
    const shippingMethod = useSelector(selectShippingMethod);
    const shippingCost = useSelector(selectShippingCost);

    // Local coupon state
    const [couponInput, setCouponInput] = useState(couponCodeValue);

    const updateQuantity = (id, delta) => {
        if (delta > 0) dispatch(increaseQuantity(id));
        else dispatch(decreaseQuantity(id));
    };

    const handleApplyCoupon = () => {
        dispatch(setCouponCode(couponInput));
        alert(`Coupon "${couponInput}" applied!`);
    };

    const total = subtotal + shippingCost;

    return (
        <div className="w-full rounded-md shadow border border-gray-300 p-6 bg-white">
            <h2 className="text-2xl font-semibold mb-6">Order summary</h2>

            {/* Cart Items */}
            {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-md object-cover"
                        />

                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-gray-500 text-sm">Color: {item.color}</p>

                            {/* Quantity Control */}
                            <div className="flex items-center border border-gray-400 rounded-md w-20 justify-between px-2 mt-1">
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="text-gray-500"
                                >
                                    <Minus className="w-3 h-3" />
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="text-gray-500"
                                >
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                    </p>
                </div>
            ))}

            <hr className="my-2" />

            {/* Coupon Section */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Coupon Code"
                    className="border border-gray-400 rounded-md px-3 py-2 mr-2 focus:outline-none"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                />
                <button
                    onClick={handleApplyCoupon}
                    className="bg-black text-white px-4 py-2 rounded-md"
                    disabled={!couponInput.trim()}
                >
                    Apply
                </button>
            </div>

            {/* Show applied coupon if exists */}
            {couponCodeValue && (
                <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-600">🎟️ {couponCodeValue}</span>
                    <span className="text-green-600 font-medium">Coupon applied</span>
                </div>
            )}

            {/* Shipping */}
            <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                    {shippingCost === 0 ? "Free" : `+$${shippingCost.toFixed(2)}`}
                </span>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>

            <hr className="my-2" />

            {/* Total */}
            <div className="flex justify-between mt-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">${total.toFixed(2)}</span>
            </div>
        </div>
    );
}
