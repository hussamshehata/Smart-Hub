import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Menu,
    X,
    ShoppingBag,
    User,
    Search,
    ChevronDown,
} from "lucide-react";

import ThemeToggle from "../All-Buttons/ThemeToggle.jsx";
import CartSidebar from "./Sidebar.jsx";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount] = useState(2);

    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Tidy Table",
            price: 94.99,
            quantity: 2,
            image:
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop",
        },
        {
            id: 2,
            name: "Red Chair",
            price: 89.99,
            quantity: 1,
            image:
                "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=100&h=100&fit=crop",
        },
    ]);

    const updateQuantity = (id, change) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems((items) => items.filter((item) => item.id !== id));
    };

    return (
        <>
            {/* --- Announcement Bar --- */}
            <div className="bg-primary-900 text-white text-sm text-center py-2">
                🎧{" "}
                <span className="font-medium">
          30% off storewide — Limited time only!
        </span>{" "}
                <Link to="/shop" className="underline hover:text-gray-300 ml-1">
                    Shop Now →
                </Link>
            </div>

            {/* --- Navbar --- */}
            <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    {/* --- Logo --- */}
                    <Link to="/" className="text-2xl font-semibold text-primary-600">
                        Smart Hub.<span className="text-primary"></span>
                    </Link>

                    {/* --- Desktop Links --- */}
                    <div className="hidden md:flex items-center space-x-8 relative">
                        {/* Home */}
                        <Link
                            to="/"
                            className="relative text-gray-700 hover:text-black transition duration-200
              before:content-[''] before:absolute before:bottom-0 before:left-0
              before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300
              hover:before:w-full"
                        >
                            Home
                        </Link>

                        {/* Shop Dropdown */}
                        <div className="relative group">
                            <button
                                className="flex items-center gap-1 text-gray-700 hover:text-black relative transition duration-200
                before:content-[''] before:absolute before:bottom-0 before:left-0
                before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300
                group-hover:before:w-full"
                            >
                                Shop <ChevronDown size={16} />
                            </button>
                            <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-100 shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                {["All product" , "Laptop", "Mobiles", "Accessories"].map((item) => (
                                    <Link
                                        key={item}
                                        to={`/shop/${item.toLowerCase()}`}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Product Dropdown */}
                        <div className="relative group">
                            <button
                                className="flex items-center gap-1 text-gray-700 hover:text-black relative transition duration-200
                before:content-[''] before:absolute before:bottom-0 before:left-0
                before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300
                group-hover:before:w-full"
                            >
                                Product <ChevronDown size={16} />
                            </button>
                            <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-100 shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                {["New Arrivals", "Best Sellers", "On Sale"].map((item) => (
                                    <Link
                                        key={item}
                                        to={`/product/${item.toLowerCase().replace(" ", "-")}`}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <Link
                            to="/contact"
                            className="relative text-gray-700 hover:text-black transition duration-200
              before:content-[''] before:absolute before:bottom-0 before:left-0
              before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300
              hover:before:w-full"
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* --- Right Icons --- */}
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <button className="flex items-center justify-center text-gray-600 hover:text-black transition-all duration-200">
                            <Search size={20} />
                        </button>

                        {/* User */}
                        <button className="flex items-center justify-center text-gray-600 hover:text-black transition-all duration-200">
                            <User size={20} />
                        </button>

                        {/* Cart */}
                        <div className="relative flex items-center justify-center">
                            <button
                                className="flex items-center justify-center text-gray-600 hover:text-black transition-all duration-200"
                                onClick={() => setIsCartOpen(true)}
                            >
                                <ShoppingBag size={20} />
                            </button>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
                            )}
                        </div>

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Mobile Menu */}
                        <button
                            className="md:hidden text-gray-700 hover:text-black"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* --- Mobile Menu --- */}
                {isOpen && (
                    <div className="md:hidden bg-gray-50 border-t border-gray-200">
                        <div className="flex flex-col items-center py-3 space-y-2">
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-black transition duration-200"
                            >
                                Home
                            </Link>
                            <Link
                                to="/shop"
                                className="text-gray-700 hover:text-black transition duration-200"
                            >
                                Shop
                            </Link>
                            <Link
                                to="/product"
                                className="text-gray-700 hover:text-black transition duration-200"
                            >
                                Product
                            </Link>
                            <Link
                                to="/contact"
                                className="text-gray-700 hover:text-black transition duration-200"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* --- Cart Sidebar --- */}
            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
            />
        </>
    );
}
