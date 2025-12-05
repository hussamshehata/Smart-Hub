import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectCartItems,
    selectCartTotalPrice,
    selectShippingCost,
    selectShippingMethod,
    clearCart,
} from "../../redux/cartSlice.js";

import { Button } from "../ui/button.jsx";
import { useNavigate } from "react-router-dom";

export default function OrderComplete() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartTotalPrice);
    const shippingCost = useSelector(selectShippingCost);
    const shippingMethod = useSelector(selectShippingMethod);

    const total = subtotal + shippingCost;

    // Generate an order ID
    const orderId = Math.floor(Math.random() * 900000) + 100000;

    const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handleConfirmOrder = () => {
        dispatch(clearCart());
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center max-w-2xl rounded-md shadow border border-gray-300 p-6 mx-auto mt-4 mb-4">
            <h6 className="text-[28px] font-medium text-neutral-500 text-center mb-6">
                Thank you! 🎉
            </h6>

            <h4 className="text-[40px] max-w-md font-medium text-center mb-8">
                Your order has been received
            </h4>

            {/* Products */}
            <div className="flex justify-center gap-6 mb-8">
                {cartItems.map((item) => (
                    <div key={item.id} className="relative">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded-md object-cover"
                        />
                        <div className="absolute -top-2 -right-2 bg-black text-white text-xs w-6 h-6 rounded-lg flex items-center justify-center">
                            {item.quantity}
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Details */}
            <div className="flex gap-8 mb-8">
                <div className="space-y-3 text-gray-500">
                    <p>Order code:</p>
                    <p>Date:</p>
                    <p>Total:</p>
                    <p>Shipping:</p>
                </div>

                <div className="space-y-3">
                    <p>#{orderId}</p>
                    <p>{date}</p>
                    <p>${total.toFixed(2)}</p>
                    <p>{shippingMethod}</p>
                </div>
            </div>

            <Button className="w-1/4 hover:bg-gray-900 text-white h-12 text-base font-medium rounded-lg" onClick={handleConfirmOrder}>
                Confirm Order
            </Button>
        </div>
    );
}
