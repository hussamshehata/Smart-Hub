import React from "react";
import { Link } from "react-router-dom";

export default function MobileMenu({ isOpen }) {
    if (!isOpen) return null;

    return (
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col items-center py-3 space-y-2">
                <Link to="/" className="text-gray-700 hover:text-black transition duration-200">Home</Link>
                <Link to="/shop" className="text-gray-700 hover:text-black transition duration-200">Shop</Link>
                <Link to="/product" className="text-gray-700 hover:text-black transition duration-200">Product</Link>
                <Link to="/contact" className="text-gray-700 hover:text-black transition duration-200">Contact Us</Link>
            </div>
        </div>
    );
}
