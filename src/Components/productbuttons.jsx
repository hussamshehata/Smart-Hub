// src/components/ProductButtons.jsx
import React from "react";
import { ShoppingCart, Heart } from "lucide-react";

export default function ProductButtons() {
    return (
        <div className="flex items-center gap-4 mt-4">
            {/* Add to Cart Button */}
            <button
                className="flex items-center gap-2 bg-primary-500 text-white px-16 py-2 rounded-full font-medium hover:bg-primary-600 transition-all duration-200"
                type="button"
            >
                <ShoppingCart size={22} strokeWidth={2} />
                Add to Cart
            </button>

            {/* Wishlist Button */}
            <button
                className="flex items-center justify-center px-16 py-2  border border-neutral-300 rounded-full hover:bg-neutral-100 transition-all duration-200"
                type="button"
                aria-label="Add to wishlist"
            >
                <Heart
                    size={28}
                    strokeWidth={2}
                    className="text-neutral-700 hover:text-red-500 transition-colors duration-200"
                />
                  Wishlist
            </button>
        </div>
    );
}
